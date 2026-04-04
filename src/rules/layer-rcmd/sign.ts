import { layer, map, rule, toKey, withCondition } from "karabiner.ts"
import { ifVarIs } from "../../helpers/conditions"
import { setVar } from "../../helpers/events"
import { Hyper } from "../../values/hyper"
import { Layers } from "../../values/layers"
import { resetAll } from "../../values/reset"
import { Variables } from "../../values/variables"

const optionalAny = "any"

const leaderOn = ifVarIs(Variables.layerRcmdLeader, 1)
const leaderOff = ifVarIs(Variables.layerRcmdLeader, 0)

const toLeaderOn = setVar(Variables.layerRcmdLeader, 1)
const toLeaderOff = setVar(Variables.layerRcmdLeader, 0)

const manipulators = [
  // 不要キーを `toNone()` しているため、modifierは明示的に許可する必要がある
  map("left_shift").to("left_shift"),
  map("left_command").to("left_command"),
  map("left_option").to("left_option"),
  // 記号入力
  map("f", [], optionalAny).to("hyphen"),
  map("g", [], optionalAny).to("equal_sign"),
  map("spacebar", []).to(toKey("slash", ["left_shift"])),
  map("spacebar", ["left_shift"]).to("slash"),
  // エディタなどの入力系ツールのオペレーション
  map("j", ["left_shift"]).to("delete_forward"),
  map("j", []).to("delete_or_backspace"),
  map("e", [], optionalAny).to("return_or_enter"),
  map("q", [], optionalAny).to([{ key_code: "japanese_eisuu" }, { key_code: "escape" }, ...resetAll]),
  map("t", [], optionalAny).to("tab"),
  // Commandキーに対応するOS標準ショートカットキー
  // 体が覚えてしまっているため、設定している。
  map("a").to(toKey("a", ["left_command"])),
  map("s").to(toKey("s", ["left_command"])),
  map("z", [], optionalAny).to(toKey("z", ["left_command"])),
  map("x").to(toKey("x", ["left_command"])),
  map("c").to(toKey("c", ["left_command"])),
  map("v").to(toKey("v", ["left_command"])),
  // leaderキーを有効化
  withCondition(leaderOff)([
    map("l").to(toLeaderOn).toDelayedAction([toLeaderOff], []).parameters({
      "basic.to_delayed_action_delay_milliseconds": 2000,
    }),
  ]),
  // leaderキー操作の中で特に起動回数が多いものは直接起動できるようにする
  map("o").to(Hyper.app.raycast).description("Raycast: Command Palette"),
  map("w").to(Hyper.app.clipboardHistory).description("Raycast: Clipboard History"),
  map("i").to(Hyper.app.homerow),
  map("n").to(Hyper.app.betterTouchToolClearAllNotifications),
  // 想定外の動作を防ぐため、許可したキー以外は無効化する
  map({ any: "key_code" }).toNone(),
]

export const layerRightCommandSignRule = () => {
  return layer(Layers.rc.value(), Variables.layerRcmd.value())
    .configKey((v) => {
      v.to(toLeaderOff)
      v.toIfAlone([])
    }, true)
    .manipulators(manipulators)
}

/**
 * When you enable leader mode, you can activate a specific application when you press a specific key.
 * The application is activated by Raycast.
 * Therefore, if you want to add an application, you can do so in the following steps.
 *
 * 1. Open Raycast settings
 * 2. Open `Extensions` tab
 * 3. Register `Hotkey`
 * 4. Add the application to the layerRcmdLeaderRule manipulators
 *
 * @returns Rule
 */
export const layerRcmdLeaderRule = () => {
  return rule("Launch application with Leader mode")
    .condition(leaderOn)
    .manipulators([
      map("o").to([Hyper.app.raycast, toLeaderOff]).description("Raycast: Command Palette"),
      map("w").to([Hyper.app.clipboardHistory, toLeaderOff]).description("Raycast: Clipboard History"),
      map("s").to([Hyper.app.switchWindows, toLeaderOff]).description("Raycast: Switch Windows"),
      map("i").to([Hyper.app.obsidian, toLeaderOff]).description("Obsidian"),
      map("d").to([Hyper.app.dbeaver, toLeaderOff]).description("DBeaver"),
      map("g").to([Hyper.app.ghostty, toLeaderOff]).description("Ghostty"),
      map("c").to([Hyper.app.cursor, toLeaderOff]).description("Cursor"),
      map({ any: "key_code" }).to(toLeaderOff),
    ])
}
