const {
  Command
} = require('commander')
const program = new Command()
const path = require('path')
program.version(require('../package.json').version)
const {
  generateSync
} = require('../lib')
program.option('-i, --input [path]', 'input .js path').option('-o, --output [path]', 'output .yml path')

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

const opt = {}
if (program.input && typeof program.input === 'string') {
  opt.input = handlePath(program.input)
}
if (program.output && typeof program.output === 'string') {
  opt.output = handlePath(program.output)
}
generateSync(opt)
