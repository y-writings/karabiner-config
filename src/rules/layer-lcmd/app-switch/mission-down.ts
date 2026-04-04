import { map, rule } from "karabiner.ts"

import { setVar } from "../../../helpers/events"
import { Variables } from "../../../values/variables"
import { layerLcmdOn } from "../shared"
import { switchAppModeOff } from "./shared"

const manipulators = [
  map("j", ["left_command"])
    .parameters({ "basic.to_delayed_action_delay_milliseconds": 180 })
    .to([
      setVar(Variables.switchAppMode, 1),
      setVar(Variables.switchAppModeUp, 0),
      setVar(Variables.switchAppModeDown, 1),
      { key_code: "down_arrow", modifiers: ["left_command"] },
    ])
    .condition(layerLcmdOn, switchAppModeOff)
    .description(
      ["アプリケーションスイッチモードを下方向から開始する。", "左CommandレイヤーがOFFになるまで継続する。"].join(""),
    ),
]

export const layerLcmdAppSwitchMissionDownRule = () => {
  return rule("左Commandレイヤー: アプリケーションスイッチを下方向で開始").manipulators(manipulators)
}
