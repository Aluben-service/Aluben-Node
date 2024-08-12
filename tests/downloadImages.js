const fs = require('fs');
const axios = require('axios');
const path = require('path');
const crypto = require('crypto');

// Path to your JSON file (adjusted to your file location)
const filePath = path.join(__dirname, '../public/assets/json/games.json');
// Directory to save downloaded images
const imagesDir = path.join(__dirname, 'images');

// Function to generate a unique file name based on URL
const generateFileName = (url) => {
    const urlObj = new URL(url);
    const cleanPath = urlObj.pathname.replace(/[^a-zA-Z0-9]/g, '_'); // Replace non-alphanumeric characters with '_'
    const fileNameHash = crypto.createHash('md5').update(url).digest('hex');
    const ext = path.extname(urlObj.pathname) || '.jpg'; // Default to .jpg if no extension
    return `${fileNameHash}${ext}`;
};

// Function to check if a URL should be ignored based on query parameters
const shouldIgnoreUrl = (url) => {
    const urlObj = new URL(url);
    // Check if the URL has a query string
    return urlObj.searchParams.has('v');
};

// Function to download an image
const downloadImage = async (url, filePath) => {
    try {
        const response = await axios({
            url,
            responseType: 'stream',
        });

        response.data.pipe(fs.createWriteStream(filePath));

        console.log(`Downloaded ${url} to ${filePath}`);
    } catch (error) {
        console.error(`Error downloading ${url}:`, error.message);
    }
};

// Ensure the images directory exists
if (!fs.existsSync(imagesDir)) {
    fs.mkdirSync(imagesDir);
}

// Read and parse the JSON file
fs.readFile(filePath, 'utf8', async (err, data) => {
    if (err) {
        console.error('Error reading the file:', err.message);
        return;
    }

    let json;
    try {
        json = JSON.parse(data);
    } catch (error) {
        console.error('Error parsing JSON:', error.message);
        return;
    }

    if (!Array.isArray(json)) {
        console.error('Expected JSON to be an array.');
        return;
    }

    // Download all images, ignoring specific URLs
    for (const item of json) {
        if (item.img) {
            const url = item.img;

            // Check if URL should be ignored
            if (shouldIgnoreUrl(url)) {
                console.log(`Ignoring URL: ${url}`);
                continue;
            }

            const fileName = generateFileName(url);
            const filePath = path.join(imagesDir, fileName);
            await downloadImage(url, filePath);
        }
    }
});
