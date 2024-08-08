/**
 * Credits to 3kh0!
 **/
document.addEventListener("DOMContentLoaded", (event) => {
	let scripts = 7;
	let currentscript = 1;

	function script(text) {
		console.log(
			"%cScript Injection",
			"color: cyan; font-weight: 600; background: black; padding: 0 5px; border-radius: 5px",
			`Injected script ${currentscript}/${scripts} (${text}) (Credits to 3kh0)`,
		);
		currentscript += 1;
	}

	function isMobileDevice() {
		return /Mobi|Android/i.test(navigator.userAgent);
	}

	const analytics = document.createElement("script");
	analytics.setAttribute("async", "");
	analytics.setAttribute("defer", "");
	analytics.setAttribute(
		"src",
		"https://scripts.simpleanalyticscdn.com/latest.js",
	);
	document.head.append(analytics);
	script("Simple Analytics");

	const plausible = document.createElement("script");
	plausible.setAttribute("defer", "");
	plausible.setAttribute("data-domain", location.origin);
	plausible.setAttribute("src", "https://plausible.io/js/script.js");
	document.head.append(plausible);
	script("Plausible Analytics");

	const main = document.createElement("script");
	main.setAttribute("src", "assets/js/script.js");
	document.head.append(main);
	script("Main script");

	const font = document.createElement("script");
	font.setAttribute("src", "assets/lib/fontawesome.js");
	font.setAttribute("crossorigin", "anonymous");
	document.head.append(font);
	script("Font awesome");

	const settingsstuff = document.createElement("script");
	settingsstuff.setAttribute("src", "assets/js/main.js");
	document.head.append(settingsstuff);
	script("Settings stuff");

	const fogNetworkABC = document.createElement("script");
	fogNetworkABC.setAttribute(
		"src",
		"https://cdn.jsdelivr.net/gh/FogNetwork/ABC/index.js",
	);
	document.head.append(fogNetworkABC);
	script("ABC(By FogNetwork)");

	const sweetAlerts = document.createElement("script");
	sweetAlerts.setAttribute("src", "assets/lib/sweetAlerts.js");
	document.head.append(sweetAlerts);
	script("SweetAlerts2");

	if (isMobileDevice()) {
		const dialog = document.createElement("dialog");
		dialog.setAttribute("open", "");
		dialog.setAttribute("id", "notice");
		dialog.innerHTML =
			"<p>This tool, Aluben is only meant for computers!</p>";
		document.body.append(dialog);
		const closedDialog = document.querySelector("#notice");
		closedDialog.showModal();
	}
});
