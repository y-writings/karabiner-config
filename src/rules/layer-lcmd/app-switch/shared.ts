import { toKey } from "karabiner.ts"

import { ifVarIs } from "../../../helpers/conditions"
import { setVar } from "../../../helpers/events"
import { Variables } from "../../../values/variables"

export const switchAppModeOn = ifVarIs(Variables.switchAppMode, 1)
export const switchAppModeOff = ifVarIs(Variables.switchAppMode, 0)
export const switchAppModeUpOn = ifVarIs(Variables.switchAppModeUp, 1)
export const switchAppModeUpOff = ifVarIs(Variables.switchAppModeUp, 0)
export const switchAppModeDownOn = ifVarIs(Variables.switchAppModeDown, 1)
export const switchAppModeDownOff = ifVarIs(Variables.switchAppModeDown, 0)

export const resetSwitchAppDirectionState = () => {
  return [setVar(Variables.switchAppModeDown, 0), setVar(Variables.switchAppModeUp, 0)]
}

export const resetSwitchAppToTab = () => {
  return [...resetSwitchAppDirectionState(), toKey("tab")]
}

export const resetSwitchAppToCommandTab = () => {
  return [...resetSwitchAppDirectionState(), toKey("down_arrow", ["left_command"]), toKey("tab", ["left_command"])]
}

export const activateSwitchAppMode = () => {
  return [setVar(Variables.switchAppMode, 1), ...resetSwitchAppDirectionState(), toKey("tab")]
}
