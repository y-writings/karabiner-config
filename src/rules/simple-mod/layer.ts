import { map } from "karabiner.ts"

import { Layers } from "../../values/layers"

export const simpleModLayerRule = () => {
  return [
    map("right_command").to(Layers.rc.value()),
    map("right_shift").to(Layers.wm.value()),
    map("quote").to(Layers.sign.value()),
    map("right_option").to(Layers.nm.value()),
  ]
}
