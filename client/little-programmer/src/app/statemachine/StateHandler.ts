export default interface StateHandler<T> {
  handle(value: T): T;
}
