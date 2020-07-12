const { createProxyMiddleware } = require('http-proxy-middleware');
module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://1d77b4a084b7.ngrok.io',
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
