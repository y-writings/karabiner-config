import { ifVarIs } from "../../helpers/conditions"
import { setVar } from "../../helpers/events"
import { Variables } from "../../values/variables"

export const layerLcmdOn = ifVarIs(Variables.layerLcmd, 1)

export const setLayerLcmdOn = setVar(Variables.layerLcmd, 1)

export const resetLayerLcmdState = [
  setVar(Variables.layerLcmd, 0),
  setVar(Variables.switchAppMode, 0),
  setVar(Variables.switchAppModeDown, 0),
  setVar(Variables.switchAppModeUp, 0),
]
