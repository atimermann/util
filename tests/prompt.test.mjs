import prompt from '../src/prompt/index.mjs'

describe('checkbox', () => {
  it('should prompt user and return the index of the selected choice', async () => {
    console.log(await prompt.checkbox('Escolha um dos elementos', ['a', 'b', 'c'], ['a']))
  })
})
