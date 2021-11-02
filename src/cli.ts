import { Command } from 'commander'
import path from 'path'
import { generateSync } from './index'
import type { IGeneratorOption } from './type'
const { version } = require('../package.json')

const program = new Command()

program.version(version)

program
  .option('-i, --input [path]', 'input .js path')
  .option('-o, --output [path]', 'output .yml path')

program.parse(process.argv)

const cwdPath = process.cwd()
/**
 * @param {String} p
 */
function handlePath (p) {
  if (path.isAbsolute(p)) {
    return p
  } else {
    return path.resolve(cwdPath, p)
  }
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
