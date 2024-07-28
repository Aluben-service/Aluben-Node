// Function to fetch JSON and populate select options
function populateproxyOptions() {
    const proxiesContainer = document.querySelector('#rammy');

    fetch('assets/json/rammerhead.json')
        .then((res) => res.json())
        .then((proxies) => {
            proxies.forEach((proxy) => {
                const proxyEl = document.createElement('option');
                proxyEl.textContent = proxy;
                proxyEl.value = proxy;
                proxiesContainer.appendChild(proxyEl);
            });
        })
        .catch((error) => {
            console.error(error);
        });
}

// Call the function to populate the select options
populateproxyOptions();
