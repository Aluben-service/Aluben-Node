/**
 * Credits to 3kh0!
 **/
//document.addEventListener("DOMContentLoaded", (event) => {
try {
let scripts = 5;
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
//analytics.setAttribute("async", "");
//analytics.setAttribute("defer", "");
analytics.setAttribute("src", "assets/lib/analytics.js");
document.head.append(analytics);
script("Simple Analytics");

const main = document.createElement("script");
main.setAttribute("src", "assets/js/script.js");
//      main.setAttribute("onload", "passcodeask();");
//main.setAttribute("async", "");
//main.setAttribute("defer", "");
document.head.append(main);
script("Main script");

const font = document.createElement("script");
font.setAttribute("src", "assets/lib/fontawesome.js");
font.setAttribute("crossorigin", "anonymous");
//font.setAttribute("async", "");
//font.setAttribute("defer", "");
document.head.append(font);
script("Font awesome");

const settingsstuff = document.createElement("script");
settingsstuff.setAttribute("src", "assets/js/main.js");
//settings.setAttribute("async", "");
//settings.setAttribute("defer", "");
document.head.append(settingsstuff);
script("Settings stuff");

const fogNetworkABC = document.createElement("script");
fogNetworkABC.setAttribute("src", "assets/lib/ABC.js");
//fogNetworkABC.setAttribute("async", "");
//fogNetworkABC.setAttribute("defer", "");
document.head.append(fogNetworkABC);
script("ABC(By FogNetwork)");

const sweetAlerts = document.createElement("script");
sweetAlerts.setAttribute("src", "assets/lib/sweetAlerts.js");
sweetAlerts.setAttribute("onload", "passcodeask();");
//sweetAlerts.setAttribute("async", "");
//sweetAlerts.setAttribute("defer", "");
document.head.append(sweetAlerts);
script("SweetAlerts2");

if (isMobileDevice()) {
	const dialog = document.createElement("dialog");
	dialog.setAttribute("open", "");
	dialog.setAttribute("id", "notice");
	dialog.innerHTML = "<p>This tool, Aluben is only meant for computers!</p>";
	document.body.append(dialog);
	const closedDialog = document.querySelector("#notice");
	closedDialog.showModal();
}
//});
}catch(e){
     console.error("Error: " + e);
}
