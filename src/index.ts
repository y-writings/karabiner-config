import { obsidianRule } from "./rules/application/obsidian"
import { slackRule } from "./rules/application/slack"
import { emacsKeybindingMinimalRule } from "./rules/emacs-keybinding-minimal"
import { imeRule } from "./rules/ime"
import { layerLcmdAppSwitchMissionDownRule } from "./rules/layer-lcmd/app-switch/mission-down"
import { layerLcmdAppSwitchOperationRule } from "./rules/layer-lcmd/app-switch/operation"
import { layerLcmdAppSwitchStartRule } from "./rules/layer-lcmd/app-switch/start-and-reset"
import { layerLcmdImeRule } from "./rules/layer-lcmd/ime/ime"
import { layerLcmdStartRule } from "./rules/layer-lcmd/start-and-reset"
import { layerNumPadRule } from "./rules/layer-num/num-pad"
import { layerNumStartRule } from "./rules/layer-num/start-and-reset"
import { layerRcmdLeaderRule, layerRightCommandSignRule } from "./rules/layer-rcmd/sign"
import { layerSignRule } from "./rules/layer-sign/sign"
import {
  disableCommandRule,
  disableConflictingOptionCommandRule,
  preProcessControlCommandRule,
  vimEscapeCommandRule,
} from "./rules/override-command"
import { windowManagerCommandRule } from "./rules/window-manager/command"

export const rules = [
  vimEscapeCommandRule(),
  preProcessControlCommandRule(),
  disableConflictingOptionCommandRule(),
  imeRule(),
  layerLcmdStartRule(),
  layerLcmdAppSwitchStartRule(),
  layerLcmdAppSwitchOperationRule(),
  layerLcmdAppSwitchMissionDownRule(),
  layerLcmdImeRule(),
  layerRightCommandSignRule(),
  layerRcmdLeaderRule(),
  layerSignRule(),
  layerNumStartRule(),
  layerNumPadRule(),
  windowManagerCommandRule(),
  emacsKeybindingMinimalRule(),
  slackRule(),
  obsidianRule(),
  disableCommandRule(),
]
