
const extractor_cache: Map<string, Function> = new Map()
const setter_cache: Map<string, Function> = new Map()

export function get_getter_fn<T = any, V = any>(field: string): (o: T) => V {
  if(!extractor_cache.has(field)) {
    let fnCode = 'return o?.';

    const fieldParts = field.split('.')
    fnCode += fieldParts.map((part) => `[${JSON.stringify(part)}]`).join('?.')

    extractor_cache.set(field, new Function('o', fnCode))
  }
  return extractor_cache.get(field)! as (o: T) => V
}

export function get_value (obj: any, field: string) {
  if (!obj) return undefined
  if (field.length === 0) return obj
  return get_getter_fn(field)(obj)
}


export function get_setter_fn (field: string) {
  if(!setter_cache.has(field)) {
    let fnCode = 'if (!o) return;';

    const fieldParts = typeof field === 'string' ? field.split('.') : field
    const last = fieldParts.pop()
    fnCode += fieldParts.map(
      (part) => {
        part = JSON.stringify(part)
        return `if (!o[${part}] || typeof o[${part}] !== 'object') o[${part}] = {};o = o[${part}];`
      }
    ).join('')
    if (last) {
      fnCode += `o[${JSON.stringify(last)}] = v;`
    }

    setter_cache.set(field,  new Function('o', 'v', fnCode))
  }
  return setter_cache.get(field)! as (o: any, v: any) => void
}

export function set_value (obj: any, field: string, value: any) {
  return get_setter_fn(field)(obj, value)
}


export function intersect<T = any>(sets: Set<T>[]): Array<T> {
  const first = sets.pop();
  if (!first || !first.size) return []
  const ret = []
  for (let item of first) {
    out: {
      for (let set of sets) {
        if (!set.has(item)) break out
      }
      ret.push(item)
    }
  }
  return ret
}

export function isIterable<T = any>(o: any): o is Iterable<T> {
  if (!o) return false
  return typeof o[Symbol.iterator] === 'function'
}


let IDX=256, HEX: string[] = [], BUFFER: number[];
while (IDX--) HEX[IDX] = (IDX + 256).toString(16).substring(1);

export function uuid() {
	let i=0, num, out='';

	if (!BUFFER || ((IDX + 16) > 256)) {
		BUFFER = Array(i=256);
		while (i--) BUFFER[i] = 256 * Math.random() | 0;
		i = IDX = 0;
	}

	for (; i < 16; i++) {
		num = BUFFER[IDX + i];
		if (i==6) out += HEX[num & 15 | 64];
		else if (i==8) out += HEX[num & 63 | 128];
		else out += HEX[num];

		if (i & 1 && i > 1 && i < 11) out += '-';
	}

	IDX++;
	return out;
}
