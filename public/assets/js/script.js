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
const calculator = async () => {
	// Prompt the user for input using SweetAlert2
	const { value: calculation } = await Swal.fire({
		title: "Enter a calculation",
		input: "text",
		inputLabel:
			"Calculation (only +, -, *, /, whatever else will be ignored):",
		inputPlaceholder: "e.g., 3 + 5 * (2 - 8)",
		showCancelButton: true,
		confirmButtonText: "Calculate",
		cancelButtonText: "Cancel",
	});

	// Check if user pressed "Cancel" or entered nothing
	if (calculation) {
		// Sanitize the input
		const sanitizedCalculation = calculation.replace(/[^-()\d/*+.]/g, "");

		// Perform the calculation
		try {
			const result = Function(
				`"use strict"; return (${sanitizedCalculation})`,
			)();
			// Show the result using SweetAlert2
			await Swal.fire({
				title: "Result",
				text: `The result is: ${result}`,
				icon: "info",
				confirmButtonText: "OK",
			});
		} catch (error) {
			// Handle any errors
			await Swal.fire({
				title: "Error",
				text: "There was an error with the calculation.",
				icon: "error",
				confirmButtonText: "OK",
			});
		}
	}
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

function passcodeask() {
	Swal.fire({
		title: `${localStorage.getItem("passcode") ? "Enter" : "Set"} your passcode.`,
		input: "password", // Change input type to password
		inputAttributes: {
			autocapitalize: "off",
		},
		showCancelButton: false,
		confirmButtonText: "Ok!",
		showLoaderOnConfirm: true,
		preConfirm: async (login) => {
			try {
				let passcode = localStorage.getItem("passcode");
				if (passcode && passcode !== login) {
					Swal.fire({
						title: "Failed!",
						text: "Wrong passcode!",
						icon: "error",
					}).then(() => {
						passcodeask(); // Re-prompt the user
					});
				} else if (!localStorage.getItem("passcode")) {
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
		allowOutsideClick: () => false,
	});
}

if ("serviceWorker" in navigator) {
	navigator.serviceWorker
		.register("/sw.js")
		.then(function (registration) {
			console.log("Service worker started");
		})
		.catch(function (error) {
			console.log("Service worker failed, error:", error);
		});
}
