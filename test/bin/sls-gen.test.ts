import fs from 'node:fs'
import path from 'node:path'
import { execa } from 'execa'
import type { Options } from 'execa'

const EXECUTABLE_PATH = path.resolve(path.join(__dirname, '../../bin/sls-gen'))

const fixturesRoot = path.resolve(__dirname, '../fixtures')

function resolve(...args: string[]) {
  return path.resolve(fixturesRoot, ...args)
}

function runSlsGen(args?: readonly string[], options?: Options<'utf8'>) {
  return execa(
    EXECUTABLE_PATH,
    args,
    Object.assign(
      {
        silent: true
      },
      options
    )
  )
}

describe.skip('bin/sls-gen', () => {
  // process.chdir(path.resolve(__dirname, '../fixtures'))

  test('default serverless.js to serverless.yml', async () => {
    await runSlsGen()
    expect(fs.existsSync(resolve('./serverless.yml'))).toBe(true)
  })

  test('change opts', async () => {
    await runSlsGen(['-i', 'serverless.v2.js', '-o', 'serverless.v2.yml'])
    expect(fs.existsSync(resolve('./serverless.v2.yml'))).toBe(true)
  })
})
