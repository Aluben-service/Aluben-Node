"use strict";
document.addEventListener("DOMContentLoaded", function (event) {
	/**
	 * @type {HTMLFormElement}
	 */
	const form = document.getElementById("ultraviolet-form");
	/**
	 * @type {HTMLInputElement}
	 */
	const address = document.getElementById("ultraviolet-address");
	/**
	 * @type {HTMLInputElement}
	 */
	const searchEngine = document.getElementById("ultraviolet-search-engine");
	/**
	 * @type {HTMLParagraphElement}
	 */
	const error = document.getElementById("ultraviolet-error");
	/**
	 * @type {HTMLPreElement}
	 */
	const errorCode = document.getElementById("ultraviolet-error-code");
	const connection = new BareMux.BareMuxConnection("/baremux/worker.js");

	form.addEventListener("submit", async (event) => {
		event.preventDefault();

		try {
			await registerSW();
		} catch (err) {
			error.textContent = "Failed to register service worker.";
			errorCode.textContent = err.toString();
			throw err;
		}

		const url = search(address.value, searchEngine.value);

		let frame = document.createElement("ifrme");
                frame.setAttribute("id", "ultraviolet-frame");
		frame.style.display = "block";
		let wispUrl =
			(location.protocol === "https:" ? "wss" : "ws") +
			"://" +
			location.host +
			"/wisp/";
		if ((await connection.getTransport()) !== "/epoxy/index.js")
			await connection.setTransport("/epoxy/index.js", [
				{ wisp: wispUrl },
			]);

		frame.src = __uv$config.prefix + __uv$config.encodeUrl(url);
	});
});
