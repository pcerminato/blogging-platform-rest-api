"use strict";

var _lodash = require("lodash");

const env = process.env.NODE_ENV || 'development';
const basicConfig = {
  port: 3030,
  env
};
let envConfig = {};

if (env === 'development') {
  envConfig = require('./dev');
}

module.exports = (0, _lodash.merge)(basicConfig, envConfig);