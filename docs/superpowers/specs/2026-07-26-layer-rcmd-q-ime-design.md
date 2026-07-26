# Right Command Layer `q` IME Design

## Goal

When `q` is pressed in the right-command sign layer:

- Japanese input sends `japanese_eisuu`, then `escape`, then resets the layer state.
- Non-Japanese input sends `escape`, then resets the layer state.

## Design

Replace the current single `q` mapping in `src/rules/layer-rcmd/sign.ts` with two mappings using the existing `optionalAny` modifier handling and `resetAll` actions:

- A Japanese-input mapping conditioned by `ifInputLanguage(InputLanguages.ja)`.
- A non-Japanese mapping conditioned by the inverse of that condition.

The two mappings remain in the existing right-command sign layer and do not introduce new variables or state tracking. The Japanese-input condition uses the same input-source abstraction already used by the numeric layer.

## Verification

Run the repository build and inspect `build/karabiner.json` to confirm that both generated mappings contain the expected conditions and action sequences. Run the repository formatter or type checks if available.
