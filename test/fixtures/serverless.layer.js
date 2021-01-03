const { layerName } = require('./base.js')
const config = {
  component: 'layer',
  name: layerName,
  stage: 'dev',
  inputs: {
    name: layerName,
    region: 'ap-shanghai',
    src: {
      src: '../../../node_modules',
      targetDir: '/node_modules'
    },
    runtimes: ['Nodejs12.16']
  }
}

module.exports = config
