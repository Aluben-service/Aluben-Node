const panicurl = localStorage.getItem("panicurl") || "https://google.com";
const panickey = localStorage.getItem("panickey") || "`";

// Navbar functions
const Byblk = () => open("./byeblock.html", "_self");
const discord = () => open("https://discord.gg/sR94jHBU");
const games = () => open("./games.html", "_self");
const proxylist = () => open("./list.html", "_self");
const settings = () => open("./settings.html", "_self");
const home = () => open("./", "_self");

// Password validation function
const validatePassword = () => {
	const enteredPassword = document.getElementById("enterPassword").value;
	const storedPassword = localStorage.getItem("passcode");
	if (enteredPassword === storedPassword) {
		document.getElementById("enterPassword").style.display = "none";
	}
};

// Calculator function
const calculator = () => {
	const calculation = prompt("Enter a calculation (only +, -, *, /):");
	const sanitizedCalculation = calculation.replace(/[^-()\d/*+.]/g, "");
	return Function(`"use strict"; return (${sanitizedCalculation})`)();
};

// Generate random numbers
const randomNumber = Math.floor(Math.random() * 101); // Generates a number between 0 and 100
const randjk = Math.floor(Math.random() * 1000001);

// Check if randjk equals 9933 and display element
if (randjk === 9933) {
	const yte = document.getElementById("7689");
	if (yte) {
		yte.style.display = "block";
	}
}

// Check if the random number is equal to 43
if (randomNumber === 43) {
	const h = "traf";
	const poop = document.getElementById("traf-say");
	if (poop) {
		poop.style.display = "block";
	}
	console.log(h);
}

// Function to start time and update every second
function startTime() {
	const today = new Date();
	const h = today.getHours();
	let m = today.getMinutes();
	let s = today.getSeconds();
	m = m < 10 ? `0${m}` : m;
	s = s < 10 ? `0${s}` : s;
	const timeStr = `${h}:${m}:${s}`;
	document.getElementById("txt").innerHTML = timeStr;
	setTimeout(startTime, 1000);
}

// Function to change passcode with validation
function passcodechange() {
	const oldpasscode = prompt("Enter old passcode");
	const storedPasscode = localStorage.getItem("passcode");
	if (oldpasscode === storedPasscode) {
		const newpasscode = prompt("Enter new passcode");
		localStorage.setItem("passcode", newpasscode);
	} else {
		alert("Incorrect passcode");
	}
}

document.addEventListener("DOMContentLoaded", function (event) {
       function passcodeask() {
	Swal.fire({
		title: `${localStorage.getItem("passcode") ? "Enter" : "Set"} your passcode.`,
		input: "text",
		inputAttributes: {
			autocapitalize: "off",
		},
		showCancelButton: true,
		confirmButtonText: "Look up",
		showLoaderOnConfirm: true,
		preConfirm: async (login) => {
			try {
				passcode = localStorage.getItem("passcode");
				if (passcode && passcode == login) {
					Swal.fire({
						title: "Successful!",
						text: "You have been allowed!",
						icon: "success",
					});
				} else if (passcode && passcode != login) {
					Swal.fire({
						title: "Failed!",
						text: "Wrong passcode!",
						icon: "error",
					});
					passcodeask();
				} else if (
					(localStorage.getItem("passcode") ? true : false) == false
				) {
					localStorage.setItem("passcode", login);
					Swal.fire({
						title: "Successful",
						text: "Passcode successfully set!",
						icon: "success",
					});
				}
			} catch (error) {
				Swal.fire({
					title: "Failed!",
					text: `Error: ${error}`,
					icon: "error",
				});
			}
		},
		allowOutsideClick: () => !Swal.isLoading(),
	});
}
passcodeask();
});
