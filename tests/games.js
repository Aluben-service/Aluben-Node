const fs = require("fs");
const axios = require("axios");
const path = require("path");

// Path to the JSON files
const filePath = path.join(__dirname, "../public/assets/json/games.json");
const downFilePath = path.join(__dirname, "down.json");

// Function to check if the URL is accessible
const checkURL = async (url) => {
	try {
		const response = await axios.head(url);
		return response.status === 200;
	} catch (error) {
		return false;
	}
};

// Function to update the JSON file
const updateJSONFile = async () => {
	try {
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
					`Adding to down list: ${game.name}, URL: ${isGameUp ? "Up" : "Down"}, Image: ${isImageUp ? "Up" : "Down"}`,
				);
				// Update URLup and Imageup based on the checks
				game.URLup = isGameUp ? "Up" : "Down";
				game.Imageup = isImageUp ? "Up" : "Down";
				downGames.push(game);
			}
		}

		// Write the down games to the down.json file
		fs.writeFileSync(downFilePath, JSON.stringify(downGames, null, 2));

		console.log("JSON files have been updated.");
	} catch (error) {
		console.error("Error reading or updating the JSON file:", error);
	}
};

// Run the update function
updateJSONFile();
