const express = require('express');
const axios = require('axios');  // Import axios
const app = express();
const PORT = 3000;

// Middleware to handle requests
app.use(async (req, res) => {
    const targetUrl = req.headers['x-target-url'];
    if (!targetUrl) {
        return res.status(400).send('Missing target URL');
    }

    console.log(`Proxying request to ${targetUrl}`);

    try {
        // Forward the request to the target URL
        const response = await axios({
            method: req.method,  // Forward the request method (GET, POST, etc.)
            url: targetUrl,
            headers: req.headers,  // Forward the request headers
            data: req.method === 'POST' || req.method === 'PUT' ? req.body : undefined  // Forward the body for POST/PUT requests
        });

        // Set response headers and status
        res.status(response.status);
        Object.keys(response.headers).forEach(header => {
            res.setHeader(header, response.headers[header]);
        });

        // Send the response body
        res.send(response.data);
    } catch (error) {
        console.error('Error making request:', error);
        res.status(500).send('Error making request');
    }
});

app.listen(PORT, () => {
    console.log(`CORS Proxy running on http://localhost:${PORT}`);
});
