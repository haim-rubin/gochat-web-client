// This is not transpiled used only code natively supported by node
const path = require('path')
// const proxy = require('http-proxy-middleware')
const host = 'localhost'
const port = '8080'
const { createProxyMiddleware } = require('http-proxy-middleware')
module.exports = function(app) {

  app.use(
    '/api',createProxyMiddleware( {
      target: `http://${host}:${port}`,
      logLevel: 'debug',
      pathRewrite: {
        '^/api': ''
      }
    })
  )

  app.use(
    createProxyMiddleware('/ws', {
      target: `ws://${host}:${port}`,
      ws: true
    })
  )

}