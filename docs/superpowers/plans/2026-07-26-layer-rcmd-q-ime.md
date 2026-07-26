# Right Command Layer `q` IME Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the right-command sign layer's `q` action switch Japanese input to English before sending Escape, while avoiding the unnecessary switch when input is already non-Japanese.

**Architecture:** Keep the behavior in the existing `layerRightCommandSignRule` and split its `q` mapping into two conditionally exclusive mappings. Reuse `ifInputLanguage`, `InputLanguages.ja`, `optionalAny`, and `resetAll`; do not add state variables or new abstractions.

**Tech Stack:** TypeScript, `karabiner.ts`, Bun test, Biome, generated Karabiner JSON.

---

### Task 1: Add a regression test for the two `q` mappings

**Files:**
- Create: `src/rules/layer-rcmd/sign.test.ts`

- [ ] **Step 1: Write the failing test**

Create the test file with this exact content:

```ts
import { expect, test } from "bun:test"

import { layerRightCommandSignRule } from "./sign"

const resetActions = [
  { set_variable: { name: "layer_num", value: 0 } },
  { set_notification_message: { id: "num_layer_mode", text: "" } },
]

test("q switches Japanese input before Escape and skips the switch otherwise", () => {
  const qManipulators = layerRightCommandSignRule()
    .build()
    .manipulators.filter((manipulator) => "key_code" in manipulator.from && manipulator.from.key_code === "q")

  expect(qManipulators).toHaveLength(2)
  expect(qManipulators).toEqual([
    expect.objectContaining({
      to: [{ key_code: "japanese_eisuu" }, { key_code: "escape" }, ...resetActions],
      conditions: expect.arrayContaining([
        {
          type: "input_source_if",
          input_sources: [{ language: "ja" }],
        },
      ]),
    }),
    expect.objectContaining({
      to: [{ key_code: "escape" }, ...resetActions],
      conditions: expect.arrayContaining([
        {
          type: "input_source_unless",
          input_sources: [{ language: "ja" }],
        },
      ]),
    }),
  ])
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run:

```bash
bun test src/rules/layer-rcmd/sign.test.ts
```

Expected: FAIL because the current source builds one `q` manipulator, always includes `japanese_eisuu`, and has no input-source condition.

- [ ] **Step 3: Commit the failing regression test**

```bash
git add src/rules/layer-rcmd/sign.test.ts
git commit -m "test: cover q IME handling"
```

### Task 2: Split the `q` mapping by input language

**Files:**
- Modify: `src/rules/layer-rcmd/sign.ts:1-7,31`

- [ ] **Step 1: Add the input-language imports**

Update the imports in `src/rules/layer-rcmd/sign.ts` to include the existing condition helper and language values:

```ts
import { ifInputLanguage, ifVarIs } from "../../helpers/conditions"
import { InputLanguages } from "../../values/input-languages"
```

- [ ] **Step 2: Replace the single `q` mapping**

Replace the current `q` mapping with these two mappings, preserving `optionalAny` and `resetAll`:

```ts
  map("q", [], optionalAny)
    .to([{ key_code: "japanese_eisuu" }, { key_code: "escape" }, ...resetAll])
    .condition(ifInputLanguage(InputLanguages.ja)),
  map("q", [], optionalAny)
    .to([{ key_code: "escape" }, ...resetAll])
    .condition(ifInputLanguage(InputLanguages.ja).unless()),
```

- [ ] **Step 3: Run the regression test to verify it passes**

Run:

```bash
bun test src/rules/layer-rcmd/sign.test.ts
```

Expected: PASS with one test passing and no warnings.

- [ ] **Step 4: Commit the implementation**

```bash
git add src/rules/layer-rcmd/sign.ts
git commit -m "fix: switch IME before right command escape"
```

### Task 3: Verify types, formatting, and generated configuration

**Files:**
- Modify: `build/karabiner.json` through the repository build command

- [ ] **Step 1: Run all tests and type checks**

Run:

```bash
bun test
bunx tsc --noEmit
bunx biome check src build/karabiner.json
```

Expected: all tests pass, TypeScript exits successfully, and Biome reports no fixes needed.

- [ ] **Step 2: Regenerate the Karabiner profile**

Run:

```bash
bun run src/build.ts
```

Expected: `build/karabiner.json` is regenerated without an error.

- [ ] **Step 3: Verify the generated `q` mappings**

Run:

```bash
bun -e '
const config = await Bun.file("build/karabiner.json").json()
const manipulators = config.profiles.flatMap((profile) => profile.complex_modifications.rules).flatMap((rule) => rule.manipulators)
const q = manipulators.filter((manipulator) => manipulator.from?.key_code === "q" && manipulator.conditions?.some((condition) => condition.type === "variable_if" && condition.name === "layer_rcmd"))
const japanese = q.find((manipulator) => manipulator.conditions.some((condition) => condition.type === "input_source_if"))
const nonJapanese = q.find((manipulator) => manipulator.conditions.some((condition) => condition.type === "input_source_unless"))
const keyCodes = (manipulator) => manipulator.to.filter((event) => event.key_code).map((event) => event.key_code)
if (q.length !== 2 || !japanese || !nonJapanese || JSON.stringify(keyCodes(japanese)) !== JSON.stringify(["japanese_eisuu", "escape"]) || JSON.stringify(keyCodes(nonJapanese)) !== JSON.stringify(["escape"])) process.exit(1)
console.log("generated q mappings verified")
'
```

Expected: `generated q mappings verified`.

- [ ] **Step 4: Format and inspect the final diff**

Run:

```bash
bunx biome format --write src/rules/layer-rcmd/sign.ts src/rules/layer-rcmd/sign.test.ts build/karabiner.json
git status --short
git diff --check
git diff -- src/rules/layer-rcmd/sign.ts src/rules/layer-rcmd/sign.test.ts build/karabiner.json
```

Expected: only the intended source, test, and generated configuration files are changed; `git diff --check` produces no output.

- [ ] **Step 5: Commit the generated configuration if changed**

```bash
git add build/karabiner.json
git commit -m "chore: regenerate karabiner configuration"
```
