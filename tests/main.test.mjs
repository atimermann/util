function add (a, b) {
  return a + b
}

describe('Main', () => {
  test('add function should correctly add two numbers', () => {
    expect(add(1, 2)).toBe(3)
    expect(add(-1, 2)).toBe(1)
    expect(add(5, 3)).toBe(8)
  })
})
