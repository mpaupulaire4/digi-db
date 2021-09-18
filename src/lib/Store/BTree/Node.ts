export interface BNode<K, V> {
  prev?: BNode<K, V>;
  next?: BNode<K, V>;

  keys: K[]
  values: V[]
  nodes?: Array<BNode<K, V>>
}

export function indexOf<K>(
  node: BNode<K, any>,
  key: K,
  failXor: number,
  cmp: (a: K, b: K) => number
): number {
  let lo = 0, hi = node.keys.length, mid = hi >> 1;
  while(lo < hi) {
    let c = cmp(key, node.keys[mid]);
    if (c < 0) hi = mid;
    else if (c > 0) lo = mid + 1;
    else
      return mid;
    mid = (lo + hi) >> 1;
  }
  return mid ^ failXor;
}

export function set<K, V>(
  node: BNode<K, V>,
  key: K,
  value: V,
  i: number
) {
  if (i < 0) {
    const j = ~i
    node.keys.splice(j, 0, key)
    node.values.splice(j, 0, value)
  } else {
    node.keys[i] = key;
    node.values[i] = value;
  }
}

export function split<K, V>(node: BNode<K, V>): [K, V, BNode<K, V>] {
  const mov = node.keys.length >> 1,
  newR: BNode<K, V> = {
    keys: node.keys.splice(mov + 1),
    values: node.values.splice(mov + 1),
    nodes: node.nodes && node.nodes.splice(mov + 1)
  }
  newR.prev = node;
  newR.next = node.next;
  if (node.next) node.next.prev = newR;
  node.next = newR;
  return [node.keys.pop()!, node.values.pop()!, newR];
}

export function merge<K, V>(
  left: BNode<K, V>,
  key: K,
  val: V,
  right: BNode<K, V>
) {
  left.keys = left.keys.concat(key, right.keys)
  left.values = left.values.concat(val, right.values)
  left.nodes = left.nodes?.concat(right.nodes!)
  left.next = right.next
  if (right.next) right.next.prev = left
}
