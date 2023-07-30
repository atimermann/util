/**
 * **Created on 10/04/2021**
 *
 * index.js
 * @author André Timermann <andre@timermann.com.br>
 *
 */

import { fileURLToPath } from 'url'
import { dirname } from 'path'
import { readFile } from 'fs/promises'
import Multi from './multi.mjs'

export function __dirname (importMetaURL) {
  return dirname(fileURLToPath(importMetaURL))
}

export async function loadJson (path) {
  return JSON.parse(await readFile(path))
}

export async function parseCommand (commandString) {
  // Divida a string do comando em um array usando espaço como delimitador
  const parts = commandString.split(' ')

  // O comando é o primeiro item do array
  const command = parts[0]

  // Os argumentos são todos os itens restantes do array
  const args = parts.slice(1)

  return [command, args]
}

/**
 * Creates a delay in the execution of the JavaScript code.
 *
 * @param {number} ms - The amount of time, in milliseconds, to delay the execution of the subsequent code.
 *
 * @returns {Promise} - A Promise that resolves after the specified delay.
 *
 * @example
 * // Print 'Hello', wait for 2 seconds, then print 'World'.
 * console.log('Hello');
 * await sleep(2000);
 * console.log('World');
 */
export async function sleep (ms) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * Asynchronously generates and returns the current stack trace.
 *
 * This function creates a new Error object, extracts its stack trace,
 * and processes the stack trace to remove the first line (which would
 * indicate this function as the source of the Error).
 *
 * @returns {Promise<String>} A promise that resolves with a string representing the stack trace.
 *
 * @example
 *
 *  import { stacktrace } from '@agtm/util';
 *  console.log(stacktrace());
 */
export async function stacktrace () {
  const stack = new Error().stack
  return stack.split('\n').slice(1).join('\n')
}

export { Multi }
