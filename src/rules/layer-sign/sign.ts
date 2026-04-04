import { layer, map, toKey } from "karabiner.ts"
import { Layers } from "../../values/layers"
import { NotificationIds } from "../../values/notifications"
import { Variables } from "../../values/variables"

const manipulators = [
  map("e").to("open_bracket"),
  map("r").to("close_bracket"),
  map("d").to(toKey("9", ["left_shift"])),
  map("f").to(toKey("0", ["left_shift"])),
  map("j").to(toKey("open_bracket", ["left_shift"])),
  map("k").to(toKey("close_bracket", ["left_shift"])),
  //
  map("n").to(toKey("semicolon", ["left_shift"])),
  map("n").to(toKey("semicolon", ["left_shift"])),
  map("n", ["left_shift"]).to("semicolon"),
  map("u").to("grave_accent_and_tilde"),
  map("i").to(toKey("grave_accent_and_tilde", ["left_shift"])),
  map("q").to("f16"),
  map("w").to(toKey("f16", ["left_shift"])),
  map("v").to("f14"),
  map("c").to(toKey("f14", ["left_shift"])),
  map("o", { optional: "any" }).to("backslash"),
]

export const layerSignRule = () => {
  return layer(Layers.sign.value(), Variables.layerSign.value())
    .notification(NotificationIds.signLayerMode.value())
    .configKey((v) => {
      v.toIfAlone([])
    }, true)
    .manipulators(manipulators)
}
