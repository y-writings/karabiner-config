const ensureNonEmpty = (value: string) => {
  if (value.trim() === "") {
    throw new Error("VariableName must not be empty")
  }
}

export class VariableName {
  private constructor(private readonly raw: string) {
    ensureNonEmpty(raw)
  }

  static of<U extends string>(value: U) {
    return new VariableName(value)
  }

  value() {
    return this.raw
  }
}
