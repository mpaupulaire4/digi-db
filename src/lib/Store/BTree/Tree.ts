import { Node, indexOf, split, set, merge } from "./Node";

function simpleComparator<T>(a:T, b: T) {
  return a > b ? 1 : a < b ? -1 : 0;
}
export class BTree<K, V> {
  private root: Node<K,V>
  private maxNum: number
  private minNum: number

  private minKey!: K
  private maxKey!: K
  // Public
  size = 0;

  constructor(
    order: number,
    private cmp: (a: K, b: K) => number = simpleComparator,
  ) {
    if (order < 3)  order = 3
    this.maxNum = order - 1;
    this.minNum = this.maxNum >> 1;
    this.root = {
      keys: [],
      values: []
    };
  }


  readonly set = (key: K, val: V) => {
    const stack: {
      i: number,
      n: Node<K, V>
    }[] = [];
    let node = this.root;
    let i: number = indexOf(node, key, -1, this.cmp)

    while (i < 0 && node.nodes) {
      const j = ~i
      stack.push({
        i: j,
        n: node,
      });
      node = node.nodes[j]
      i = indexOf(node, key, -1, this.cmp)
    }

    set(node, key, val, i);

    if (i < 0) {
      this.size++;
      while(node.keys.length > this.maxNum) {
        let s = split(node)
        const p = stack.pop();
        if (!p) {
          this.root = {
            keys: [s[0]],
            values: [s[1]],
            nodes: [node, s[2]]
          }
          break;
        }
        p.n.keys.splice(p.i, 0, s[0])
        p.n.values.splice(p.i, 0, s[1])
        p.n.nodes!.splice(p.i + 1, 0, s[2])
        node = p.n
      }
      if (!this.minKey || this.cmp(key, this.minKey) < 0) {
        this.minKey = key
      }
      if (!this.maxKey || this.cmp(key, this.maxKey) > 0) {
        this.maxKey = key
      }
    }
  };

  readonly get = (key: K) => {
    let node = this.root;
    let i: number = indexOf(node, key, -1, this.cmp)
    while (i < 0 && node.nodes) {
      node = node.nodes[~i]
      i = indexOf(node, key, -1, this.cmp)
    }
    return node.values[i]
  };

  readonly has = (key: K): boolean => {
    let node = this.root;
    let i: number = indexOf(node, key, -1, this.cmp)
    while (i < 0 && node.nodes) {
      node = node.nodes[~i]
      i = indexOf(node, key, -1, this.cmp)
    }
    return i < 0
  };


  forRange(low: K | undefined, high: K | undefined, cb: (v: V) => void): void {
    const stack: {
      i: number,
      n: Node<K, V>
    }[] = [];
    low = low === undefined ? this.minKey : low
    high = high === undefined ? this.maxKey : high
    let node: Node<K, V> | undefined = this.root;
    let i: number = indexOf<K>(node, low, -1, this.cmp)
    while (i < 0 && node.nodes) {
      const j = ~i
      stack.push({
        i: j,
        n: node,
      });
      node = node.nodes[j]
      i = indexOf(node, low, -1, this.cmp)
    }


    if (i < 0) {
      i = ~i
    } else if (node.nodes) i++

    while(node) {
      if (!node.nodes) {
        for (; i < node.keys.length; i++) {
          if (this.cmp(high, node.keys[i]) < 0) return
          cb(node.values[i])
        }
      } else {
        if (i < node.nodes.length) {
          if (node.values[i-1]) {
            if (this.cmp(high, node.keys[i-1]) < 0) return
            cb(node.values[i-1])
          }
          stack.push({
            n: node,
            i
          })
          node = node.nodes[i];
          i = 0;
          continue
        }
      }
      const par = stack.pop()
      node = par?.n
      i = (par?.i || 0) + 1
    }
  }

  readonly delete = (key: K) => {
    const stack: {
      i: number,
      n: Node<K, V>
    }[] = [];
    let node = this.root,
    i: number = indexOf(node, key, -1, this.cmp);

    while (i < 0 && node.nodes) {
      const j = ~i
      stack.push({
        i: j,
        n: node,
      });
      node = node.nodes[j]
      i = indexOf(node, key, -1, this.cmp)
    }
    // Key not in tree
    if (i < 0) return false;

    if (!node.nodes) { // leaf node
      node.keys.splice(i, 1)
      node.values.splice(i, 1)
    } else {
      const parNode = node
      const parI = i
      while(node.nodes) {
        stack.push({
          i,
          n: node
        })
        node = node.nodes[i]
        i = node.keys.length
      }
      // node is now a leaf, the largest leaf of the left child of starting node
      // replace key to be deleted with largest key in leaf node
      parNode.keys.splice(parI, 1, node.keys.pop()!)
      parNode.values.splice(parI, 1, node.values.pop()!)
    }
    this.size--;

    // Node still valid: done
    if (node === this.root || node.keys.length >= this.minNum) return true;
    // rebalance if not enough keys in leaf
    this.rebalance(node, stack)
  };

  private rebalance(node: Node<K, V>, stack: { n: Node<K, V>, i: number }[]) { // left sibling steal
    do {
      const par = stack.pop()!;

      if (
        par.n.nodes![par.i - 1]?.keys.length > this.minNum
      ) { // Right rotate, steal from left sib
        const leftI = par.i - 1
        const left = par.n.nodes![leftI]
        node.keys.unshift(par.n.keys[leftI])
        node.values.unshift(par.n.values[leftI])
        par.n.keys[leftI] = left.keys.pop()!
        par.n.values[leftI] = left.values.pop()!
        return
      }
      else if (
        par.n.nodes![par.i + 1]?.keys.length > this.minNum
      ) { // left rotate, steal from right sib
        const right = par.n.nodes![par.i + 1]
        node.keys.push(par.n.keys[par.i])
        node.values.push(par.n.values[par.i])
        par.n.keys[par.i] = right.keys.shift()!
        par.n.values[par.i] = right.values.shift()!
        return
      } else {
        if (par.i === par.n.keys.length) {
          node = par.n.nodes![--par.i]
        }

        merge(
          node,
          par.n.keys.splice(par.i, 1)[0],
          par.n.values.splice(par.i, 1)[0],
          par.n.nodes!.splice(par.i + 1, 1)[0]
        )

        if (par.n === this.root) {
          if (!this.root.keys.length) this.root = node
          return
        }

        node = par.n
      }
    } while (node.keys.length < this.minNum)
  }


}
