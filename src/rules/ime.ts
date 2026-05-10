import { map, rule, toKey } from "karabiner.ts"

import { ifInputLanguage } from "../helpers/conditions"
import { InputLanguages } from "../values/input-languages"
import { switchAppModeOff } from "./layer-lcmd/app-switch/shared"

export const imeRule = () => {
  return rule("日本語IMEの変換ショートカットを追加する。").manipulators([
    map("k", ["left_command"])
      .to([{ key_code: "japanese_eisuu" }, toKey("k", ["left_command"])])
      .condition(ifInputLanguage(InputLanguages.ja), switchAppModeOff)
      .description("日本語入力中のCommand+K前に英数へ切り替える"),
    map("a", ["left_option"])
      .to(toKey("f7", ["fn"]))
      .condition(ifInputLanguage(InputLanguages.ja))
      .description("Option+Aでカタカナ変換する"),
  ])
}
