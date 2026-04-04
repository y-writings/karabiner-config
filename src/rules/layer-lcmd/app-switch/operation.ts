import { type FromModifierParam, map, rule } from "karabiner.ts"

import { setVar } from "../../../helpers/events"
import { Variables } from "../../../values/variables"
import { switchAppModeDownOff, switchAppModeDownOn, switchAppModeOn, switchAppModeUpOff } from "./shared"

const optionalAny: { optional: FromModifierParam } = { optional: "any" }
const optionalLeftCommand: { optional: FromModifierParam } = { optional: "left_command" }

const manipulators = [
  map("h", optionalAny)
    .to([{ key_code: "left_arrow" }])
    .condition(switchAppModeOn),
  map("l", optionalAny)
    .to([{ key_code: "right_arrow" }])
    .condition(switchAppModeOn),
  map("k", ["left_command"])
    .to([
      setVar(Variables.switchAppModeUp, 1),
      { key_code: "escape", modifiers: ["left_command"] },
      { key_code: "up_arrow", modifiers: ["left_command"] },
    ])
    .condition(switchAppModeOn, switchAppModeDownOff, switchAppModeUpOff)
    .description("Mission Controlを上へ移動する。"),
  map("j", optionalLeftCommand)
    .to([setVar(Variables.switchAppModeDown, 1), { key_code: "down_arrow" }])
    .condition(switchAppModeOn, switchAppModeUpOff, switchAppModeDownOff)
    .description("Mission Controlを下へ移動する。"),
  map("j", ["left_command", "shift"])
    .to([{ key_code: "tab", modifiers: ["left_shift"] }])
    .condition(switchAppModeOn, switchAppModeUpOff, switchAppModeDownOn),
  map("j", ["left_command"])
    .to([{ key_code: "tab" }])
    .condition(switchAppModeOn, switchAppModeUpOff, switchAppModeDownOn),
  map("k", optionalLeftCommand)
    .to([setVar(Variables.switchAppModeDown, 1), { key_code: "down_arrow" }])
    .condition(switchAppModeOn, switchAppModeUpOff, switchAppModeDownOff),
]

export const layerLcmdAppSwitchOperationRule = () => {
  return rule("左Commandレイヤー: アプリケーションスイッチ操作").manipulators(manipulators)
}
