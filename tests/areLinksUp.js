const fs = require("fs");
const axios = require("axios");
const path = require("path");

// Function to ensure the output directory exists
const ensureDirectoryExists = (filePath) => {
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
};

// Function to check if the URL is accessible
const checkURL = async (url) => {
    try {
        const response = await axios.head(url);
        return response.status === 200;
    } catch (error) {
        return false;
    }
};

// Function to update the JSON file for games
const updateGamesFile = async (filePath, downFilePath) => {
    try {
        filePath = path.join(__dirname, filePath);
        downFilePath = path.join(__dirname, downFilePath);

        // Check if the input file exists
        if (!fs.existsSync(filePath)) {
            throw new Error(`Input file not found: ${filePath}`);
        }

        const data = fs.readFileSync(filePath, "utf-8");
        let games = JSON.parse(data);

        let downGames = [];
        if (fs.existsSync(downFilePath)) {
            const downData = fs.readFileSync(downFilePath, "utf-8");
            downGames = JSON.parse(downData);
        }

        // Filter games based on URL and image accessibility
        const updatedGames = [];
        for (const game of games) {
            // Initialize URLup and Imageup if they don't exist
            if (!game.hasOwnProperty("URLup")) {
                game.URLup = "Unknown";
            }
            if (!game.hasOwnProperty("Imageup")) {
                game.Imageup = "Unknown";
            }

            const isGameUp = await checkURL(game.url);
            const isImageUp = await checkURL(game.img);

            if (isGameUp && isImageUp) {
                updatedGames.push(game);
            } else {
                console.log(
                    `Adding to down list: ${game.name}, URL: ${isGameUp ? "Up" : "Down"}, Image: ${isImageUp ? "Up" : "Down"}`
                );
                // Update URLup and Imageup based on the checks
                game.URLup = isGameUp ? "Up" : "Down";
                game.Imageup = isImageUp ? "Up" : "Down";
                downGames.push(game);
            }
        }

        // Ensure output directory exists
        ensureDirectoryExists(downFilePath);

        // Write the down games to the down.json file
        fs.writeFileSync(downFilePath, JSON.stringify(downGames, null, 2));

        console.log("Games JSON file has been updated.");
    } catch (error) {
        console.error("Error reading or updating the games JSON file:", error);
    }
};

// Function to update the JSON file for proxies
const updateProxysFile = async (filePath, downFilePath) => {
    try {
        filePath = path.join(__dirname, filePath);
        downFilePath = path.join(__dirname, downFilePath);

        // Check if the input file exists
        if (!fs.existsSync(filePath)) {
            throw new Error(`Input file not found: ${filePath}`);
        }

        const data = fs.readFileSync(filePath, "utf-8");
        const urls = JSON.parse(data);

        let downUrls = [];
        if (fs.existsSync(downFilePath)) {
            const downData = fs.readFileSync(downFilePath, "utf-8");
            downUrls = JSON.parse(downData);
        }

        // Check each URL
        const results = await Promise.all(urls.map(async (url) => {
            const isUrlUp = await checkURL(url);
            return { url, status: isUrlUp ? "Up" : "Down" };
        }));

        // Log and filter down URLs
        for (const result of results) {
            if (result.status === "Down") {
                console.log(`Proxy URL is down: ${result.url}`);
                downUrls.push(result.url);
            } else {
                console.log(`Proxy URL is up: ${result.url}`);
            }
        }

        // Ensure output directory exists
        ensureDirectoryExists(downFilePath);

        // Write the down URLs to the down.json file
        fs.writeFileSync(downFilePath, JSON.stringify(downUrls, null, 2));

        console.log("Proxys JSON file has been updated.");
    } catch (error) {
        console.error("Error reading or updating the proxys JSON file:", error);
    }
};

// Run the update functions
updateGamesFile("../public/assets/json/games.json", "output/downGames.json");
updateProxysFile("../public/assets/json/rammerhead.json", "output/downRammerheads.json");
