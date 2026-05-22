FROM oven/bun:1.3.10

WORKDIR /workspace

CMD ["bash", "-lc", "bun install --frozen-lockfile && bun src/build.ts && bun run biome check --write src/ build/karabiner.json"]
