const express = require('express');
const path = require('path');
const {
    createProxyMiddleware
} = require('http-proxy-middleware');

const app = express();

// Serve only the static files form the dist directory
app.use(express.static('./build'));

app.use('/platform', createProxyMiddleware({
    target: process.argv.length >= 3 && process.argv[2] ? process.argv[2] : "http://localhost:8085",
    changeOrigin: true,
}));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname, 'build/index.html'));
});

// Start the app by listening on the default port
app.listen(process.env.PORT || 4200);