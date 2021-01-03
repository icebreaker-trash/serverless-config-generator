const fs = require('fs')
const fsp = fs.promises
const yaml = require('js-yaml')
const path = require('path')
// const noop = () => {}
// the name call serverless.yml is defined by serverless framework as a default config name
const targetFilename = 'serverless.yml'

function getOptions (cfg) {
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
  return {
    input,
    output
  }
}
/**
 * serverless.js to serverless.yml
 * @default value
 * @typedef {Object} OutputOption
 * @property {String} dir
 * @property {String} filename
 * @typedef {Object} GeneratorOption
 * @property {String} input
 * @property {String|OutputOption} output
 */

/**
 * @description Sync generate config
 * @param {GeneratorOption} cfg
 */
function generateSync (cfg) {
  try {
    const { input, output } = getOptions(cfg)
    const jsConfig = yaml.dump(require(input))
    fs.writeFileSync(output, jsConfig)
    console.log(`generate serverless.yml success! timestamp:${Date.now()}`)
    return true
  } catch (err) {
    console.error(`generate serverless.yml fail timestamp:${Date.now()}`)
    throw err
  }
}

/**
 * @description Async generate config
 * @param {GeneratorOption} cfg
 */
async function generate (cfg) {
  try {
    const { input, output } = getOptions(cfg)
    const jsConfig = yaml.dump(require(input))
    await fsp.writeFile(output, jsConfig)
    console.log(`generate serverless.yml success! timestamp:${Date.now()}`)
    return true
  } catch (err) {
    console.error(`generate serverless.yml fail timestamp:${Date.now()}`)
    throw err
  }
}

module.exports = {
  generate,
  generateSync,
  getOptions
}
