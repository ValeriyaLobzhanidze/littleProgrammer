export default interface StateComparator<T> {
  compare(val1: T, val2: T): boolean;
}
