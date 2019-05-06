import { User } from '../user.model'

describe('User Schema', () => {
  test('email', () => {
    const email = User.schema.obj.email
    expect(email).toEqual({
      type: String,
      required: true,
      unique: true,
      trim: true
    })
  })

  test('password', () => {
    const password = User.schema.obj.password
    expect(password).toEqual({
      type: String,
      required: true
    })
  })
})
