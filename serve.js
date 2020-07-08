const express = require('express');
const path = require('path');
const {
    createProxyMiddleware
} = require('http-proxy-middleware');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./build'));

app.use('/api', createProxyMiddleware({
    target: "https://dochatservice.herokuapp.com",
    changeOrigin: true,
}));

app.use('/chating', createProxyMiddleware({
    target: "wss://dochatservice.herokuapp.com/ws",
    changeOrigin: true,
}));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

// Start the app by listening on the default port
app.listen(process.env.PORT || 4200);