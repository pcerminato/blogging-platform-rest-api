import Mongoose from 'mongoose'
import config from '../config'

const connect = (options = {}) => {
  return Mongoose.connect(config.mongodbUrl, {
    ...options,
    useNewUrlParser: true
  })
}

exports.connect = connect
