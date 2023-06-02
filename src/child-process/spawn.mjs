/**
 * **Created on 02/06/2023**
 *
 * src/child-process/spawn.mjs
 * @author André Timermann <andre@timermann.com.br>
 *
 */
import parseCommand from '../parse-command.mjs'
import { spawn as processSpawn } from 'child_process'

export default function spawn (commandText) {
  return new Promise((resolve, reject) => {
    const [command, args] = parseCommand(commandText)

    const pHandler = processSpawn(command, args, { shell: true })

    pHandler.stdout.on('data', (data) => {
      process.stdout.write(data.toString())
    })

    pHandler.stderr.on('data', (data) => {
      process.stderr.write(data.toString())
    })

    pHandler.on('error', (error) => {
      process.stdout.write(JSON.stringify(error, undefined, ' '))
    })

    pHandler.on('close', (code) => {
      if (code === 0) {
        resolve(code)
      } else {
        console.error(`child process exited with code ${code}`)
        reject(code)
      }
    })

    process.on('SIGINT', function () {
      console.log('Caught interrupt signal')
      pHandler.kill('SIGINT')
    })
  })
}
