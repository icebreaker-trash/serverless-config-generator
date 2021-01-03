const generate = require('../lib')
const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
process.chdir(path.resolve(__dirname, './fixtures'))
test('js to default name yml', () => {
  generate()
  expect(fs.existsSync('serverless.yml')).toBe(true)
})

test('output filename', () => {
  const targetFilename = 'serverless.b.yml'
  generate({
    output: {
      filename: targetFilename
    }
  })
  expect(fs.existsSync(targetFilename)).toBe(true)
})

test('content is matched js code', () => {
  const targetFilename = 'serverless.matched.yml'
  generate({
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
  generate({
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
  generate({
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
  generate({
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
