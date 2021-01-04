# serverless-config-generator

> use js to generate serverless.yml

a util help you to generate serverless framework deploy file fluently

## Installation

```sh
# global cli
npm i -g serverless-config-generator
yarn global add serverless-config-generator

//or
npm i -D serverless-config-generator
yarn add -D serverless-config-generator
```

## How to use

if you install globally
you could run

```sh
# in your target dir
sls-gen
# serverless.js to serverless.yml
sls-gen -i serverless.layer.js -o serverless.layer.yml
```

or write jscode in Node.js 

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
