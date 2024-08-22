var a = localStorage.getItem("panicurl") || "https://google.com",
	b = localStorage.getItem("panickey") || "`",
	c = () => open("./byeblock.html", "_self"),
	d = () => open("https://discord.gg/sR94jHBU"),
	e = () => open("./games.html", "_self"),
	f = () => open("./list.html", "_self"),
	g = () => open("./settings.html", "_self"),
	A = () => open("./", "_self"),
	i = () => {
		const C = document.getElementById("enterPassword").value,
			_b = localStorage.getItem("passcode");
		C === _b &&
			(document.getElementById("enterPassword").style.display = "none");
	},
	j = async () => {
		const { value: _a } = await Swal.fire({
			title: "Enter a calculation",
			input: "text",
			inputLabel:
				"Calculation (only +, -, *, /, whatever else will be ignored):",
			inputPlaceholder: "e.g., 3 + 5 * (2 - 8)",
			showCancelButton: !0,
			confirmButtonText: "Calculate",
			cancelButtonText: "Cancel",
		});
		if (_a) {
			const D = _a.replace(/[^-()\d/*+.]/g, "");
			try {
				const _A = Function(`"use strict"; return (${D})`)();
				await Swal.fire({
					title: "Result",
					text: `The result is: ${_A}`,
					icon: "info",
					confirmButtonText: "OK",
				});
			} catch (E) {
				await Swal.fire({
					title: "Error",
					text: "There was an error with the calculation.",
					icon: "error",
					confirmButtonText: "OK",
				});
			}
		}
	},
	k = ~~Math.random() * 101,
	l = ~~Math.random() * 1000001;
if (l === 9933) {
	var _ = document.getElementById("7689");
	_ && (_.style.display = "block");
}
if (k === 43) {
	var h = "traf",
		o = document.getElementById("traf-say");
	o && (o.style.display = "block");
	console.log(h);
}
function p() {
	var aA = new Date();
	const h = aA.getHours();
	let m = aA.getMinutes();
	let s = aA.getSeconds();
	m < 10 && (m = `0${m}`);
	s < 10 && (s = `0${s}`);
	document.getElementById("txt").innerHTML = `${h}:${m}:${s}`;
	setTimeout(p, 1000);
}
function q() {
	var aB = prompt("Enter old passcode"),
		_B = localStorage.getItem("passcode");
	if (aB === _B) {
		var _c = prompt("Enter new passcode");
		localStorage.setItem("passcode", _c);
	} else alert("Incorrect passcode");
}
var r = Swal.mixin({
	toast: !0,
	position: "top-end",
	showConfirmButton: !1,
	timer: 1000,
	timerProgressBar: !0,
	didOpen: (aC) => {
		aC.onmouseenter = Swal.stopTimer;
		aC.onmouseleave = Swal.resumeTimer;
	},
});
function B() {
	Swal.fire({
		title: `${localStorage.getItem("passcode") ? "Enter" : "Set"} your passcode.`,
		input: "password",
		inputAttributes: { autocapitalize: "off" },
		showCancelButton: !1,
		confirmButtonText: "Ok!",
		showLoaderOnConfirm: !0,
		preConfirm: (aD) => {
			try {
				let aE = localStorage.getItem("passcode");
				if (aE && aE == aD)
					r.fire({
						icon: "success",
						title: "Signed in successfully",
					});
				else if (aE && aE !== aD)
					Swal.fire({
						title: "Failed!",
						text: "Wrong passcode!",
						icon: "error",
					}).then(() => B());
				else
					!localStorage.getItem("passcode") &&
						(localStorage.setItem("passcode", aD),
						Swal.fire({
							title: "Successful",
							text: "Passcode successfully set!",
							icon: "success",
						}));
			} catch (aF) {
				Swal.fire({
					title: "Failed!",
					text: `Error: ${aF}`,
					icon: "error",
				});
			}
		},
		allowOutsideClick: () => !1,
	});
}
"serviceWorker" in navigator &&
	navigator.serviceWorker
		.register("/sw.js")
		.then((aG) => console.log("Service worker started"))
		.catch((aH) => console.log("Service worker failed, error:", aH));
