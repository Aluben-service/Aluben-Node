const panicurl = localStorage.getItem("panicurl") || "https://google.com";
const panickey = localStorage.getItem("panickey") || "`";

function Byblk() {
    window.open("./byeblock", "_self");
}
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

function discord() {
    window.open("https://discord.gg/Jeybsy2us4");
}

function games() {
    window.open("./games");
}
function proxylist() {
    window.open("./list");
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
