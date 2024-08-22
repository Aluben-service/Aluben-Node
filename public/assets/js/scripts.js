try {
	let e = 5,
		t = 1;
	function s(s) {
		console.log(
			"%cScript Injection",
			"color: cyan; font-weight: 600; background: black; padding: 0 5px; border-radius: 5px",
			`Injected script ${t}/${e} (${s}) (Credits to 3kh0)`,
		),
			(t += 1);
	}
	function r() {
		return /Mobi|Android/i.test(navigator.userAgent);
	}
	let i = document.createElement("script");
	i.setAttribute("src", "assets/lib/analytics.js"),
		document.head.append(i),
		s("Simple Analytics");
	let n = document.createElement("script");
	n.setAttribute("src", "assets/js/script.js"),
		document.head.append(n),
		s("Main script");
	let a = document.createElement("script");
	a.setAttribute("src", "assets/lib/fontawesome.js"),
		a.setAttribute("crossorigin", "anonymous"),
		document.head.append(a),
		s("Font awesome");
	let c = document.createElement("script");
	c.setAttribute("src", "assets/js/main.js"),
		document.head.append(c),
		s("Settings stuff");
	let o = document.createElement("script");
	o.setAttribute("src", "assets/lib/ABC.js"),
		document.head.append(o),
		s("ABC(By FogNetwork)");
	let l = document.createElement("script");
	if (
		(l.setAttribute("src", "assets/lib/sweetAlerts.js"),
		l.setAttribute("onload", "passcodeask();"),
		document.head.append(l),
		s("SweetAlerts2"),
		r())
	) {
		let p = document.createElement("dialog");
		p.setAttribute("open", ""),
			p.setAttribute("id", "notice"),
			(p.innerHTML =
				"<p>This tool, Aluben is only meant for computers!</p>"),
			document.body.append(p);
		let d = document.querySelector("#notice");
		d.showModal();
	}
} catch (u) {
	console.error("Error: " + u);
}
