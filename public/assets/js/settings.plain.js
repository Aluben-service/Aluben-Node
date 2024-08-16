var theme = localStorage.getItem("theme");
var cloak = localStorage.getItem("cloak");

function set_theme() {
	var themes = document.getElementById("themes");
	var selectedTheme = themes.options[themes.selectedIndex].value;
	if (selectedTheme == "custom_theme") {
		let style = prompt("1. Solid 2. Image");
		if (style == 1) {
			let back = prompt("Background color: ");
			let text = prompt("Text color: ");
			localStorage.setItem("theme", {
				style: 1,
				backcolor: back,
				textcolor: text,
			});
		} else if (style == 2) {
			let url = prompt("URL: ");
			localStorage.setItem("theme", { style: 2, image: url });
		}
	} else {
		localStorage.setItem("theme", selectedTheme);
	}
	location.reload();
}

document.addEventListener("DOMContentLoaded", function () {
	// Get the saved theme from localStorage
	var savedTheme = localStorage.getItem("theme");

	// If there's a saved theme, set the corresponding option as selected
	if (savedTheme) {
		var themesDropdown = document.getElementById("themes");
		for (var i = 0; i < themesDropdown.options.length; i++) {
			if (themesDropdown.options[i].value === savedTheme) {
				themesDropdown.selectedIndex = i;
				break;
			}
		}
	}
});
