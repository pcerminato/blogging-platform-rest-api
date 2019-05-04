import Mongoose from 'mongoose'

const postSchema = new Mongoose.Schema({
  title: {
    type: String,
    maxlength: 128,
    trim: true,
    required: true
  },
  body: {
    type: String,
    maxlength: 1024,
    trim: true,
    required: true
  },
  createdOn: {
    type: Date,
    required: true,
    default: Date.now
  },
  state: {
    type: String,
    required: true,
    enum: ['draft', 'private', 'public'],
    default: 'draft'
  },
  createdBy: {
    type: Mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'user'
  }
})

postSchema.index({ title: 1 })

export const Post = Mongoose.model('post', postSchema)
