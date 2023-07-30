/**
 * Created on 30/07/23
 *
 * tests/multi.test.mjs
 * @author André Timermann <andre@timermann.com.br>
 *
 *     REF: https://www.codeproject.com/Articles/1189466/JavaScript-ES-Multiple-Inheritance-Class
 *
 */
export default class Multi {
  // Inherit method to create base classes.
  static inherit (..._bases) {
    class classes {
      // The base classes
      get base () { return _bases }

      constructor (..._args) {
        let index = 0

        for (const BaseClass of this.base) {
          const obj = new BaseClass(_args[index++])
          Multi.copy(this, obj)
        }
      }
    }

    // Copy over properties and methods
    for (const base of _bases) {
      Multi.copy(classes, base)
      Multi.copy(classes.prototype, base.prototype)
    }

    return classes
  }

  // Copies the properties from one class to another
  static copy (_target, _source) {
    for (const key of Reflect.ownKeys(_source)) {
      if (key !== 'constructor' && key !== 'prototype' && key !== 'name') {
        const desc = Object.getOwnPropertyDescriptor(_source, key)
        Object.defineProperty(_target, key, desc)
      }
    }
  }
}
