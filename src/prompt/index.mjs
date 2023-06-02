/**
 * **Created on 02/06/2023**
 *
 * src/prompt/index.mjs
 * @author André Timermann <andre@timermann.com.br>
 *
 */

// TODO: @deprecated, usar o método abaixo como no checkbos
import inquirer from 'inquirer'

import checkbox from '@inquirer/checkbox'

export default {

  /**
   * This method provides a shortcut to create a list (radio-box style) prompt using Inquirer.js.
   * Given a question (a string) and an array of choices, it displays the prompt to the user and returns
   * the index of the user's chosen option in the array.
   *
   * The promise returned by this method is resolved when the user selects an option. The resolved value
   * is the index of the selected option in the provided choices array.
   *
   * @example
   *
   * choices('What is your favourite colour?', ['Red', 'Green', 'Blue'])
   *  .then(index => console.log(`You selected option ${index}`));
   *
   * @param {string} question - The question to display to the user.
   * @param {string[]} choices - An array of choices to present to the user.
   * @returns {Promise<number>} - A Promise that resolves to the index of the selected choice in the provided array.
   */
  async choices (question, choices) {
    const questions = [{
      type: 'list',
      name: 'choices',
      message: question,
      choices,
      filter: function (val) {
        return choices.indexOf(val)
      }
    }]

    // noinspection JSCheckFunctionSignatures
    const answers = await inquirer.prompt(questions)

    return answers.choices
  },

  /**
   * This method provides a shortcut to create a checkbox-style prompt using Inquirer.js and @inquirer/checkbox.
   * Given a question (a string) and an array of choices, it displays the prompt to the user and returns
   * an array of the user's selected options.
   *
   * The promise returned by this method is resolved when the user selects their options and submits the form.
   * The resolved value is an array of the selected choices.
   *
   * @example
   *
   * checkbox('Which colours do you like?', ['Red', 'Green', 'Blue'])
   *  .then(choices => console.log(`You selected: ${choices.join(', ')}`));
   *
   * @param {string} question - The question to display to the user.
   * @param {string[]} choices - An array of choices to present to the user.
   * @param {string[]} [checked = []] - An array of choices that should be pre-selected.
   * @param {boolean} [checkedAll = false] - Whether all choices should be pre-selected.
   * @returns {Promise<string[]>} - A Promise that resolves to an array of the selected choices.
   */
  async checkbox (question, choices, checked = [], checkedAll = false) {
    return await checkbox({
      message: question,
      choices: choices.map(c => {
        return { name: c, value: c, checked: checkedAll || checked.includes(c) }
      })
    })
  }
}
