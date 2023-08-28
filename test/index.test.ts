import fs from 'node:fs'
import path from 'node:path'
import yaml from 'js-yaml'
import { generate, generateSync } from '@/index'
const fixturesRoot = path.resolve(__dirname, './fixtures')

function resolve(...args: string[]) {
  return path.resolve(fixturesRoot, ...args)
}

// beforeEach(() => {
//   process.chdir(path.resolve(__dirname, './fixtures'))
// })
describe('sync function', () => {
  test('js to default name yml', () => {
    generateSync({
      cwd: fixturesRoot
    })
    const flag = fs.existsSync(resolve('serverless.yml'))
    expect(flag).toBe(true)
  })

  test('output filename', () => {
    const targetFilename = 'serverless.b.yml'
    generateSync({
      cwd: fixturesRoot,
      output: {
        filename: targetFilename
      }
    })
    expect(fs.existsSync(resolve(targetFilename))).toBe(true)
  })

  test('content is matched js code', () => {
    const targetFilename = 'serverless.matched.yml'
    generateSync({
      cwd: fixturesRoot,
      output: {
        filename: targetFilename
      }
    })
    const jscode = require(path.resolve(__dirname, './fixtures/serverless.js'))
    const doc = yaml.load(
      fs.readFileSync(resolve(`./${targetFilename}`), {
        encoding: 'utf8'
      })
    )
    expect(jscode).toEqual(doc)
  })

  test('put .yml to layer dir', () => {
    const targetFilename = 'serverless.layer.yml'
    const targetDir = path.resolve(__dirname, './fixtures/layer')
    generateSync({
      cwd: fixturesRoot,
      output: {
        dir: targetDir,
        filename: targetFilename
      }
    })
    expect(fs.existsSync(path.resolve(targetDir, targetFilename))).toBe(true)
  })

  test('custom input version 1', () => {
    const targetFilename = 'serverless.layer2.yml'
    const targetDir = path.resolve(__dirname, './fixtures/layer')
    const jsCodePath = path.resolve(__dirname, './fixtures/serverless.layer.js')
    generateSync({
      cwd: fixturesRoot,
      input: jsCodePath,
      output: {
        dir: targetDir,
        filename: targetFilename
      }
    })
    const jscode = require(jsCodePath)
    const doc = yaml.load(
      fs.readFileSync(path.resolve(targetDir, targetFilename), {
        encoding: 'utf8'
      })
    )
    expect(fs.existsSync(path.resolve(targetDir, targetFilename))).toBe(true)
    expect(jscode).toEqual(doc)
  })

  test('custom input version 2', () => {
    const targetFilename = 'serverless.custom.yml'
    const targetDir = path.resolve(__dirname, './fixtures/')
    const jsCodePath = path.resolve(__dirname, './fixtures/serverless.v2.js')
    generateSync({
      cwd: fixturesRoot,
      input: jsCodePath,
      output: {
        dir: targetDir,
        filename: targetFilename
      }
    })
    const jscode = require(jsCodePath)
    const doc = yaml.load(
      fs.readFileSync(path.resolve(targetDir, targetFilename), {
        encoding: 'utf8'
      })
    )
    expect(fs.existsSync(path.resolve(targetDir, targetFilename))).toBe(true)
    expect(jscode).toEqual(doc)
  })
})

describe('async function', () => {
  test('js to default name yml', async () => {
    await generate({
      output: {
        filename: 'serverless.async.yml'
      },
      cwd: fixturesRoot
    })
    expect(fs.existsSync(resolve('serverless.async.yml'))).toBe(true)
  })
})
