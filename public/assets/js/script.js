const panicurl = localStorage.getItem("panicurl") || "https://google.com";
const panickey = localStorage.getItem("panickey") || "`";

// Navbar functions
const Byblk = () => open("./byeblock.html", "_self");
const discord = () => open("https://discord.gg/sR94jHBU");
const games = () => open("./games.html", "_self");
const proxylist = () => open("./list.html", "_self");

// Password stuff
const validatePassword = (input) => if (document.getElementById("enterPassword").value == localStorage.getItem("passcode")) document.getElementById("enterPassword").display = "none";

function calculator() {
    expr = prompt("Formula eg 34 * 32 \nto do multiplication type *\nto do exponents type **\n to divide type /\n to do Subtraction type -\n to do addition type +\n\n");
    if (expr != null) {
        with (Math) {
            evl = parseFloat(eval(expr));
        }
        if (isNaN(evl)) {
            alert("Invalid Format.");
        } else {
            alert(evl);
        }
    } else {
        void null;
    }
}


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

window.addEventListener("keydown", function (event) {
    console.log("Typed key: " + event.key)
    if (event.key == panickey) window.parent.window.location.replace(panicurl);
});

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
