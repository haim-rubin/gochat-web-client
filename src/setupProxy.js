// This is not transpiled used only code natively supported by node
const path = require('path')
// const proxy = require('http-proxy-middleware')
const host = '127.0.0.1'
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

//   app.use(
//     proxy('/socket.io', {
//       target: `ws://${host}:${port}`,
//       ws: true
//     })
//   )

}