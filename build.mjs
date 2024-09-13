await Bun.build({
  target: 'node',
  entrypoints: ['./src/cli.ts'],
  outdir: './dist',
  minify: true,
  external: ['shelljs'],
})