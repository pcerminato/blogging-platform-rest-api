import Mongoose from 'mongoose'

const userSchema = new Mongoose.Schema({
  id: Mongoose.SchemaTypes.ObjectId,
  name: {
    type: String,
    required: true
  }
})

export const User = Mongoose.model('user', userSchema)
