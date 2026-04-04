import { type FromModifierParam, map, rule, toKey } from "karabiner.ts"
import { layerLcmdOn } from "../shared"
import {
  activateSwitchAppMode,
  resetSwitchAppDirectionState,
  resetSwitchAppToCommandTab,
  resetSwitchAppToTab,
  switchAppModeDownOn,
  switchAppModeOff,
  switchAppModeOn,
  switchAppModeUpOff,
  switchAppModeUpOn,
} from "./shared"

const optionalAny: { optional: FromModifierParam } = { optional: "any" }

const manipulators = [
  map("spacebar", optionalAny)
    .parameters({ "basic.to_delayed_action_delay_milliseconds": 190 })
    .to(activateSwitchAppMode())
    .toDelayedAction([{ key_code: "left_arrow" }], [])
    .condition(layerLcmdOn, switchAppModeOff)
    .description(["アプリケーションスイッチモードを開始する。", "左CommandレイヤーがOFFになるまで継続する。"].join("")),
  map("spacebar", optionalAny)
    .to(resetSwitchAppToTab())
    .condition(switchAppModeOn, switchAppModeUpOff)
    .description("アプリケーションスイッチ状態を強制リセットする。"),
  map("spacebar", optionalAny)
    .parameters({ "basic.to_delayed_action_delay_milliseconds": 190 })
    .to(resetSwitchAppToCommandTab())
    .toDelayedAction([{ key_code: "left_arrow" }], [])
    .condition(switchAppModeOn, switchAppModeUpOn)
    .description(["アプリケーションスイッチ状態を強制リセットする", "(上方向状態の特殊ケース)。"].join("")),
  map("k", optionalAny)
    .parameters({ "basic.to_delayed_action_delay_milliseconds": 190 })
    .to(resetSwitchAppToCommandTab())
    .toDelayedAction([{ key_code: "left_arrow" }], [])
    .condition(switchAppModeOn, switchAppModeUpOn)
    .description(["アプリケーションスイッチ状態をリセットする", "(上方向状態での再入力)。"].join("")),
  map("j", optionalAny)
    .parameters({ "basic.to_delayed_action_delay_milliseconds": 190 })
    .to(resetSwitchAppToCommandTab())
    .toDelayedAction([{ key_code: "left_arrow" }], [])
    .condition(switchAppModeOn, switchAppModeUpOn)
    .description(["アプリケーションスイッチ状態をリセットする", "(上方向から下方向へ切り替える前段)。"].join("")),
  map("k", optionalAny)
    .parameters({ "basic.to_delayed_action_delay_milliseconds": 190 })
    .to(resetSwitchAppToCommandTab())
    .toDelayedAction([{ key_code: "left_arrow" }], [])
    .condition(switchAppModeOn, switchAppModeUpOn)
    .description(["アプリケーションスイッチ状態をリセットする", "(上方向状態を維持したまま再入力する)。"].join("")),
  map("k", optionalAny)
    .parameters({ "basic.to_delayed_action_delay_milliseconds": 190 })
    .to([...resetSwitchAppDirectionState(), toKey("tab", ["left_command"])])
    .toDelayedAction([{ key_code: "left_arrow" }], [])
    .condition(switchAppModeOn, switchAppModeDownOn)
    .description(["アプリケーションスイッチ状態をリセットする", "(下方向から上方向へ切り替える前段)。"].join("")),
]

export const layerLcmdAppSwitchStartRule = () => {
  return rule("左Commandレイヤー: アプリケーションスイッチの開始とリセット").manipulators(manipulators)
}
