document.addEventListener("DOMContentLoaded", function (A) {
	var _ = document.getElementById("favicon"),
		c = document.getElementById("title"),
		d = localStorage.getItem("cloak");
	if (d)
		switch (d) {
			case "Google":
				_.setAttribute(
					"href",
					"https://raw.githack.com/Aluben-service/Aluben_icons/main/google.png",
				);
				c.textContent = "Google";
				localStorage.setItem("name", "Google");
				localStorage.setItem(
					"icon",
					"https://raw.githack.com/Aluben-service/Aluben_icons/main/google.png",
				);
			case "Drive":
				_.setAttribute(
					"href",
					"https://raw.githack.com/Aluben-service/Aluben_icons/main/drive.png",
				);
				c.textContent = "My Drive - Google Drive";
				localStorage.setItem("name", "My Drive - Google Drive");
				localStorage.setItem(
					"icon",
					"https://raw.githack.com/Aluben-service/Aluben_icons/main/drive.png",
				);
			case "Classroom":
				_.setAttribute(
					"href",
					"https://raw.githack.com/Aluben-service/Aluben_icons/main/classroom.png",
				);
				c.textContent = "Classes";
				localStorage.setItem("name", "Classes");
				localStorage.setItem(
					"icon",
					"https://raw.githack.com/Aluben-service/Aluben_icons/main/classroom.png",
				);
			case "Schoology":
				_.setAttribute(
					"href",
					"https://raw.githack.com/Aluben-service/Aluben_icons/main/schoology.png",
				);
				c.textContent = "Home | Schoology";
				localStorage.setItem("name", "Home | Schoology");
				localStorage.setItem(
					"icon",
					"https://raw.githack.com/Aluben-service/Aluben_icons/main/schoology.png",
				);
			case "Gmail":
				_.setAttribute(
					"href",
					"https://raw.githack.com/Aluben-service/Aluben_icons/main/gmail.png",
				);
				c.textContent = "Gmail";
				localStorage.setItem("name", "Gmail");
				localStorage.setItem(
					"icon",
					"https://raw.githack.com/Aluben-service/Aluben_icons/main/gmail.png",
				);
			case "Clever":
				_.setAttribute(
					"href",
					"https://raw.githack.com/Aluben-service/Aluben_icons/main/clever.png",
				);
				c.textContent = "Clever | Portal";
				localStorage.setItem("name", "Clever | Portal");
				localStorage.setItem(
					"icon",
					"https://raw.githack.com/Aluben-service/Aluben_icons/main/clever.png",
				);
			case "Khan":
				_.setAttribute(
					"href",
					"https://raw.githack.com/Aluben-service/Aluben_icons/main/khan.png",
				);
				c.textContent = "Dashboard | Khan Academy";
				localStorage.setItem("name", "Dashboard | Khan Academy");
				localStorage.setItem(
					"icon",
					"https://raw.githack.com/Aluben-service/Aluben_icons/main/khan.png",
				);
				break;
			default:
				break;
		}
	switch (B) {
		case "N/A":
			break;
		case null:
			break;
		case "Dark":
			document.body.style.backgroundColor = "#000000";
			document.body.style.color = "#ffffff";
			document.body.style.backgroundImage = "none";
			break;
		case "Light":
			document.body.style.color = "#000000";
			document.body.style.backgroundColor = "#ffffff";
			document.body.style.backgroundImage = "none";
			break;
		case "Twilight":
			document.body.style.color = "#c658ca";
			document.body.style.backgroundColor = "#26233a";
			document.body.style.backgroundImage = "none";
			break;
		case "Ocean":
			document.body.style.color = "#00ffff";
			document.body.style.backgroundColor = "#00008B";
			document.body.style.backgroundImage = "none";
			break;
		case "McDonald's":
			document.body.style.color = "#e1ff00";
			document.body.style.backgroundColor = "#ff2600";
			document.body.style.backgroundImage = "none";
			break;
		case "UnderGround":
			document.body.style.color = "#b0afb1";
			document.body.style.backgroundColor = "#673b00";
			document.body.style.backgroundImage = "none";
			break;
		case "SunnyDay":
			document.body.style.color = "#f0ff85";
			document.body.style.backgroundColor = "#93e8ff";
			document.body.style.backgroundImage = "none";
			break;
		case "Grassland":
			document.body.style.color = "#f45faf";
			document.body.style.backgroundImage =
				"url(assets/images/gashopper.jpg)";
			$("#grass").show();
			break;
		case "StormyDay":
			document.body.style.color = "#b0afb1";
			document.body.style.backgroundImage =
				"url(assets/images/StormyDay.gif)";
			break;
		case "custom":
			var B = JSON.parse(localStorage.getItem("customTheme"));
			if (B.style == 1) {
				document.body.style.backgroundColor = B.backcolor;
				document.body.style.color = B.textcolor;
				break;
			} else
				B.style == 2 &&
					(document.body.style.backgroundImage = `url(${B.image})`);
	}
});
window.addEventListener("keydown", function (C) {
	console.log("Typed key: " + C.key);
	C.key == panickey && window.parent.window.location.replace(panicurl);
});
function a() {
	if (localStorage.getItem("clickoff_cloaking") === "true")
		if (document.hidden) {
			document.title = "Google";
			var _a = document.querySelector("link[rel*='icon']").href;
			document.querySelector("link[rel*='icon']").href =
				"https://raw.githubusercontent.com/whitespider-dev/whitespider/Main/res/google.ico";
		} else {
			document.title = "Aluben";
			document.getElementById("favicon").href = _a;
		}
}
document.addEventListener("visibilitychange", a);
document.onkeydown = (e) => {
	if (e.ctrlKey && !e.altKey && !e.metaKey && !e.shiftKey)
		switch (e.key) {
			default:
				break;
		}
};
async function b() {
	var D = await fetch("assets/json/say.json");
	var _b = await D.json();
	var _c = _b[~~Math.random() * _b.length];
	if (_c === "%GAMES_NUMBER%") {
		var _d = await fetch(location.origin + "assets/json/games.json").json();
		_c = `There are ${_d.length} games currently`;
	} else if (_c === "%SPLASH_NUMBER%") {
		var E = await fetch("assets/json/say.json").json();
		_c = `There are ${E.length} of these messages!`;
	}
	document.querySelector("#splash").innerHTML = _c;
}
b();
