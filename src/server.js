import express from 'express'
import { json, urlencoded } from 'body-parser'
import morgan from 'morgan'
import cors from 'cors'
import config from './config'

export const app = express()

app.disable('x-powered-by')

app.use(cors())
app.use(json())
app.use(urlencoded({ extended: true }))
app.use(morgan('dev'))

app.get('/', (req, res) => {
  res.send({ message: 'testing app' })
})

export const start = async () => {
  try {
    app.listen(config.port, () => {
      console.log(
        `Blogging RESTful API running on http://localhost:${config.port}`
      )
    })
  } catch (e) {
    console.error(e)
  }
}
