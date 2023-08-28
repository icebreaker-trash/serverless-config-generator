import fs, { promises as fsp } from 'node:fs'
import path from 'node:path'
import createJiti from 'jiti'
import yaml from 'js-yaml'
import type { IGeneratorOption, IOutputOption } from '@/type'
import { getDefaults, targetFilename } from '@/defaults'

const jiti = createJiti(__filename)

export { default as yaml } from 'js-yaml'

export function getOptions(cfg?: IGeneratorOption) {
  const cwdPath = cfg?.cwd ?? process.cwd()
  const defaults = getDefaults(cwdPath)

  const options = Object.assign({}, defaults, cfg)
  const { input } = options
  let { output } = options
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

export function generateSync(cfg?: IGeneratorOption) {
  try {
    const { input, output } = getOptions(cfg)
    if (!fs.existsSync(input)) {
      throw new Error(`${input} is not found!`)
    }

    const jsConfig = yaml.dump(jiti(input))
    fs.writeFileSync(output, jsConfig)
    console.log(`generate serverless.yml success! timestamp:${Date.now()}`)
    return true
  } catch (error) {
    console.error(`generate serverless.yml fail timestamp:${Date.now()}`)
    throw error
  }
}

export async function generate(cfg?: IGeneratorOption) {
  try {
    const { input, output } = getOptions(cfg)
    if (!fs.existsSync(input)) {
      throw new Error(`${input} is not found!`)
    }
    const jsConfig = yaml.dump(jiti(input))
    await fsp.writeFile(output, jsConfig)
    console.log(`generate serverless.yml success! timestamp:${Date.now()}`)
    return true
  } catch (error) {
    console.error(`generate serverless.yml fail timestamp:${Date.now()}`)
    throw error
  }
}
