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

// -----------------------------------------------------------------
// Inquirer Prompt
// -----------------------------------------------------------------

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
