import { clearNotification, setVar } from "../helpers/events"
import { NotificationIds } from "./notifications"
import { Variables } from "./variables"

export const resetAll = [setVar(Variables.layerNum, 0), clearNotification(NotificationIds.numLayerMode)]
