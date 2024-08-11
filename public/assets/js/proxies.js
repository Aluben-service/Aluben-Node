document.addEventListener("DOMContentLoaded", function (event) {
	var currentlink = 1;
	// Function to fetch JSON and populate select options
	function populateproxyOptions() {
		const proxiesContainer = document.getElementById("rammy");

		fetch("assets/json/rammerhead.json")
			.then((res) => res.json())
			.then((proxies) => {
				proxies.forEach((proxy) => {
					const proxyEl = document.createElement("option");
					proxyEl.textContent = "Link " + currentlink.toString();
					proxyEl.value = proxy;
					proxiesContainer.appendChild(proxyEl);
					currentlink++;
				});
			});
	}

	// Call the function to populate the select options
	populateproxyOptions();
});
