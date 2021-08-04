import type { IndexConfig, WhereMap, IIndex } from './Indexes'
import { Index } from './Indexes'
import { get_getter_fn, intersect } from './utils'



export class ObjectStore<T = any, K = any> {
  // static members
  protected static stores: Record<string, ObjectStore<any>> = Object.create(null)
  // instance members
  protected indexes: IIndex<T>[]
  protected indexesByName: Record<string, IIndex<T>>
  protected pk: Map<K, T>
  protected pk_getter: (o: T) => K

  get size() {
    return this.indexes[0].size
  }

  constructor(
    private name: string,
    indexes: IndexConfig[],
    pk: string,
  ) {
    this.pk = new Map();
    this.pk_getter = get_getter_fn<T, K>(pk)
    this.indexes = indexes.map((c) => new Index(this.name, c))
    this.indexesByName = Object.create(null)
    for (const index of this.indexes) {
      this.indexesByName[index.name] = index
    }
    ObjectStore.stores[this.name] = this
  }

  get(key: K) {
    return this.pk.get(key)
  }

  async insert(doc: T): Promise<T> {
    let i = 0
    try {
      // TODO: Fix error handling and rollback logic
      // maybe do all writes on a copy and if it fails just throw the copy away.
      // this has the added benefit of not messing with any reads that may be happening at the same time.
      for (i = 0; i < this.indexes.length; i++){
        this.indexes[i].insert(doc)
      }
      this.pk.set(this.pk_getter(doc), doc)
    } catch (e) {
      if (i > 0) {
        for (; i > 0 ; i--) {
          this.indexes[i - 1].delete(doc)
        }
      }
      throw e
    }
    return doc
  }

  async delete(doc: T) {
    for (const index of this.indexes) {
      index.delete(doc)
    }
    this.pk.delete(this.pk_getter(doc))
  }

  async update(doc: T) {
    for (const index of this.indexes) {
      // TODO: updates can still throw errors/ violate contraints. Need rollback
      index.update(doc)
    }
  }

  where(def?: WhereMap): Array<T> {
    if (!def) return [...this.pk.values()]

    const indexes = Object.keys(def)

    if (!indexes.length) {
      throw new Error('Where clause must contain at least one key')
    }

    const sets = indexes.map((index) => {
      const Index = this.indexesByName[index]
      if (!Index) throw new Error(`no such index ${index}`)
      return Index.where(def[index])
    })

    return intersect(sets)
  }
}
