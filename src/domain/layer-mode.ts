import type { LayerKeyParam } from "karabiner.ts"

const ensureNonEmpty = (value: LayerKeyParam) => {
  if (value === undefined) {
    throw new Error("LayerMode must not be empty")
  }
}

export class LayerMode<T extends LayerKeyParam> {
  private constructor(private readonly raw: T) {
    ensureNonEmpty(raw)
  }

  static of<U extends LayerKeyParam>(value: U) {
    return new LayerMode<U>(value)
  }

  value(): T {
    return this.raw
  }
}
