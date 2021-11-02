const { generateSync, generate } = require('../dist')
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
process.chdir(path.resolve(__dirname, './fixtures'))

describe('sync function', () => {
  test('js to default name yml', () => {
    generateSync()
    expect(fs.existsSync('serverless.yml')).toBe(true)
  })

  test('output filename', () => {
    const targetFilename = 'serverless.b.yml'
    generateSync({
      output: {
        filename: targetFilename
      }
    })
    expect(fs.existsSync(targetFilename)).toBe(true)
  })

  test('content is matched js code', () => {
    const targetFilename = 'serverless.matched.yml'
    generateSync({
      output: {
        filename: targetFilename
      }
    })
    const jscode = require(path.resolve(__dirname, './fixtures/serverless.js'))
    const doc = yaml.load(fs.readFileSync(`./${targetFilename}`))
    expect(jscode).toEqual(doc)
  })

  test('put .yml to layer dir', () => {
    const targetFilename = 'serverless.layer.yml'
    const targetDir = path.resolve(__dirname, './fixtures/layer')
    generateSync({
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
      input: jsCodePath,
      output: {
        dir: targetDir,
        filename: targetFilename
      }
    })
    const jscode = require(jsCodePath)
    const doc = yaml.load(
      fs.readFileSync(path.resolve(targetDir, targetFilename))
    )
    expect(fs.existsSync(path.resolve(targetDir, targetFilename))).toBe(true)
    expect(jscode).toEqual(doc)
  })

  test('custom input version 2', () => {
    const targetFilename = 'serverless.custom.yml'
    const targetDir = path.resolve(__dirname, './fixtures/')
    const jsCodePath = path.resolve(__dirname, './fixtures/serverless.v2.js')
    generateSync({
      input: jsCodePath,
      output: {
        dir: targetDir,
        filename: targetFilename
      }
    })
    const jscode = require(jsCodePath)
    const doc = yaml.load(
      fs.readFileSync(path.resolve(targetDir, targetFilename))
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
      }
    })
    expect(fs.existsSync('serverless.async.yml')).toBe(true)
  })
})
