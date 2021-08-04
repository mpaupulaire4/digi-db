import BTree, { IMap } from "sorted-btree"
import { get_getter_fn } from "./utils"

type Indexable = string | number | null | undefined | Array<string | number | null | undefined>

function isIndexable(o: any): o is Indexable {
  return !o
  || typeof o === 'string'
  || typeof o === 'number'
  || Array.isArray(o)
}

export interface IndexConfig {
  name: string,
  unique?: boolean,
  sparse?: boolean,
  hash?: boolean
  fk?: string,
}

type BetweenClause = {
  $between: [Indexable, Indexable]
}

type InClause = {
  $in: Iterable<Indexable>
}

export interface IIndex<T> {
  readonly size: number
  readonly name: string

  insert(doc: T): void
  update(doc: T): void
  delete(doc: T): void
  where(clause: WhereClause, set?: Set<T>): Set<T>
}

type WhereClause = Indexable | BetweenClause | InClause

export type WhereMap = Record<string, WhereClause>

abstract class BaseIndex<T>
  implements IIndex<T>
{
  protected _set: (key: Indexable, meta: T) => any;
  protected abstract _tree: IMap<Indexable, Set<T>>;
  protected sym: Symbol;

  name: string;
  get_key: ReturnType<typeof get_getter_fn>;

  get size() {
    return this._tree.size
  }

  constructor(
    tablename: string,
    config: IndexConfig
  ) {
    this.name = config.name
    this.sym = Symbol(this.name)
    this.get_key = get_getter_fn(config.name)
    if (config.unique) {
      this._set = (k, m) => {
        if (this._tree.has(k!))
          throw new Error(`Duplicate key on unique index "${tablename}"."${config.name}"`);
        this._tree.set(k!, new Set<T>().add(m))
        return k
      }
    } else {
      this._set = (k, m) => {
        let set = this._tree.get(k!) as Set<T> | undefined
        if (!set) {
          set = new Set<T>();
          this._tree.set(k!, set)
        }
        set.add(m)
        return k
      }
    }

    if (config.sparse) {
      const wrapped_set = this._set
      this._set = (k, m) => {
        if (k === null || k === undefined) return
        return wrapped_set(k, m)
      }
    } else {
      const wrapped_set = this._set
      this._set = (k, m) => {
        if (k === undefined) k = null
        return wrapped_set(k, m)
      }
    }

    const single_set = this._set
    const single_del = this._del
    const single_up = this._update

    this._set = (k, m) => {
      if (!Array.isArray(k)) return single_set(k, m)
      const keys = new Set(k)
      const worked = []
      try {
        for (const key of keys) {
          single_set(key, m)
          worked.push(key)
        }
        return keys
      } catch (e) {
        // revert if there is an error
        for (const key of worked) {
          this._del(key, m)
        }
        throw e
      }
    }

    this._del = (k, m) => {
      if (!Array.isArray(k)) throw single_del(k, m)
      for (const key of k) {
        single_del(key, m)
      }
    }

    this._update = (k, m) => {
      if (!Array.isArray(k)) throw single_up(k, m)
      const newSet = new Set(k)
      // @ts-ignore
      const oldSet = m[this.sym] as Set<Indexable>
      const worked = []
      try {
        for (const key of newSet) {
          if (!oldSet.has(key)) {
            single_set(key, m)
            worked.push(key)
          }
        }
        for (const key of oldSet) {
          if (!newSet.has(key)) {
            single_del(key, m)
          }
        }
        return newSet
      } catch(e) {
        for (const key of worked) {
          single_del(key, m)
        }
        throw e
      }
    }
  }

  protected _del = (k: any, m?: T) => {
    if (k === undefined) k = null
    const val = this._tree.get(k)
    if (m !== undefined) {
      if (val) {
        if (val.size > 1) {
          val.delete(m)
        } else if (val.has(m)) {
          this._tree.delete(k)
        }
      }
    } else {
      this._tree.delete(k)
    }
  }

  protected _update = (k: any, m: T): any | undefined => {
    // change equality check
    // @ts-ignore
    if (k === m[this.sym]) return m[this.sym]
    this._set(k, m)
    // @ts-ignore
    this._del(m[this.sym], m)
    return k
  }

  insert(doc: T) {
    const key = this.get_key(doc)
    // @ts-ignore
    doc[this.sym] = this._set(key, doc)
  }

  update(doc: T): void {
    const key = this.get_key(doc)
    // @ts-ignore
    doc[this.sym] = this._update(key, doc)
  }

  delete(doc: any, meta?: T) {
    this._del(this.get_key(doc), meta)
  }

  abstract where(clause: WhereClause, set?: Set<T>): Set<T>

}


export class Index<T> extends BaseIndex<T>
  implements IIndex<T>
{
  protected _tree: BTree<Indexable, Set<T>> = new BTree()

  where(clause: WhereClause, set: Set<T> = new Set<T>()) {
    if (isIndexable(clause)) {
      if (clause === undefined) clause = null as Indexable
      const metas = this._tree.get(clause)
      if (metas) {
        metas.forEach(meta => set.add(meta))
      }
    } else if ('$between' in clause) {
      this._tree.forRange(clause.$between[0], clause.$between[1], true, (_, v: Set<T>) => {
        v.forEach(meta => set.add(meta))
      })
    } else if ('$in' in clause) {
      for (const k of clause.$in ) {
        const metas = this._tree.get(k)
        if (metas) {
          metas.forEach(m => set.add(m))
        }
      }
    }
    return set
  }
}

export class HashIndex<T> extends BaseIndex<T>
  implements IIndex<T>
{
  protected _tree: Map<Indexable | null, Set<T>> = new Map();

  where(clause: WhereClause, set: Set<T> = new Set<T>()) {
    if (isIndexable(clause)) {
      if (clause === undefined) clause = null as Indexable
      const metas = this._tree.get(clause)
      if (metas) {
        metas.forEach(meta => set.add(meta))
      }
    } else if ('$between' in clause) {
      throw new Error('Range based queries are not possible on a hash index')
    } else if ('$in' in clause) {
      for (const k of clause.$in ) {
        const metas = this._tree.get(k)
        if (metas) {
          metas.forEach(m => set.add(m))
        }
      }
    }
    return set
  }
}
