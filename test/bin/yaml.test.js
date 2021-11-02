const { yaml } = require('../../dist/index')
describe('yaml module', () => {
  test('yaml dump', () => {
    const res = yaml.load(`
    a: 1
    `)

    expect(res.a).toBe(1)
  })
})
