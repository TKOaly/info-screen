const withCSS = require('@zeit/next-css')
const { parsed: localEnv } = require('dotenv').config()

module.exports = withCSS({
  serverRuntimeConfig: localEnv
});
