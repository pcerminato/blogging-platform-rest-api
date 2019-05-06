import { Router } from 'express'
import {
  getDrafts,
  getPublicAndPrivate,
  remove,
  create,
  search
} from './post.controller'

const postRouter = Router()

postRouter
  .route('/')
  .get(getPublicAndPrivate)
  .post(create)

postRouter.get('/drafts', getDrafts)
postRouter.get('/search', search)

postRouter.route('/:id').delete(remove)

export default postRouter
