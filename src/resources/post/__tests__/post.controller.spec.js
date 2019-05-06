import {
  postController,
  create,
  getDrafts,
  getPublicAndPrivate,
  remove
} from '../post.controller'
import { isFunction } from 'lodash'
import Mongoose from 'mongoose'
import { Post } from '../post.model'

describe('Post controller', () => {
  test('Crud methods are implemented', () => {
    const crudMethodsNames = [
      'create',
      'getPublicAndPrivate',
      'getDrafts',
      'remove',
      'search'
    ]

    crudMethodsNames.forEach(name => {
      expect(isFunction(postController[name])).toBe(true)
    })
  })

  test('Find all public and private posts created by the auth user', async () => {
    const authUser = Mongoose.Types.ObjectId()
    const otherUser = Mongoose.Types.ObjectId()

    await Post.create([
      {
        title: 'By auth user',
        body: 'hello world',
        createdBy: authUser,
        state: 'draft'
      },
      {
        title: 'Mores by auth user',
        body: 'bye world',
        createdBy: authUser,
        state: 'public'
      },
      {
        title: 'Fake data',
        body: 'bye world',
        createdBy: authUser,
        state: 'private'
      },
      {
        title: 'Not created by auth user',
        body: 'Lorem ipsum',
        createdBy: otherUser,
        state: 'private'
      },
      {
        title: 'By other user',
        body: 'hello other',
        createdBy: otherUser,
        state: 'public'
      },
      {
        title: 'By other user',
        body: 'hello other',
        createdBy: otherUser,
        state: 'draft'
      }
    ])

    const req = {
      user: {
        _id: authUser
      }
    }
    const res = {
      status(status) {
        expect(status).toBe(200)
        return this
      },
      json(result) {
        expect(result.data).toHaveLength(3)
        result.data.forEach(post => {
          expect(post.state).not.toBe('draft')
        })
      }
    }

    await getPublicAndPrivate(req, res)
  })

  test('Finds all drafts by auth user', async () => {
    expect.assertions(6)

    const authUser = Mongoose.Types.ObjectId()

    await Post.create([
      {
        title: 'By auth user',
        body: 'hello world',
        createdBy: authUser,
        state: 'draft'
      },
      {
        title: 'Mores by auth user',
        body: 'bye world',
        createdBy: authUser,
        state: 'draft'
      },
      {
        title: 'Mores by auth user but not a draft',
        body: 'Lorem ipsum',
        createdBy: authUser,
        state: 'private'
      },
      {
        title: 'By other user',
        body: 'hello other',
        createdBy: Mongoose.Types.ObjectId(),
        state: 'public'
      }
    ])

    const req = {
      user: {
        _id: authUser
      }
    }
    const res = {
      status(status) {
        expect(status).toBe(200)
        return this
      },
      json(result) {
        expect(result.data).toHaveLength(2)
        result.data.forEach(post => {
          expect(post.state).toBe('draft')
          expect(`${post.createdBy}`).toBe(`${authUser}`)
        })
      }
    }

    await getDrafts(req, res)
  })

  test('Authenticated user must be the creator of the doc', async () => {
    expect.assertions(2)
    const authUser = Mongoose.Types.ObjectId()
    const req = {
      user: {
        _id: authUser
      },
      body: {
        title: 'Testing creation w/auth',
        body: 'Lorem ipsum mock data'
      }
    }
    const res = {
      status(status) {
        expect(status).toBe(201)
        return this
      },
      json(result) {
        expect(`${result.data.createdBy}`).toBe(`${req.user._id}`)
      }
    }
    await create(req, res)
  })

  describe('Delete one post', () => {
    test('Removes one post by id and created by the auth user', async () => {
      const authUser = Mongoose.Types.ObjectId()
      const post = await Post.create({
        title: 'Fake title',
        body: 'Lorem ipsum mock data',
        createdBy: authUser
      })
      const req = {
        user: {
          _id: authUser
        },
        params: { id: post._id }
      }
      const res = {
        status(status) {
          expect(status).toBe(200)
          return this
        },
        json(result) {
          expect(result.data.createdBy).toEqual(authUser)
          expect(result.data._id).toEqual(post._id)
        }
      }
      await remove(req, res)
    })
  })
})
