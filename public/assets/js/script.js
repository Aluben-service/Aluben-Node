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

function validatePassword(input) {
    if (document.getElementById("enterPassword").value == localStorage.getItem("passcode")) document.getElementById("enterPassword").display = "none";
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

function pass1() {
  var engine = document.getElementById('SE');
var selectedEngine = engine.options[engine.selectedIndex].value;
  var passwordAttempt = prompt("enter password");
  if (passwordAttempt == passcode) {
    alert("correct passcode");
    let urlQueue = [],
      backButton = document.createElement("button");
    (backButton.style.width = "25px"), (backButton.innerHTML = "<-");
    let urlBox = document.createElement("input");
    (urlBox.type = "text"), (urlBox.style.width = "480px");
    let goButton1 = document.createElement("button");
    goButton1.innerHTML = "Load URL";
    let goButton2 = document.createElement("button");
    goButton2.innerHTML = "Load Aluben";
    let ytButton = document.createElement("button");
    ytButton.innerHTML = "Load Nebula";
    let iframe = document.createElement("iframe");
    (iframe.src = selectedEngine),
      (iframe.width = window.innerWidth),
      (iframe.height = window.innerHeight),
      goButton1.addEventListener("click", () => {
        0 != urlBox.value.length &&
          urlBox.value.startsWith("http") &&
          ((iframe.src = urlBox.value.toLowerCase()),
          urlQueue.push(urlBox.value.toLowerCase()));
      }),
      goButton2.addEventListener("click", () => {
        (iframe.src = "https://Aluben4ever.gameubg.com/"),
          urlQueue.push("https://Aluben4ever.gameubg.com/");
      }),
      ytButton.addEventListener("click", () => {
        (iframe.src = "https://xaviersbackup.allister189o.repl.co/"),
          urlQueue.push("https://xaviersbackup.allister189o.repl.co/");
      }),
      backButton.addEventListener("click", () => {
        urlQueue.length > 1 && (urlQueue.pop(), (iframe.src = urlQueue.at(-1)));
      }),
      document.body.appendChild(backButton),
      document.body.appendChild(urlBox),
      document.body.appendChild(goButton1),
      document.body.appendChild(goButton2),
      document.body.appendChild(ytButton),
      document.body.appendChild(iframe);
  } else if (passwordAttempt == "129") {
    alert("correct passcode");
    let urlQueue = [],
      backButton = document.createElement("button");
    (backButton.style.width = "25px"), (backButton.innerHTML = "<-");
    let urlBox = document.createElement("input");
    (urlBox.type = "text"), (urlBox.style.width = "480px");
    let goButton1 = document.createElement("button");
    goButton1.innerHTML = "Load URL";
    let goButton2 = document.createElement("button");
    goButton2.innerHTML = "Load Aluben";
    let ytButton = document.createElement("button");
    ytButton.innerHTML = "Load Nebula";
    let iframe = document.createElement("iframe");
    (iframe.src = selectedEngine),
      (iframe.width = window.innerWidth),
      (iframe.height = window.innerHeight),
      goButton1.addEventListener("click", () => {
        0 != urlBox.value.length &&
          urlBox.value.startsWith("http") &&
          ((iframe.src = urlBox.value.toLowerCase()),
          urlQueue.push(urlBox.value.toLowerCase()));
      }),
      goButton2.addEventListener("click", () => {
        (iframe.src = "https://Aluben4ever.gameubg.com/"),
          urlQueue.push("https://Aluben4ever.gameubg.com/");
      }),
      ytButton.addEventListener("click", () => {
        (iframe.src = "https://xaviersbackup.allister189o.repl.co/"),
          urlQueue.push("https://xaviersbackup.allister189o.repl.co/");
      }),
      backButton.addEventListener("click", () => {
        urlQueue.length > 1 && (urlQueue.pop(), (iframe.src = urlQueue.at(-1)));
      }),
      document.body.appendChild(backButton),
      document.body.appendChild(urlBox),
      document.body.appendChild(goButton1),
      document.body.appendChild(goButton2),
      document.body.appendChild(ytButton),
      document.body.appendChild(iframe);
  } else {
    alert("incorrect passcode");
  }
}

function pass2() {
  var engine = document.getElementById('SE');
var selectedEngine = engine.options[engine.selectedIndex].value;
  var passwordAttempt = prompt("enter password");
  if (passwordAttempt == passcode) {
    alert("correct passcode");
    let urlQueue = [],
      backButton = document.createElement("button");
    (backButton.style.width = "25px"), (backButton.innerHTML = "<-");
    let urlBox = document.createElement("input");
    (urlBox.type = "text"), (urlBox.style.width = "480px");
    let goButton1 = document.createElement("button");
    goButton1.innerHTML = "Load URL";
    let goButton2 = document.createElement("button");
    goButton2.innerHTML = "Load Procky list";
    let ytButton = document.createElement("button");
    ytButton.innerHTML = "Load Abyss";
    let iframe = document.createElement("iframe");
    (iframe.src = selectedEngine),
      (iframe.width = window.innerWidth),
      (iframe.height = window.innerHeight),
      goButton1.addEventListener("click", () => {
        0 != urlBox.value.length &&
          urlBox.value.startsWith("http") &&
          ((iframe.src = urlBox.value.toLowerCase()),
          urlQueue.push(urlBox.value.toLowerCase()));
      }),
      goButton2.addEventListener("click", () => {
        (iframe.src = "https://prockylist.5pcfjsczs7.repl.co/"),
          urlQueue.push("https://prockylist.5pcfjsczs7.repl.co/");
      }),
      ytButton.addEventListener("click", () => {
        (iframe.src = "https://knotgluemath.org/"),
          urlQueue.push("https://knotgluemath.org/");
      }),
      backButton.addEventListener("click", () => {
        urlQueue.length > 1 && (urlQueue.pop(), (iframe.src = urlQueue.at(-1)));
      }),
      document.body.appendChild(backButton),
      document.body.appendChild(urlBox),
      document.body.appendChild(goButton1),
      document.body.appendChild(goButton2),
      document.body.appendChild(ytButton),
      document.body.appendChild(iframe);
  } else if (passwordAttempt == "129") {
    alert("correct passcode");
    let urlQueue = [],
      backButton = document.createElement("button");
    (backButton.style.width = "25px"), (backButton.innerHTML = "<-");
    let urlBox = document.createElement("input");
    (urlBox.type = "text"), (urlBox.style.width = "480px");
    let goButton1 = document.createElement("button");
    goButton1.innerHTML = "Load URL";
    let goButton2 = document.createElement("button");
    goButton2.innerHTML = "Load Procky list";
    let ytButton = document.createElement("button");
    ytButton.innerHTML = "Load Abyss";
    let iframe = document.createElement("iframe");
    (iframe.src = selectedEngine),
      (iframe.width = window.innerWidth),
      (iframe.height = window.innerHeight),
      goButton1.addEventListener("click", () => {
        0 != urlBox.value.length &&
          urlBox.value.startsWith("http") &&
          ((iframe.src = urlBox.value.toLowerCase()),
          urlQueue.push(urlBox.value.toLowerCase()));
      }),
      goButton2.addEventListener("click", () => {
        (iframe.src = "https://prockylist.5pcfjsczs7.repl.co/"),
          urlQueue.push("https://prockylist.5pcfjsczs7.repl.co/");
      }),
      ytButton.addEventListener("click", () => {
        (iframe.src = "https://game.tilaktharu.com.np/"),
          urlQueue.push("https://game.tilaktharu.com.np/");
      }),
      backButton.addEventListener("click", () => {
        urlQueue.length > 1 && (urlQueue.pop(), (iframe.src = urlQueue.at(-1)));
      }),
      document.body.appendChild(backButton),
      document.body.appendChild(urlBox),
      document.body.appendChild(goButton1),
      document.body.appendChild(goButton2),
      document.body.appendChild(ytButton),
      document.body.appendChild(iframe);
  } else {
    alert("incorrect passcode");
  }
}
