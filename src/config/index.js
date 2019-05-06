import { merge } from 'lodash'
const env = process.env.NODE_ENV || 'development'

const basicConfig = {
  port: 3000,
  env,
  secrets: {
    jwtExp: '30d'
  }
}

let envConfig = {}

if (env === 'development' || env === 'dev') {
  envConfig = require('./dev')
} else if (env === 'testing' || env === 'test') {
  envConfig = require('./testing')
} else {
  envConfig = require('./dev')
}

module.exports = merge(basicConfig, envConfig)
