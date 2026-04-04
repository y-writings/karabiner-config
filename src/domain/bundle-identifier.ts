const ensureNonEmpty = (value: string) => {
  if (value.trim() === "") {
    throw new Error("BundleIdentifier must not be empty")
  }
}

export class BundleIdentifier {
  private constructor(private readonly raw: string) {
    ensureNonEmpty(raw)
  }

  static of(value: string) {
    return new BundleIdentifier(value)
  }

  value() {
    return this.raw
  }
}

export class BundleIdentifierList {
  private constructor(private readonly ids: BundleIdentifier[]) {}

  static of(...ids: BundleIdentifier[]) {
    return new BundleIdentifierList(ids)
  }

  values() {
    return this.ids.map((id) => id.value())
  }
}
