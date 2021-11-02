import path from 'path'

export const targetFilename = 'serverless.yml'

export function getDefaults (cwdPath:string) {
  return {
    input: path.resolve(cwdPath, 'serverless.js'),
    output: path.resolve(cwdPath, targetFilename)
  }
}
