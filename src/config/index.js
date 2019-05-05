import { merge } from 'lodash'
const env = process.env.NODE_ENV || 'development'

const basicConfig = {
  port: 3030,
  env
}

let envConfig = {}

if (env === 'development') {
  envConfig = require('./dev')
}

module.exports = merge(basicConfig, envConfig)
