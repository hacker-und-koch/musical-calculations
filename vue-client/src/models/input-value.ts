export default class InputValue<T> {
  public value!: T;

  public label!: string;

  public pristine = true;

  setValue(val: T) {
    this.value = val;
    return this;
  }

  setLabel(text: string) {
    this.label = text;
    return this;
  }
}
