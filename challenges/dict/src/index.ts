export type Dict<T> = {
  [k: string]: T
};

// Array.prototype.map, but for Dict
export function mapDict<T, S>(dictionary: Dict<T>, cb: (arg: T) => S): Dict<S> {
  const mappedDictionary : Dict<S> = {}
  Object.keys(dictionary).forEach(k => {
      mappedDictionary[k] = cb(dictionary[k])
  });
  return mappedDictionary
}

// Array.prototype.reduce, but for Dict
export function reduceDict<T, S>(dictionary: Dict<T>, reducer: (arg1: S, arg2: T) => S, initValue?: S): S {
  let accumulatedValue: S;
  if (initValue) {
    accumulatedValue = initValue;
  }
  Object.keys(dictionary).forEach(k => accumulatedValue = accumulatedValue + reducer(accumulatedValue, dictionary[k]));
  return accumulatedValue
}
