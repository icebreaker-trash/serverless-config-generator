import { yaml } from '@/index'
describe('yaml module', () => {
  test('yaml dump', () => {
    const res = yaml.load(`
    a: 1
    `) as { a: number }

    expect(res.a).toBe(1)
  })
})
