import { map, rule, toKey } from "karabiner.ts"

import { ifInputLanguage, unlessAppIn } from "../helpers/conditions"
import { AppBundleIds } from "../values/apps"
import { InputLanguages } from "../values/input-languages"
import { resetAll } from "../values/reset"

export const disableCommandRule = () => {
  return rule("OSレベルの組み込みショートカットを無効化する。").manipulators([
    map("h", ["command"])
      .toNone()
      .description("Hide Applicationを無効化する。")
      .condition(unlessAppIn(AppBundleIds.codeEditors)),
    map("tab", ["command"])
      .toNone()
      .description(
        [
          "Application Switchを無効化する。",
          "Application Switchそのものは別ショートカットキーで管理する。",
          "運指で癖がつかないように無効化するのが目的。",
        ].join(""),
      ),
    map("spacebar", ["command", "control"])
      .toNone()
      .description(
        ["Emoji Viewerを無効化する。", "たまに暴発するため。", "Emojiは必要であればRaycastを使用する。"].join(""),
      ),
  ])
}

export const vimEscapeCommandRule = () => {
  return rule("Vimでinsertモードを抜ける操作に前処理を挟む。").manipulators([
    map("c", ["left_control"])
      .to([{ key_code: "japanese_eisuu" }, { key_code: "escape" }, ...resetAll, toKey("c", ["left_control"])])
      .condition(ifInputLanguage(InputLanguages.ja))
      .description(["vimでinsertモードから抜ける。", "日本語入力を同時に解除する。"].join("")),
    map("c", ["left_control"])
      .to([{ key_code: "escape" }, ...resetAll, toKey("c", ["left_control"])])
      .condition(ifInputLanguage(InputLanguages.ja).unless())
      .description(["vimでinsertモードから抜ける。"].join("")),
  ])
}

const withEisuuIfInputJa = ["x", "t", "s"] as const
export const preProcessControlCommandRule = () => {
  return rule("既存コマンドの1ストローク目に前処理を挟む。").manipulators([
    ...withEisuuIfInputJa.map((fromKey) => {
      return map(fromKey, ["left_control"])
        .to([{ key_code: "japanese_eisuu" }, ...resetAll, toKey(fromKey, ["left_control"])])
        .condition(ifInputLanguage(InputLanguages.ja))
        .description(["zellijやopencodeの1ストローク目のキーが押されたとき、日本語入力を解除する。"].join(""))
    }),
  ])
}

export const disableConflictingOptionCommandRule = () => {
  return rule("競合しやすい既存ショートカットを一時的に無効化する。").manipulators([
    map("j", ["left_option"])
      .toNone()
      .description(
        [
          "typo防止のため、一時的に無効化している。",
          "本来はArcでタブ移動に割り当てている。",
          "NotionとArc操作がコンフリクトし、Notion側にキー入力が多発したため、無効化。",
        ].join(""),
      ),
    map("k", ["left_option"])
      .toNone()
      .description(
        [
          "typo防止のため、一時的に無効化している。",
          "本来はArcでタブ移動に割り当てている。",
          "NotionとArc操作がコンフリクトし、Notion側にキー入力が多発したため、無効化。",
        ].join(""),
      ),
  ])
}
