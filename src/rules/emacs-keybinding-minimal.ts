import { map, rule, toKey } from "karabiner.ts"

import { unlessAppIn } from "../helpers/conditions"
import { AppBundleIds } from "../values/apps"

const avoidTerminal = unlessAppIn(AppBundleIds.terminals)
const avoidTerminalOrEditor = unlessAppIn(AppBundleIds.editorsAndTerminals)

const option = "left_option"

const manipulators = [
  // 標準カーソル移動
  map("n", ["left_control"]).to("down_arrow").description("標準カーソル移動↓"),
  map("p", ["left_control"]).to("up_arrow").description("標準カーソル移動↑"),
  map("b", ["left_control"]).to("left_arrow").description("標準カーソル移動←"),
  map("f", ["left_control"]).to("right_arrow").description("標準カーソル移動→"),
  // terminal上でviを使うことを考慮し、terminalでは無効化
  map("a", ["left_control"], "any")
    .to(toKey("left_arrow", ["command"]))
    .description("行頭へ移動")
    .condition(avoidTerminal),
  map("e", ["left_control"], "any")
    .to(toKey("right_arrow", ["command"]))
    .description("行末へ移動")
    .condition(avoidTerminal),
  map("k", ["left_control"], "any")
    .to([toKey("right_arrow", ["shift", "command"]), toKey("x", ["command"])])
    .description("カーソル位置から行末まで削除")
    .condition(avoidTerminalOrEditor),
  map("y", ["left_control"], "any")
    .to(toKey("v", ["command"]))
    .description("ペースト")
    .condition(avoidTerminal),
  map("f", [option], "any")
    .to(toKey("right_arrow", [option]))
    .description("単語単位で次へ移動")
    .condition(avoidTerminal),
  map("b", [option], "any")
    .to(toKey("left_arrow", [option]))
    .description("単語単位で前へ移動")
    .condition(avoidTerminal),
]

export const emacsKeybindingMinimalRule = () => {
  return rule("Emacsキーバインドを基本キー操作に割り当てる。").manipulators(manipulators)
}
