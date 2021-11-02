import fs, { promises as fsp } from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import type { IGeneratorOption, IOutputOption } from './type'
import { getDefaults, targetFilename } from './defaults'
export { default as yaml } from 'js-yaml'

export function getOptions (cfg: IGeneratorOption) {
  const cwdPath = process.cwd()
  const defaults = getDefaults(cwdPath)

  const options = Object.assign({}, defaults, cfg)
  let { input, output } = options
  if (typeof output === 'object') {
    const output1 = output as IOutputOption
    let dir = cwdPath
    let filename = targetFilename

    if (output1.dir) {
      dir = output1.dir
    }
    if (output1.filename) {
      filename = output1.filename
    }
    output = path.resolve(dir, filename)
  }
  return {
    input,
    output
  }
}

export function generateSync (cfg: IGeneratorOption) {
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

export async function generate (cfg: IGeneratorOption) {
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
