import path from 'node:path'
import { Command } from 'commander'
import type { IGeneratorOption } from './type'
import { generateSync } from './core'
const { version } = require('../package.json')

const program = new Command()

program.version(version)

program
  .option('-i, --input [path]', 'input .js path')
  .option('-o, --output [path]', 'output .yml path')

program.parse(process.argv)

const cwdPath = process.cwd()

function handlePath(p: string) {
  return path.isAbsolute(p) ? p : path.resolve(cwdPath, p)
}

const opt: IGeneratorOption = {}
const options = program.opts()

if (options.input && typeof options.input === 'string') {
  opt.input = handlePath(options.input)
}

if (options.output && typeof options.output === 'string') {
  opt.output = handlePath(options.output)
}
generateSync(opt)
