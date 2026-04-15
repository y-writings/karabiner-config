import { map, rule, toKey } from "karabiner.ts"

import { ifInputLanguage } from "../helpers/conditions"
import { InputLanguages } from "../values/input-languages"

export const imeRule = () => {
  return rule("日本語IMEの変換ショートカットを追加する。").manipulators([
    map("a", ["left_option"])
      .to(toKey("f7", ["fn"]))
      .condition(ifInputLanguage(InputLanguages.ja))
      .description("Option+Aでカタカナ変換する"),
  ])
}
