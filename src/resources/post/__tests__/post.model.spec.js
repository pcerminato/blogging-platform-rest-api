import { Post } from '../post.model'
import mongoose from 'mongoose'

describe('Post Schema', () => {
  test('title', () => {
    const title = Post.schema.obj.title
    expect(title).toEqual({
      type: String,
      required: true,
      trim: true,
      maxlength: 128
    })
  })

  test('body', () => {
    const body = Post.schema.obj.body
    expect(body).toEqual({
      type: String,
      required: true,
      trim: true,
      maxlength: 1024
    })
  })

  test('createdBy', () => {
    const createdBy = Post.schema.obj.createdBy
    expect(createdBy).toEqual({
      type: mongoose.SchemaTypes.ObjectId,
      required: true,
      ref: 'user'
    })
  })

  test('createdOn', () => {
    const date = Post.schema.obj.createdOn
    expect(date).toEqual({
      type: Date,
      required: true,
      default: Date.now
    })
  })

  test('state', () => {
    const state = Post.schema.obj.state
    expect(state).toEqual({
      type: String,
      required: true,
      enum: ['draft', 'private', 'public'],
      default: 'draft'
    })
  })
})