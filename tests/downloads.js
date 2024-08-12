const fs = require('fs');
const axios = require('axios');
const path = require('path');

// Path to your JSON file
const filePath = '../public/assets/json/games.json';
// Directory to save downloaded images
const imagesDir = path.join(__dirname, 'images');

// Function to generate a unique file name based on URL
const generateFileName = (url) => {
    const urlPath = new URL(url).pathname;
    // Extract the game ID from the URL path
    const match = urlPath.match(/games\/(\d+)\/image/);
    if (match) {
        return `gameimage${match[1]}`;
    }
    // Default to a generic name if no match found
    return 'image';
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

    // Download all images
    for (const item of json) {
        if (item.img) {
            const url = item.img;
            const fileName = `${generateFileName(url)}.jpg`; // Append extension, default to .jpg
            const filePath = path.join(imagesDir, fileName);
            await downloadImage(url, filePath);
        }
    }
});
