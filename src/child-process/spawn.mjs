/**
 * **Created on 02/06/2023**
 *
 * src/child-process/spawn.mjs
 * @author André Timermann <andre@timermann.com.br>
 *
 */
import parseCommand from '../parse-command.mjs'
import { spawn as processSpawn } from 'child_process'

/**
 * Executes a given command in a shell and buffers the output. This function makes use of Node.js child_process.spawn method.
 *
 * This function takes a command as a string, parses it, then spawns a child process using the parsed command and arguments.
 * It handles stdout and stderr data events by writing any received data to the corresponding process streams.
 * Additionally, it handles the child process close event and resolves or rejects the returned promise depending on the exit code.
 *
 * A listener for the 'SIGINT' event is also attached to the process, which kills the child process when 'SIGINT' is received.
 * This allows graceful shutdown of the child process when the main process receives an interrupt signal.
 *
 * @example
 *
 * spawn('echo "Hello, World!"')
 *  .then(code => console.log(`Child process exited with code ${code}`))
 *  .catch(code => console.error(`Child process exited with code ${code}`));
 *
 * @param {string} commandText - The command to be executed in the shell.
 * @param {object}  env  Environment key-value pairs
 * .
 * @returns {Promise<number>} - A Promise that resolves to the exit code of the child process when it finishes
 *  successfully, or rejects with the exit code when it finishes with an error.
 */
export default function spawn (commandText, env = {}) {
  return new Promise((resolve, reject) => {
    const [command, args] = parseCommand(commandText)

    const pHandler = processSpawn(
      command,
      args,
      { shell: true, env: Object.assign({}, process.env, env) }
    )

    pHandler.stdout.on('data', (data) => {
      process.stdout.write(data.toString())
    })

    pHandler.stderr.on('data', (data) => {
      process.stderr.write(data.toString())
    })

    pHandler.on('error', (error) => {
      process.stderr.write(JSON.stringify(error, undefined, ' '))
    })

    pHandler.on('close', (code) => {
      if (code === 0) {
        resolve(code)
      } else {
        reject(code)
      }
    })

    process.once('SIGINT', function () {
      console.log('SPAWN: Caught interrupt signal')
      pHandler.kill('SIGINT')
    })
  })
}
