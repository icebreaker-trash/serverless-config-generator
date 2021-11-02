import fs from 'fs'
import path from 'path'
import execa from 'execa'

const EXECUTABLE_PATH = path.resolve(path.join(__dirname, '../../bin/sls-gen'))

describe('bin/sls-gen', () => {
  process.chdir(path.resolve(__dirname, '../fixtures'))

  function runSlsGen (args?, options?) {
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

  test('default serverless.js to serverless.yml', async () => {
    await runSlsGen()
    expect(fs.existsSync('./serverless.yml')).toBe(true)
  })

  test('change opts', async () => {
    await runSlsGen(['-i', 'serverless.v2.js', '-o', 'serverless.v2.yml'])
    expect(fs.existsSync('./serverless.v2.yml')).toBe(true)
  })
})
