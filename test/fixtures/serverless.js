const name = 'demo'

module.exports = {
  org: 'Org' + name,
  app: 'App' + name,
  stage: 'dev',
  component: 'koa',
  name: 'koaDemo',
  inputs: {
    src: {
      src: './',
      exclude: ['.env']
    },
    region: 'ap-guangzhou',
    runtime: 'Nodejs10.15',
    apigatewayConf: {
      protocols: [
        'http',
        'https'
      ],
      environment: 'release'
    }
  }
}
