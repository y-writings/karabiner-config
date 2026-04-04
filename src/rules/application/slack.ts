import { map, rule, toKey } from "karabiner.ts"

import { ifAppId } from "../../helpers/conditions"
import { AppBundleIds } from "../../values/apps"

const manipulators = [
  map("l", ["command"])
    .to(toKey("f", ["command"]))
    .condition(ifAppId(AppBundleIds.slack)),
]

export const slackRule = () => {
  return rule("Slack Key Bind Minimal").manipulators(manipulators)
}
