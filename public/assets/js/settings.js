var theme = localStorage.getItem("theme");

function set_theme() {
    var themes = document.getElementById("themes");
    var selectedTheme = themes.options[themes.selectedIndex].value;
    localStorage.setItem("theme", selectedTheme);
}

switch (theme) {
    case "N/A":
        break;
    case null:
        break;
    case "Dark":
        document.body.style.backgroundColor = "#000000";
        document.body.style.color = "#ffffff";
        document.body.style.backgroundImage = "url()";
        break;
    case "Light":
        document.body.style.color = "#000000";
        document.body.style.backgroundColor = "#ffffff";
        document.body.style.backgroundImage = "url()";
        break;
    case "Twilight":
        document.body.style.color = "#c658ca";
        document.body.style.backgroundColor = "#26233a";
        document.body.style.backgroundImage = "url()";
        break;
    case "Ocean":
        document.body.style.color = "#00ffff";
        document.body.style.backgroundColor = "#00008B";
        document.body.style.backgroundImage = "url()";
        break;
    case "McDonald's":
        document.body.style.color = "#e1ff00";
        document.body.style.backgroundColor = "#ff2600";
        document.body.style.backgroundImage = "url()";
        break;
    case "UnderGround":
        document.body.style.color = "#b0afb1";
        document.body.style.backgroundColor = "#673b00";
        document.body.style.backgroundImage = "url()";
        break;
    case "SunnyDay":
        document.body.style.color = "#f0ff85";
        document.body.style.backgroundColor = "#93e8ff";
        document.body.style.backgroundImage = "url()";
        break;
    case "Grassland":
        document.body.style.color = "#f45faf";
        document.body.style.backgroundImage = "url(assets/images/gashopper.jpg)";
        $("#grass").show();
        break;
    case "StormyDay":
        document.body.style.color = "#b0afb1";
        document.body.style.backgroundImage = "url(assets/images/StormyDay.gif)";
        break;
    case "custom":
        var theme = JSON.parse(localStorage.getItem("customTheme"))
        document.body.style.backgroundColor = theme.backcolor;
        document.body.style.color = theme.textcolor;
        break;
}
