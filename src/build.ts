import { mkdir } from "node:fs/promises"
import { writeToProfile } from "karabiner.ts"

import { rules } from "./index"
import { simpleModLayerRule } from "./rules/simple-mod/layer"
import { simpleModPrimitiveKeyRule } from "./rules/simple-mod/primitive"

const profileName = "Default profile"
const workspaceRoot = `${import.meta.dir}/..`
const templatePath = `${workspaceRoot}/src/template/karabiner.json`
const buildDir = `${workspaceRoot}/build`
const outputPath = `${buildDir}/karabiner.json`

const main = async () => {
  await mkdir(buildDir, { recursive: true })
  await Bun.write(outputPath, Bun.file(templatePath))

  writeToProfile(
    {
      name: profileName,
      karabinerJsonPath: outputPath,
    },
    rules,
    {},
    {
      simple_modifications: [...simpleModPrimitiveKeyRule(), ...simpleModLayerRule()],
    },
  )
}

await main()
