const fs = require('fs')
const yaml = require('js-yaml')
const path = require('path')

// the name call serverless.yml is defined by serverless framework as a default config name
const targetFilename = 'serverless.yml'

/**
 * @default value
 * serverless.js to serverless.yml
 */

/**
 * @typedef {Object} OutputOption
 * @property {String} dir
 * @property {String} filename
 * @typedef {Object} GeneratorOption
 * @property {String} input
 * @property {String|OutputOption} output
 * @param {GeneratorOption} cfg
 */
function generate (cfg) {
  try {
    const cwdPath = process.cwd()
    const defaults = {
      input: path.resolve(cwdPath, 'serverless.js'),
      output: path.resolve(cwdPath, targetFilename)
    }
    const options = Object.assign({}, defaults, cfg)
    let { input, output } = options
    if (typeof output === 'object') {
      let dir = cwdPath
      let filename = targetFilename
      if (output.dir) {
        dir = output.dir
      }
      if (output.filename) {
        filename = output.filename
      }
      output = path.resolve(dir, filename)
    }
    const jsConfig = yaml.dump(require(input))
    fs.writeFileSync(output, jsConfig)
    console.log(`generate serverless.yml success! timestamp:${Date.now()}`)
    return true
  } catch (err) {
    console.error(`generate serverless.yml fail timestamp:${Date.now()}`)
    throw err
  }
}
// generate.defaults = defaults

module.exports = generate
