const fs = require('fs');
const axios = require('axios');
const path = require('path');
const crypto = require('crypto');

// Path to your JSON file
const filePath = '../public/assets/json/games.json';
// Directory to save downloaded images
const imagesDir = path.join(__dirname, 'images');

// Function to generate a unique file name based on URL
const generateFileName = (url) => {
    const fileNameHash = crypto.createHash('md5').update(url).digest('hex');
    return `${fileNameHash}${path.extname(url) || '.jpg'}`; // Default to .jpg if no extension
};

// Function to check if a URL should be ignored based on a specific pattern
const shouldIgnoreUrl = (url) => {
    const urlPath = new URL(url).pathname;
    return /\/games\/\d+\/image/.test(urlPath);
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
