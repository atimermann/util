import inquirer from 'inquirer'
import prompt from '../src/prompt/index.mjs'
import { jest } from '@jest/globals'

inquirer.prompt = jest.fn()

describe('choices', () => {
  beforeEach(() => {
    inquirer.prompt.mockReset()
  })

  it('should prompt user and return the index of the selected choice', async () => {
    const mockQuestion = 'What is your favourite colour?'
    const mockChoices = ['Red', 'Green', 'Blue']
    const mockAnswer = 'Green'

    inquirer.prompt.mockResolvedValueOnce({
      choices: mockChoices.indexOf(mockAnswer)
    })

    const selectedIndex = await prompt.choices(mockQuestion, mockChoices)

    expect(inquirer.prompt).toHaveBeenCalledWith([
      {
        type: 'list',
        name: 'choices',
        message: mockQuestion,
        choices: mockChoices,
        filter: function (val) {
          return mockChoices.indexOf(val)
        }
      }
    ])

    expect(selectedIndex).toEqual(mockChoices.indexOf(mockAnswer))
  })
})
