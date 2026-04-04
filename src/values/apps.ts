import { BundleIdentifier, BundleIdentifierList } from "../domain/bundle-identifier"

const vscode = BundleIdentifier.of("com.microsoft.VSCode")
const zed = BundleIdentifier.of("dev.zed.Zed")

const ghostty = BundleIdentifier.of("com.mitchellh.ghostty")
const orbstack = BundleIdentifier.of("dev.kdrag0n.MacVirt")
const appleTerminal = BundleIdentifier.of("com.apple.Terminal")

const slack = BundleIdentifier.of("com.tinyspeck.slackmacgap")
const obsidian = BundleIdentifier.of("md.obsidian")

export const AppBundleIds = {
  editors: BundleIdentifierList.of(vscode, zed),
  codeEditors: BundleIdentifierList.of(vscode),
  editorsAndTerminals: BundleIdentifierList.of(vscode, zed, appleTerminal, ghostty, orbstack),
  terminals: BundleIdentifierList.of(appleTerminal, ghostty, orbstack),
  slack,
  obsidian,
}
