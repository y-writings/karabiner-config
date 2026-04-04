import { map, rule, toKey } from "karabiner.ts"

import { ifAppId, ifVarIs } from "../../helpers/conditions"
import { setVar } from "../../helpers/events"
import { AppBundleIds } from "../../values/apps"
import { Variables } from "../../values/variables"

const obsidianApp = ifAppId(AppBundleIds.obsidian)

const manipulators = [
  map("k", ["command"]).to("f19").condition(obsidianApp),
  map("left_shift")
    .to([setVar(Variables.leftOneTap, 0), toKey("f17")])
    .condition(ifVarIs(Variables.leftOneTap, 1), obsidianApp),
  map("left_shift")
    .to([setVar(Variables.leftOneTap, 1), toKey("left_shift")])
    .parameters({
      "basic.to_delayed_action_delay_milliseconds": 500,
    })
    .toDelayedAction([setVar(Variables.leftOneTap, 0)], [setVar(Variables.leftOneTap, 0)])
    .condition(ifVarIs(Variables.leftOneTap, 0), obsidianApp),
]

export const obsidianRule = () => {
  return rule("obsidian.md Custom Key Bind").manipulators(manipulators)
}
