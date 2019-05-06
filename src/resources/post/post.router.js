import { Router } from 'express'
import {
  getDrafts,
  getPublicAndPrivate,
  remove,
  create
} from './post.controller'

const postRouter = Router()

postRouter
  .route('/')
  .get(getPublicAndPrivate)
  .post(create)

postRouter.get('/drafts', getDrafts)

postRouter.route('/:id').delete(remove)

export default postRouter
