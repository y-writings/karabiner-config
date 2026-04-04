import { map, rule } from "karabiner.ts"

import { resetLayerLcmdState, setLayerLcmdOn } from "./shared"

const manipulators = [
  map("left_command", { optional: "any" })
    .parameters({
      "basic.to_if_alone_timeout_milliseconds": -1,
      "basic.to_if_held_down_threshold_milliseconds": -1,
    })
    .toAfterKeyUp(resetLayerLcmdState)
    .toIfAlone({ key_code: "left_command" })
    .toIfHeldDown([setLayerLcmdOn, { key_code: "left_command" }])
    .description(
      ["left_commandのホールド中は左Commandレイヤーを有効化し、", "離したときに関連状態をリセットする。"].join(""),
    ),
]

export const layerLcmdStartRule = () => {
  return rule("左Commandレイヤーの開始とリセット").manipulators(manipulators)
}
