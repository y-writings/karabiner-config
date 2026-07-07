import type { FromKeyParam, FromModifierParam, ToKeyParam } from "karabiner.ts"
import { map, rule, toKey } from "karabiner.ts"
import { ifVarIs } from "../../helpers/conditions"
import { Variables } from "../../values/variables"

const numLayerOn = ifVarIs(Variables.layerNum, 1)
const optionalAny: { optional: FromModifierParam } = {
  optional: "any",
}

const numericMappings: Array<[FromKeyParam, ToKeyParam]> = [
  ["a", "1"],
  ["s", "2"],
  ["d", "3"],
  ["f", "4"],
  ["g", "5"],
  ["h", "6"],
  ["j", "7"],
  ["k", "8"],
  ["l", "9"],
  ["n", "0"],
]

const manipulators = [
  ...numericMappings.map(([fromKey, toKey]) => {
    return map(fromKey, optionalAny).to(toKey).condition(numLayerOn)
  }),
  map("z").toNone().condition(numLayerOn),
  map("r")
    .to(toKey("8", ["left_shift"]))
    .condition(numLayerOn),
  map("q")
    .to(toKey("1", ["left_shift"]))
    .condition(numLayerOn),
  map("w")
    .to(toKey("2", ["left_shift"]))
    .condition(numLayerOn),
  map("e")
    .to(toKey("5", ["left_shift"]))
    .condition(numLayerOn),
  map("t")
    .to(toKey("3", ["left_shift"]))
    .condition(numLayerOn),
  map("c")
    .to(toKey("6", ["left_shift"]))
    .condition(numLayerOn),
  map("v")
    .to(toKey("4", ["left_shift"]))
    .condition(numLayerOn),
]

export const layerNumPadRule = () => {
  return rule("数字レイヤー有効中の数字配列設定").manipulators(manipulators)
}
