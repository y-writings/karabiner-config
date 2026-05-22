FROM oven/bun:1.3.10@sha256:b86c67b531d87b4db11470d9b2bd0c519b1976eee6fcd71634e73abfa6230d2e

WORKDIR /workspace

CMD ["bash", "-lc", "bun install --frozen-lockfile && bun src/build.ts && bun run biome check --write src/ build/karabiner.json"]
