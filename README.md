# `serverless-config-generator`

> use js to generate serverless.yml

a util help you to generate serverless framework deploy file fluently

## Installation

```sh
npm i -D serverless-config-generator

//or

yarn add -D serverless-config-generator
```

## How to use

```js
const { generateSync, generate } = require('serverless-config-generator')
const path = require('path')
// default
generateSync()
//or
async main(){
  await generate()
}
// process.cwd() serverless.js => serverless.yml

generateSync({
  input:path.resolve(__dirname,'./lib/xxx.js'),
  output:{
    dir:path.resolve(__dirname,'./layer'),
    filename:'serverless.layer.yml' 
  }
})

```

## Option

| params | type | default |
|---|---|---|
|input|`string`| `path.resolve(process.cwd(),'serverless.js')` |
|output|`string/Object`|`path.resolve(process.cwd(),'serverless.yml')`|
|output.dir|`string`|`undefined`|
|output.filename|`string`|`undefined`|
