import { promises as fs } from 'fs'; // Use fs for file system operations

let config = null;

async function getConfig() {
    try {
        const data = await fs.readFile('./config.json', 'utf8');
        config = JSON.parse(data); // Parse the JSON data
    } catch (error) {
        console.error('Error reading config:', error);
    }
}

// Call getConfig to fetch and set the config
await getConfig();

export { config }; // Export the config variable after it has been set
