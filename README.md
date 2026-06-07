# karabiner-config

Karabiner-Elements の個人設定です。
`karabiner.ts` で `build/karabiner.json` を生成します。

## Requirements

- `mise`
- `docker`

## Build

```bash
mise install
mise run build
```

## Install

```bash
cp build/karabiner.json ~/.config/karabiner/karabiner.json
```

シンボリックリンクで管理する場合は、リンク先を `build/karabiner.json` に向けてください。

## Sync

ローカルの `y-writings/dotfiles` へ同期します。

```bash
mise run sync
```
