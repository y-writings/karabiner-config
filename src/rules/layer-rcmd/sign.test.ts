import { expect, test } from "bun:test"

import { layerRightCommandSignRule } from "./sign"

const resetActions = [
  { set_variable: { name: "layer_num", value: 0 } },
  { set_notification_message: { id: "num_layer_mode", text: "" } },
]

test("q switches Japanese input before Escape and skips the switch otherwise", () => {
  const qManipulators = layerRightCommandSignRule()
    .build()
    .manipulators.filter((manipulator) => {
      const from = manipulator.from
      return from != null && "key_code" in from && from.key_code === "q"
    })

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
