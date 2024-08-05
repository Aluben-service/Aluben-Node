const panicurl = localStorage.getItem("panicurl") || "https://google.com";
const panickey = localStorage.getItem("panickey") || "`";

// Navbar stuff
const Byblk = () => open("./byeblock.html", "_self");
const discord = () => open("https://discord.gg/sR94jHBU");
const games = () => open("./games.html", "_self");
const proxylist = () => open("./list.html", "_self");
const home = () => open("./", "_self");

// Password stuff
const validatePassword = () => document.getElementById("enterPassword").value === localStorage.getItem("passcode") ? document.getElementById("enterPassword").style.display = "none" : null;
const calculator = () => Function(`"use strict"; return (${prompt("Enter a calculation (only +, -, *, /):").replace(/[^-()\d/*+.]/g, '')})`)();



var randomNumber = Math.floor(Math.random() * 101); // Generates a number between 0 and 100

var randjk = Math.floor(Math.random() * 1000001);

if (Math.floor(Math.random() * 1000001) == 9933) {
    var yte = document.getElementById("7689");
    yte.style.display = "block";
}

// Check if the random number is equal to 43
if (randomNumber == 43) {
    var h = "traf";
    var poop = document.getElementById("traf-say");
    poop.style.display = "block";
    console.log(h);
}

function startTime() {
    const today = new Date();
    let h = today.getHours();
    let m = today.getMinutes();
    let s = today.getSeconds();
    if (m < 10) m = "0" + m;
    if (s < 10) s = "0" + s;
    document.getElementById("txt").innerHTML = h + ":" + m + ":" + s;
    setTimeout(startTime, 1000);
}

if (localStorage.getItem("passcode")) {
    $("#setPassword").hide();
    $("#enterPassword").show();
}

function hideCustomAlert() {
    localStorage.setItem("passcode", document.getElementById("passcode").value);
    $("#setPassword").hide();
}


function passcodechange() {
    var oldpasscode = prompt("enter old passcode");
    if (oldpasscode == passcode) {
        var newpasscode = prompt("enter new passcode");
        passcode = newpasscode;
    } else {
        alert("incorrect passocde");
    }
}
