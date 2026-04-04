import { VariableName } from "../domain/variable-name"

export const Variables = {
  layerRcmd: VariableName.of("layer_rcmd"),
  layerWindowManager: VariableName.of("layer_window_manager"),
  layerRcmdLeader: VariableName.of("layer_rcmd_leader"),
  layerLcmd: VariableName.of("layer_lcmd"),
  layerSign: VariableName.of("layer_sign"),
  layerNum: VariableName.of("layer_num"),
  //
  switchAppMode: VariableName.of("is_switch_app_mode"),
  switchAppModeDown: VariableName.of("is_switch_app_mode_in_mission_down"),
  switchAppModeUp: VariableName.of("is_switch_app_mode_in_mission_up"),
  inputEn: VariableName.of("is-input-en"),
  inputJa: VariableName.of("is-input-ja"),
  leftOneTap: VariableName.of("is-left-one-tap"),
  rightOneTap: VariableName.of("is-right-one-tap"),
  maximizeOneTap: VariableName.of("is-maximize-one-tap"),
  vimJFlag: VariableName.of("vim-j-flag"),
  vimSimul: VariableName.of("vim_emu_simul"),
  vimNormal: VariableName.of("vim_emu_normal"),
  vimInsert: VariableName.of("vim_emu_insert"),
  homerowOneTap: VariableName.of("homerow_one_tap"),
  testFlag: VariableName.of("is-test"),
}
