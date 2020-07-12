const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://b9192733f36f.ngrok.io',
      changeOrigin: true,
    })
  );
  // app.use(
  //   '/ws',
  //   createProxyMiddleware({
  //     target: 'ws://localhost:8000',
  //     changeOrigin: true,
  //   })
  // );
};
