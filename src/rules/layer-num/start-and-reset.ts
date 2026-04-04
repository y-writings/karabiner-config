import { map, rule } from "karabiner.ts"
import { ifInputLanguage, ifVarIs } from "../../helpers/conditions"
import { clearNotification, notify, setVar } from "../../helpers/events"
import { InputLanguages } from "../../values/input-languages"
import { Layers } from "../../values/layers"
import { NotificationIds } from "../../values/notifications"
import { Variables } from "../../values/variables"

const toSetNumMode = setVar(Variables.layerNum, 1)
const toClearNumMode = setVar(Variables.layerNum, 0)

const isNumModeOff = ifVarIs(Variables.layerNum, 0)
const isNumModeOn = ifVarIs(Variables.layerNum, 1)

export const layerNumStartRule = () => {
  return rule("数字レイヤーモードの開始とリセット").manipulators([
    // 日本語入力の場合：japanese_eisuuを実行してからNUMレイヤーを有効化
    map(Layers.nm.value())
      .to([{ key_code: "japanese_eisuu" }, toSetNumMode, notify(NotificationIds.numLayerMode, "NUM - Layer Enabled")])
      .condition(isNumModeOff, ifInputLanguage(InputLanguages.ja)),
    // それ以外（英語入力など）の場合：japanese_eisuuを実行せずにNUMレイヤーを有効化
    map(Layers.nm.value())
      .to([toSetNumMode, notify(NotificationIds.numLayerMode, "NUM - Layer Enabled")])
      .condition(isNumModeOff, ifInputLanguage(InputLanguages.ja).unless()),
    map(Layers.nm.value())
      .to([toClearNumMode, clearNotification(NotificationIds.numLayerMode)])
      .condition(isNumModeOn),
  ])
}
