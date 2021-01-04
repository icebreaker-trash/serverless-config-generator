const childProcess = require('child_process')
const fs = require('fs')
// const assert = require('chai').assert
const path = require('path')
process.chdir(path.resolve(__dirname, '../fixtures'))
const EXECUTABLE_PATH = path.resolve(path.join(__dirname, '../../bin/sls-gen.js'))

describe('bin/sls-gen.js', () => {
  const forkedProcesses = new Set()

  function runSlsGen (args, options) {
    const newProcess = childProcess.fork(EXECUTABLE_PATH, args, Object.assign({
      silent: true
    }, options))
    forkedProcesses.add(newProcess)
    return newProcess
  }

  test('default serverless.js to serverless.yml', () => {
    runSlsGen()
    expect(fs.existsSync('./serverless.yml')).toBe(true)
  })

  test('change opts', () => {
    runSlsGen([
      '-i',
      'serverless.v2.js',
      '-o',
      'serverless.v2.yml'
    ])
    expect(fs.existsSync('./serverless.v2.yml')).toBe(true)
  })
})
