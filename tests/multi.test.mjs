import Multi from '../src/multi.mjs' // Ajuste o caminho do import de acordo com sua estrutura de arquivos

class ClassA {
  attrA = []
  static staticAttrA = []
  sharedAttribute = 'From ClassA'
  static sharedAttribute = 'From Static ClassA'

  instanceMethodA () {
    return this.attrA
  }

  static staticMethodA () {
    return this.staticAttrA
  }

  methodToOverride () {
    return 'ClassA'
  }
}

class ClassB {
  attrB = []
  static staticAttrB = []
  sharedAttribute = 'From ClassB'
  static sharedAttribute = 'From Static ClassB'

  instanceMethodB () {
    return this.attrB
  }

  static staticMethodB () {
    return this.staticAttrB
  }

  methodToOverride () {
    return 'ClassB'
  }
}

describe('multi-inheritance tests', () => {
  const MultiClass = Multi.inherit(ClassA, ClassB)
  let instance1
  let instance2

  beforeEach(() => {
    instance1 = new MultiClass()
    instance2 = new MultiClass()

    // Clear arrays directly
    MultiClass.staticAttrA = []
    MultiClass.staticAttrB = []
  })

  test('Instance attributes should not be shared between instances', () => {
    instance1.attrA.push('value1')
    instance1.attrB.push('value1')

    expect(instance1.attrA).toEqual(['value1'])
    expect(instance1.attrB).toEqual(['value1'])

    expect(instance2.attrA).toEqual([])
    expect(instance2.attrB).toEqual([])
  })

  test('Static attributes should be shared between instances', () => {
    MultiClass.staticAttrA.push('value2')
    MultiClass.staticAttrB.push('value2')

    expect(MultiClass.staticAttrA).toEqual(['value2'])
    expect(MultiClass.staticAttrB).toEqual(['value2'])
  })

  test('Instance methods should work correctly', () => {
    instance1.attrA.push('value3')
    instance1.attrB.push('value3')

    expect(instance1.instanceMethodA()).toEqual(['value3'])
    expect(instance1.instanceMethodB()).toEqual(['value3'])
  })

  test('Static methods should work correctly', () => {
    MultiClass.staticAttrA.push('value4')
    MultiClass.staticAttrB.push('value4')

    expect(MultiClass.staticMethodA()).toEqual(['value4'])
    expect(MultiClass.staticMethodB()).toEqual(['value4'])
  })

  test('MultiClass should inherit all properties of base classes', () => {
    const multiClassInstance = new MultiClass()
    const classAInstance = new ClassA()
    const classBInstance = new ClassB()

    for (const key of Object.getOwnPropertyNames(classAInstance)) {
      if (Object.prototype.hasOwnProperty.call(classBInstance, key)) {
        expect(multiClassInstance[key]).toEqual(classBInstance[key])
      } else {
        expect(multiClassInstance[key]).toEqual(classAInstance[key])
      }
    }

    for (const key of Object.getOwnPropertyNames(classBInstance)) {
      expect(multiClassInstance[key]).toEqual(classBInstance[key])
    }
  })

  test('MultiClass should inherit all methods of base classes', () => {
    const multiClassInstance = new MultiClass()
    const classAInstance = new ClassA()
    const classBInstance = new ClassB()

    for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(classAInstance))) {
      if (key !== 'constructor' && typeof classAInstance[key] === 'function') {
        if (!Object.prototype.hasOwnProperty.call(Object.getPrototypeOf(classBInstance), key)) {
          expect(multiClassInstance[key].toString()).toEqual(classAInstance[key].toString())
        }
      }
    }

    for (const key of Object.getOwnPropertyNames(Object.getPrototypeOf(classBInstance))) {
      if (key !== 'constructor' && typeof classBInstance[key] === 'function') {
        expect(multiClassInstance[key].toString()).toEqual(classBInstance[key].toString())
      }
    }
  })

  test('Method overriding should work correctly', () => {
    const instance = new MultiClass()
    expect(instance.methodToOverride()).toEqual('ClassB')
  })

  test('Attribute override test', () => {
    const multiClassInstance = new MultiClass()

    expect(multiClassInstance.sharedAttribute).toEqual('From ClassB')
  })

  test('Static attribute override test', () => {
    expect(MultiClass.sharedAttribute).toEqual('From Static ClassB')
  })
})
