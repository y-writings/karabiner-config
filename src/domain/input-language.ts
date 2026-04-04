const ensureNonEmpty = (value: string) => {
  if (value.trim() === "") {
    throw new Error("InputLanguage must not be empty")
  }
}

export class InputLanguage {
  private constructor(private readonly raw: string) {
    ensureNonEmpty(raw)
  }

  static of(value: string) {
    return new InputLanguage(value)
  }

  toInputSource() {
    return { language: this.raw }
  }
}
