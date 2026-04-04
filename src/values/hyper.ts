import type { ModifierParam } from "karabiner.ts"
import { toKey } from "karabiner.ts"

const HyperNoShift: ModifierParam = ["left_command", "left_option", "left_control"]
const HyperFnNoShift: ModifierParam = ["fn", "left_command", "left_option", "left_control"]

export const Hyper = {
  wm: {
    nextDisplay: toKey("f1", HyperFnNoShift),
    previousDisplay: toKey("f2", HyperFnNoShift),
    leftHalf: toKey("f3", HyperFnNoShift),
    rightHalf: toKey("f4", HyperFnNoShift),
    maximize: toKey("f5", HyperFnNoShift),
  },
  app: {
    raycast: toKey("o", HyperNoShift),
    clipboardHistory: toKey("w", HyperNoShift),
    switchWindows: toKey("s", HyperNoShift),
    obsidian: toKey("i", HyperNoShift),
    dbeaver: toKey("d", HyperNoShift),
    ghostty: toKey("g", HyperNoShift),
    cursor: toKey("c", HyperNoShift),
    homerow: toKey("spacebar", HyperNoShift),
    // homerowClick: toKey("j", HyperNoShift),
    // homerowScroll: toKey("k", HyperNoShift),
    betterTouchToolClearAllNotifications: toKey("b", HyperNoShift),
  },
}
