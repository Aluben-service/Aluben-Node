document.addEventListener("DOMContentLoaded", function (a) {
	var b = 1;
	function c() {
		var A = document.getElementById("rammy");
		fetch("assets/json/rammerhead.json")
			.then((res) => res.json())
			.then((proxies) => {
				for (const proxy of proxies) {
					const proxyEl = document.createElement("option");
					proxyEl.textContent = "Link " + b.toString();
					proxyEl.value = proxy;
					A.appendChild(proxyEl);
					b++;
				}
			});
	}
	c();
});
