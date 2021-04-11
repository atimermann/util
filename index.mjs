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
