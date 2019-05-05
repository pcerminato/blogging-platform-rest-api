import controller from '../post.controller'
import { isFunction } from 'lodash'

describe('Post controller', () => {
  test('All crud methods are implemented', () => {
    const crudMethodsNames = ['create', 'read', 'readMany', 'remove', 'update']

    crudMethodsNames.forEach(name => {
      expect(isFunction(controller[name])).toBe(true)
    })
  })
})
