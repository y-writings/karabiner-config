import { map, rule } from "karabiner.ts"

import { ifInputLanguage } from "../../../helpers/conditions"
import { setVar } from "../../../helpers/events"
import { InputLanguages } from "../../../values/input-languages"
import { Layers } from "../../../values/layers"
import { Variables } from "../../../values/variables"
import { layerLcmdOn } from "../shared"

const manipulators = [
  map(Layers.sign.value(), ["left_command"])
    .to("japanese_kana")
    .condition(layerLcmdOn, ifInputLanguage(InputLanguages.en)),
  map(Layers.sign.value(), ["left_command"])
    .to([{ key_code: "japanese_eisuu" }, setVar(Variables.testFlag, 0)])
    .condition(layerLcmdOn, ifInputLanguage(InputLanguages.ja)),
]

export const layerLcmdImeRule = () => {
  return rule("左Commandレイヤーで英数入力とかな入力を切り替える").manipulators(manipulators)
}
