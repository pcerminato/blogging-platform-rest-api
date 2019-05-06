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
    default: Date.now
  },
  state: {
    type: String,
    enum: ['draft', 'private', 'public'],
    default: 'draft'
  },
  createdBy: {
    type: Mongoose.SchemaTypes.ObjectId,
    required: true,
    ref: 'user'
  }
})

postSchema.index({ createdBy: 1, state: 1 })

postSchema.index(
  {
    title: 'text',
    body: 'text'
  },
  {
    weights: {
      title: 2,
      body: 1
    }
  }
)

export const Post = Mongoose.model('post', postSchema)
