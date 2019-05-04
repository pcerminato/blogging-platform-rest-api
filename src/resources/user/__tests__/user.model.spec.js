import { User } from '../user.model'
import Mongoose from 'mongoose'

describe('User Schema', () => {
  test('id', () => {
    const id = User.schema.obj.id
    expect(id).toEqual(Mongoose.SchemaTypes.ObjectId)
  })

  test('name', () => {
    const name = User.schema.obj.name
    expect(name).toEqual({
      type: String,
      required: true
    })
  })
})
