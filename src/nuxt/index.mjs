/**
 * **Created on 30/09/2023**
 *
 * src/nuxt/index.mjs
 * @author André Timermann <andre@timermann.com.br>
 *
 *  Only works with nuxt 3
 */

import snakeCase from 'lodash/snakeCase.js'

/**
 * Loads a public attribute defined with runtimeconfig and defined with an environment variable, validating whether it was defined
 *
 * @param {any} config
 * @param {string} attributeName  Nome do atributo a ser carregado e validado
 * @param {boolean }required      Se é requerido
 * @returns {Promise<void>}
 */
export function getEnvConfig (config, attributeName, required = true) {
  const envConfig = config.public[attributeName]

  if (!envConfig && required) {
    // eslint-disable-next-line no-undef
    throw showError({
      statusCode: 500,
      statusMessage: `Environment variable "NUXT_PUBLIC_${snakeCase(attributeName).toUpperCase()}" not defined in env file.`
    })
  }
  return envConfig
}
