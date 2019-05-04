import { Router } from 'express'

const postRouter = Router()

const fakeController = (req, res) => {
  res.send({ message: 'this is a fake post' })
}

postRouter
  .route('/')
  .get(fakeController)
  .post(fakeController)

postRouter
  .route('/:id')
  .delete(fakeController)
  .put(fakeController)
  .get(fakeController)

export default postRouter
