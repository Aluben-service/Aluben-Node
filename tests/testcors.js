const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
const port = 3000;

const allowedOrigin = 'https://yourwebsite.com'; // Replace with your website's domain

// Middleware to check if the request's origin is allowed
const originCheck = (req, res, next) => {
    const origin = req.headers.origin;
    if (origin === allowedOrigin || origin === undefined) {
        next();
    } else {
        res.status(403).send('Forbidden');
    }
};

// Middleware to extract and validate the target URL from request headers
const targetMiddleware = (req, res, next) => {
    const targetUrl = req.headers['x-target-url'];
    if (!targetUrl) {
        return res.status(400).send('Missing target URL header');
    }
    req.targetUrl = targetUrl;
    next();
};

// Proxy endpoint
app.use('/proxy', originCheck, targetMiddleware, (req, res, next) => {
    const proxy = createProxyMiddleware({
        target: req.targetUrl,
        changeOrigin: true,
        pathRewrite: {
            '^/proxy': '', // Remove /proxy from the URL path
        },
        onProxyRes: (proxyRes, req, res) => {
            // Force 200 status code for any response
            res.status(200);
        },
        onError: (err, req, res) => {
            console.error('Proxy error:', err.message);
            // Send a default 200 response even if there is an error
            res.status(200).send('Proxy error, but response is OK');
        },
    });

    proxy(req, res, next);
});

app.get('/display', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.listen(port, () => {
    console.log(`CORS proxy server running at http://localhost:${port}`);
});
