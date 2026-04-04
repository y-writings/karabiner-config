import { toNotificationMessage, toSetVar } from "karabiner.ts"

import type { NotificationId } from "../domain/notification-id"
import type { VariableName } from "../domain/variable-name"

export const setVar = (name: VariableName, value: number) => {
  return toSetVar(name.value(), value)
}

export const notify = (id: NotificationId, text: string) => {
  return toNotificationMessage(id.value(), text)
}

export const clearNotification = (id: NotificationId) => {
  return toNotificationMessage(id.value(), "")
}
