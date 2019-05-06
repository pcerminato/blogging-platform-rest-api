import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import config from './config'
import postRouter from './resources/post/post.router'
import userRouter from './resources/user/user.router'
import { connect } from './utils/db'
import { signup, signin, protect } from './utils/auth'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.post('/signup', signup)
app.post('/signin', signin)

app.use('/api', protect)
app.use('/api/user', userRouter)
app.use('/api/post', postRouter)

export const start = async () => {
  try {
    await connect()
    app.listen(config.port, () => {
      console.log(
        `Blogging RESTful API running on http://localhost:${config.port}`
      )
    })
  } catch (e) {
    console.error(e)
  }
}
