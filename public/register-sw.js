"use strict";
/**
 * Distributed with Ultraviolet and compatible with most configurations.
 */
const stockSW = "/ultraviolet/sw.js";

/**
 * List of hostnames that are allowed to run serviceworkers on http://
 */
const swAllowedHostnames = ["localhost", "127.0.0.1"];

/**
 * Global util
 * Used in 404.html and index.html
 */
async function registerSW() {
	if (!navigator.serviceWorker) {
		if (
			location.protocol !== "https:" &&
			!swAllowedHostnames.includes(location.hostname)
		)
			throw new Error(
				"Service workers cannot be registered without https.",
			);

		throw new Error("Your browser doesn't support service workers.");
	}

	await navigator.serviceWorker.register(stockSW);
       // This is the line you change to change the wisp server (essential for static hosting ofc)
       let wispUrl = `wss://${location.origin}/wisp/`;
       window.connection = new BareMux.BareMuxConnection();
       connection.setTransport("/epoxy/index.js", { wisp: `wss://${location.origin}/wisp/` });
}
