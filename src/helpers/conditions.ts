import { ifApp, ifInputSource, ifVar } from "karabiner.ts"

import type { BundleIdentifier, BundleIdentifierList } from "../domain/bundle-identifier"
import type { InputLanguage } from "../domain/input-language"
import type { VariableName } from "../domain/variable-name"

export const ifAppIn = (apps: BundleIdentifierList) => {
  return ifApp(apps.values())
}

export const ifAppId = (app: BundleIdentifier) => {
  return ifApp(app.value())
}

export const unlessAppIn = (apps: BundleIdentifierList) => {
  return ifAppIn(apps).unless()
}

export const ifVarIs = (name: VariableName, value: number) => {
  return ifVar(name.value(), value)
}

export const unlessVarIs = (name: VariableName, value: number) => {
  return ifVarIs(name, value).unless()
}

export const ifInputLanguage = (language: InputLanguage) => {
  return ifInputSource(language.toInputSource())
}
