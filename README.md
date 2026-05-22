# karabiner-config

個人用の Karabiner-Elements 設定リポジトリです。

## 実行環境

- このリポジトリでは `Bun` + `karabiner.ts` を使用します（ローカルに Bun を入れなくても Docker 経由でビルド可能です）
- ツールのバージョン管理は `mise.toml` で行います
- 生成されるファイルは `build/karabiner.json` です

## ビルドと確認

```bash
mise install
mise run build
mise run check
```

- `mise run build` は `src/template/karabiner.json` を使って `src/build.ts` から `build/karabiner.json` を生成し、その後に整形します
- `mise run check` は生成された JSON を `karabiner_cli` で検証します

## インストール

- インストール先ファイルや設定ファイルの配置場所は `Karabiner-Elements` の公式ドキュメントを参照してください
- ビルド後に `build/karabiner.json` を `~/.config/karabiner/karabiner.json` へコピーするか、シンボリックリンクを作成してください
- 必要に応じて、シンボリックリンクの変更後または設定再生成後に Karabiner-Elements を再起動してください


## Docker 経由のビルド

- `mise run build` は `Dockerfile` を使ってコンテナ内で `build/karabiner.json` を生成します
- そのため、ローカルに Bun がインストールされていなくても `docker` があれば生成できます
