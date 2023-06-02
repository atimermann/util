/**
 * **Created on 02/06/2023**
 *
 * /spawn.test.mjs
 * @author André Timermann <andre@timermann.com.br>
 *
 */
import spawn from '../../src/child-process/spawn.mjs'

test('spawn function should parse command and log result', async () => {
  await spawn('ls -l')
})
