import { layer, map } from "karabiner.ts"
import { Hyper } from "../../values/hyper"
import { Layers } from "../../values/layers"
import { Variables } from "../../values/variables"

const optionalAny = "any"

export const windowManagerCommandRule = () => {
  return layer(Layers.wm.value(), Variables.layerWindowManager.value())
    .configKey((v) => {
      v.toIfAlone([])
    }, true)
    .manipulators([
      map("f", [], optionalAny).to(Hyper.wm.nextDisplay).description("next-display"),
      map("a", [], optionalAny).to(Hyper.wm.previousDisplay).description("previous-display"),
      map("s", [], optionalAny).to(Hyper.wm.leftHalf).description("left-half"),
      map("d", [], optionalAny).to(Hyper.wm.rightHalf).description("right-half"),
      map("m", [], optionalAny).to(Hyper.wm.maximize).description("maximize"),
    ])
}
