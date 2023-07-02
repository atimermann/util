// TODO: Automatizar com stdin ou jest, verificar qual é melhor

import { input, checkbox } from '../src/prompt/index.mjs'

describe('checkbox', () => {
  it('should prompt the user and return the index of the selected choice', async () => {
    const choices = ['a', 'b', 'c']
    const checked = ['a']
    const selectedChoices = await checkbox('Escolha um dos elementos', choices, checked)

    console.log('Selected Choices:', selectedChoices)
  })
})

describe('input', () => {
  it('should prompt the user and return the user\'s input as a string', async () => {
    const question = 'What is your name?'
    const defaultAnswer = 'John'

    const answer = await input(question, defaultAnswer)

    console.log(`Hello, ${answer}!`)
  })
})
