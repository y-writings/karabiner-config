const ensureNonEmpty = (value: string) => {
  if (value.trim() === "") {
    throw new Error("NotificationId must not be empty")
  }
}

export class NotificationId {
  private constructor(private readonly raw: string) {
    ensureNonEmpty(raw)
  }

  static of(value: string) {
    return new NotificationId(value)
  }

  value() {
    return this.raw
  }
}
