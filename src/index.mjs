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
