"use strict";
(() => {
	var zs = Object.create;
	var it = Object.defineProperty;
	var qs = Object.getOwnPropertyDescriptor;
	var Gs = Object.getOwnPropertyNames;
	var Ks = Object.getPrototypeOf,
		Qs = Object.prototype.hasOwnProperty;
	var Ys = (e, t, i) =>
		t in e
			? it(e, t, {
					enumerable: !0,
					configurable: !0,
					writable: !0,
					value: i,
				})
			: (e[t] = i);
	var zi = ((e) =>
		typeof require < "u"
			? require
			: typeof Proxy < "u"
				? new Proxy(e, {
						get: (t, i) => (typeof require < "u" ? require : t)[i],
					})
				: e)(function (e) {
		if (typeof require < "u") return require.apply(this, arguments);
		throw Error('Dynamic require of "' + e + '" is not supported');
	});
	var ie = (e, t) => () => (
			t || e((t = { exports: {} }).exports, t), t.exports
		),
		qi = (e, t) => {
			for (var i in t) it(e, i, { get: t[i], enumerable: !0 });
		},
		Js = (e, t, i, r) => {
			if ((t && typeof t == "object") || typeof t == "function")
				for (let s of Gs(t))
					!Qs.call(e, s) &&
						s !== i &&
						it(e, s, {
							get: () => t[s],
							enumerable: !(r = qs(t, s)) || r.enumerable,
						});
			return e;
		};
	var Ae = (e, t, i) => (
		(i = e != null ? zs(Ks(e)) : {}),
		Js(
			t || !e || !e.__esModule
				? it(i, "default", { value: e, enumerable: !0 })
				: i,
			e,
		)
	);
	var re = (e, t, i) => (Ys(e, typeof t != "symbol" ? t + "" : t, i), i);
	var Pt = ie((Hn, Ki) => {
		"use strict";
		function pe(e) {
			if (typeof e != "string")
				throw new TypeError(
					"Path must be a string. Received " + JSON.stringify(e),
				);
		}
		function Gi(e, t) {
			for (
				var i = "", r = 0, s = -1, a = 0, n, o = 0;
				o <= e.length;
				++o
			) {
				if (o < e.length) n = e.charCodeAt(o);
				else {
					if (n === 47) break;
					n = 47;
				}
				if (n === 47) {
					if (!(s === o - 1 || a === 1))
						if (s !== o - 1 && a === 2) {
							if (
								i.length < 2 ||
								r !== 2 ||
								i.charCodeAt(i.length - 1) !== 46 ||
								i.charCodeAt(i.length - 2) !== 46
							) {
								if (i.length > 2) {
									var u = i.lastIndexOf("/");
									if (u !== i.length - 1) {
										u === -1
											? ((i = ""), (r = 0))
											: ((i = i.slice(0, u)),
												(r =
													i.length -
													1 -
													i.lastIndexOf("/"))),
											(s = o),
											(a = 0);
										continue;
									}
								} else if (i.length === 2 || i.length === 1) {
									(i = ""), (r = 0), (s = o), (a = 0);
									continue;
								}
							}
							t &&
								(i.length > 0 ? (i += "/..") : (i = ".."),
								(r = 2));
						} else
							i.length > 0
								? (i += "/" + e.slice(s + 1, o))
								: (i = e.slice(s + 1, o)),
								(r = o - s - 1);
					(s = o), (a = 0);
				} else n === 46 && a !== -1 ? ++a : (a = -1);
			}
			return i;
		}
		function Zs(e, t) {
			var i = t.dir || t.root,
				r = t.base || (t.name || "") + (t.ext || "");
			return i ? (i === t.root ? i + r : i + e + r) : r;
		}
		var Ie = {
			resolve: function () {
				for (
					var t = "", i = !1, r, s = arguments.length - 1;
					s >= -1 && !i;
					s--
				) {
					var a;
					s >= 0
						? (a = arguments[s])
						: (r === void 0 && (r = process.cwd()), (a = r)),
						pe(a),
						a.length !== 0 &&
							((t = a + "/" + t), (i = a.charCodeAt(0) === 47));
				}
				return (
					(t = Gi(t, !i)),
					i ? (t.length > 0 ? "/" + t : "/") : t.length > 0 ? t : "."
				);
			},
			normalize: function (t) {
				if ((pe(t), t.length === 0)) return ".";
				var i = t.charCodeAt(0) === 47,
					r = t.charCodeAt(t.length - 1) === 47;
				return (
					(t = Gi(t, !i)),
					t.length === 0 && !i && (t = "."),
					t.length > 0 && r && (t += "/"),
					i ? "/" + t : t
				);
			},
			isAbsolute: function (t) {
				return pe(t), t.length > 0 && t.charCodeAt(0) === 47;
			},
			join: function () {
				if (arguments.length === 0) return ".";
				for (var t, i = 0; i < arguments.length; ++i) {
					var r = arguments[i];
					pe(r),
						r.length > 0 &&
							(t === void 0 ? (t = r) : (t += "/" + r));
				}
				return t === void 0 ? "." : Ie.normalize(t);
			},
			relative: function (t, i) {
				if (
					(pe(t),
					pe(i),
					t === i ||
						((t = Ie.resolve(t)), (i = Ie.resolve(i)), t === i))
				)
					return "";
				for (var r = 1; r < t.length && t.charCodeAt(r) === 47; ++r);
				for (
					var s = t.length, a = s - r, n = 1;
					n < i.length && i.charCodeAt(n) === 47;
					++n
				);
				for (
					var o = i.length,
						u = o - n,
						h = a < u ? a : u,
						f = -1,
						p = 0;
					p <= h;
					++p
				) {
					if (p === h) {
						if (u > h) {
							if (i.charCodeAt(n + p) === 47)
								return i.slice(n + p + 1);
							if (p === 0) return i.slice(n + p);
						} else
							a > h &&
								(t.charCodeAt(r + p) === 47
									? (f = p)
									: p === 0 && (f = 0));
						break;
					}
					var g = t.charCodeAt(r + p),
						y = i.charCodeAt(n + p);
					if (g !== y) break;
					g === 47 && (f = p);
				}
				var m = "";
				for (p = r + f + 1; p <= s; ++p)
					(p === s || t.charCodeAt(p) === 47) &&
						(m.length === 0 ? (m += "..") : (m += "/.."));
				return m.length > 0
					? m + i.slice(n + f)
					: ((n += f), i.charCodeAt(n) === 47 && ++n, i.slice(n));
			},
			_makeLong: function (t) {
				return t;
			},
			dirname: function (t) {
				if ((pe(t), t.length === 0)) return ".";
				for (
					var i = t.charCodeAt(0),
						r = i === 47,
						s = -1,
						a = !0,
						n = t.length - 1;
					n >= 1;
					--n
				)
					if (((i = t.charCodeAt(n)), i === 47)) {
						if (!a) {
							s = n;
							break;
						}
					} else a = !1;
				return s === -1
					? r
						? "/"
						: "."
					: r && s === 1
						? "//"
						: t.slice(0, s);
			},
			basename: function (t, i) {
				if (i !== void 0 && typeof i != "string")
					throw new TypeError('"ext" argument must be a string');
				pe(t);
				var r = 0,
					s = -1,
					a = !0,
					n;
				if (i !== void 0 && i.length > 0 && i.length <= t.length) {
					if (i.length === t.length && i === t) return "";
					var o = i.length - 1,
						u = -1;
					for (n = t.length - 1; n >= 0; --n) {
						var h = t.charCodeAt(n);
						if (h === 47) {
							if (!a) {
								r = n + 1;
								break;
							}
						} else
							u === -1 && ((a = !1), (u = n + 1)),
								o >= 0 &&
									(h === i.charCodeAt(o)
										? --o === -1 && (s = n)
										: ((o = -1), (s = u)));
					}
					return (
						r === s ? (s = u) : s === -1 && (s = t.length),
						t.slice(r, s)
					);
				} else {
					for (n = t.length - 1; n >= 0; --n)
						if (t.charCodeAt(n) === 47) {
							if (!a) {
								r = n + 1;
								break;
							}
						} else s === -1 && ((a = !1), (s = n + 1));
					return s === -1 ? "" : t.slice(r, s);
				}
			},
			extname: function (t) {
				pe(t);
				for (
					var i = -1, r = 0, s = -1, a = !0, n = 0, o = t.length - 1;
					o >= 0;
					--o
				) {
					var u = t.charCodeAt(o);
					if (u === 47) {
						if (!a) {
							r = o + 1;
							break;
						}
						continue;
					}
					s === -1 && ((a = !1), (s = o + 1)),
						u === 46
							? i === -1
								? (i = o)
								: n !== 1 && (n = 1)
							: i !== -1 && (n = -1);
				}
				return i === -1 ||
					s === -1 ||
					n === 0 ||
					(n === 1 && i === s - 1 && i === r + 1)
					? ""
					: t.slice(i, s);
			},
			format: function (t) {
				if (t === null || typeof t != "object")
					throw new TypeError(
						'The "pathObject" argument must be of type Object. Received type ' +
							typeof t,
					);
				return Zs("/", t);
			},
			parse: function (t) {
				pe(t);
				var i = { root: "", dir: "", base: "", ext: "", name: "" };
				if (t.length === 0) return i;
				var r = t.charCodeAt(0),
					s = r === 47,
					a;
				s ? ((i.root = "/"), (a = 1)) : (a = 0);
				for (
					var n = -1, o = 0, u = -1, h = !0, f = t.length - 1, p = 0;
					f >= a;
					--f
				) {
					if (((r = t.charCodeAt(f)), r === 47)) {
						if (!h) {
							o = f + 1;
							break;
						}
						continue;
					}
					u === -1 && ((h = !1), (u = f + 1)),
						r === 46
							? n === -1
								? (n = f)
								: p !== 1 && (p = 1)
							: n !== -1 && (p = -1);
				}
				return (
					n === -1 ||
					u === -1 ||
					p === 0 ||
					(p === 1 && n === u - 1 && n === o + 1)
						? u !== -1 &&
							(o === 0 && s
								? (i.base = i.name = t.slice(1, u))
								: (i.base = i.name = t.slice(o, u)))
						: (o === 0 && s
								? ((i.name = t.slice(1, n)),
									(i.base = t.slice(1, u)))
								: ((i.name = t.slice(o, n)),
									(i.base = t.slice(o, u))),
							(i.ext = t.slice(n, u))),
					o > 0 ? (i.dir = t.slice(0, o - 1)) : s && (i.dir = "/"),
					i
				);
			},
			sep: "/",
			delimiter: ":",
			win32: null,
			posix: null,
		};
		Ie.posix = Ie;
		Ki.exports = Ie;
	});
	var es = ie((ii) => {
		"use strict";
		ii.parse = mn;
		ii.serialize = gn;
		var dn = Object.prototype.toString,
			gt = /^[\u0009\u0020-\u007e\u0080-\u00ff]+$/;
		function mn(e, t) {
			if (typeof e != "string")
				throw new TypeError("argument str must be a string");
			for (
				var i = {}, r = t || {}, s = r.decode || xn, a = 0;
				a < e.length;

			) {
				var n = e.indexOf("=", a);
				if (n === -1) break;
				var o = e.indexOf(";", a);
				if (o === -1) o = e.length;
				else if (o < n) {
					a = e.lastIndexOf(";", n - 1) + 1;
					continue;
				}
				var u = e.slice(a, n).trim();
				if (i[u] === void 0) {
					var h = e.slice(n + 1, o).trim();
					h.charCodeAt(0) === 34 && (h = h.slice(1, -1)),
						(i[u] = bn(h, s));
				}
				a = o + 1;
			}
			return i;
		}
		function gn(e, t, i) {
			var r = i || {},
				s = r.encode || yn;
			if (typeof s != "function")
				throw new TypeError("option encode is invalid");
			if (!gt.test(e)) throw new TypeError("argument name is invalid");
			var a = s(t);
			if (a && !gt.test(a))
				throw new TypeError("argument val is invalid");
			var n = e + "=" + a;
			if (r.maxAge != null) {
				var o = r.maxAge - 0;
				if (isNaN(o) || !isFinite(o))
					throw new TypeError("option maxAge is invalid");
				n += "; Max-Age=" + Math.floor(o);
			}
			if (r.domain) {
				if (!gt.test(r.domain))
					throw new TypeError("option domain is invalid");
				n += "; Domain=" + r.domain;
			}
			if (r.path) {
				if (!gt.test(r.path))
					throw new TypeError("option path is invalid");
				n += "; Path=" + r.path;
			}
			if (r.expires) {
				var u = r.expires;
				if (!vn(u) || isNaN(u.valueOf()))
					throw new TypeError("option expires is invalid");
				n += "; Expires=" + u.toUTCString();
			}
			if (
				(r.httpOnly && (n += "; HttpOnly"),
				r.secure && (n += "; Secure"),
				r.priority)
			) {
				var h =
					typeof r.priority == "string"
						? r.priority.toLowerCase()
						: r.priority;
				switch (h) {
					case "low":
						n += "; Priority=Low";
						break;
					case "medium":
						n += "; Priority=Medium";
						break;
					case "high":
						n += "; Priority=High";
						break;
					default:
						throw new TypeError("option priority is invalid");
				}
			}
			if (r.sameSite) {
				var f =
					typeof r.sameSite == "string"
						? r.sameSite.toLowerCase()
						: r.sameSite;
				switch (f) {
					case !0:
						n += "; SameSite=Strict";
						break;
					case "lax":
						n += "; SameSite=Lax";
						break;
					case "strict":
						n += "; SameSite=Strict";
						break;
					case "none":
						n += "; SameSite=None";
						break;
					default:
						throw new TypeError("option sameSite is invalid");
				}
			}
			return n;
		}
		function xn(e) {
			return e.indexOf("%") !== -1 ? decodeURIComponent(e) : e;
		}
		function yn(e) {
			return encodeURIComponent(e);
		}
		function vn(e) {
			return dn.call(e) === "[object Date]" || e instanceof Date;
		}
		function bn(e, t) {
			try {
				return t(e);
			} catch {
				return e;
			}
		}
	});
	var is = ie((Jn, We) => {
		"use strict";
		var De = { decodeValues: !0, map: !1, silent: !1 };
		function ri(e) {
			return typeof e == "string" && !!e.trim();
		}
		function si(e, t) {
			var i = e.split(";").filter(ri),
				r = i.shift(),
				s = wn(r),
				a = s.name,
				n = s.value;
			t = t ? Object.assign({}, De, t) : De;
			try {
				n = t.decodeValues ? decodeURIComponent(n) : n;
			} catch (u) {
				console.error(
					"set-cookie-parser encountered an error while decoding a cookie with value '" +
						n +
						"'. Set options.decodeValues to false to disable this feature.",
					u,
				);
			}
			var o = { name: a, value: n };
			return (
				i.forEach(function (u) {
					var h = u.split("="),
						f = h.shift().trimLeft().toLowerCase(),
						p = h.join("=");
					f === "expires"
						? (o.expires = new Date(p))
						: f === "max-age"
							? (o.maxAge = parseInt(p, 10))
							: f === "secure"
								? (o.secure = !0)
								: f === "httponly"
									? (o.httpOnly = !0)
									: f === "samesite"
										? (o.sameSite = p)
										: (o[f] = p);
				}),
				o
			);
		}
		function wn(e) {
			var t = "",
				i = "",
				r = e.split("=");
			return (
				r.length > 1 ? ((t = r.shift()), (i = r.join("="))) : (i = e),
				{ name: t, value: i }
			);
		}
		function ts(e, t) {
			if (((t = t ? Object.assign({}, De, t) : De), !e))
				return t.map ? {} : [];
			if (e.headers)
				if (typeof e.headers.getSetCookie == "function")
					e = e.headers.getSetCookie();
				else if (e.headers["set-cookie"]) e = e.headers["set-cookie"];
				else {
					var i =
						e.headers[
							Object.keys(e.headers).find(function (s) {
								return s.toLowerCase() === "set-cookie";
							})
						];
					!i &&
						e.headers.cookie &&
						!t.silent &&
						console.warn(
							"Warning: set-cookie-parser appears to have been called on a request object. It is designed to parse Set-Cookie headers from responses, not Cookie headers from requests. Set the option {silent: true} to suppress this warning.",
						),
						(e = i);
				}
			if (
				(Array.isArray(e) || (e = [e]),
				(t = t ? Object.assign({}, De, t) : De),
				t.map)
			) {
				var r = {};
				return e.filter(ri).reduce(function (s, a) {
					var n = si(a, t);
					return (s[n.name] = n), s;
				}, r);
			} else
				return e.filter(ri).map(function (s) {
					return si(s, t);
				});
		}
		function _n(e) {
			if (Array.isArray(e)) return e;
			if (typeof e != "string") return [];
			var t = [],
				i = 0,
				r,
				s,
				a,
				n,
				o;
			function u() {
				for (; i < e.length && /\s/.test(e.charAt(i)); ) i += 1;
				return i < e.length;
			}
			function h() {
				return (s = e.charAt(i)), s !== "=" && s !== ";" && s !== ",";
			}
			for (; i < e.length; ) {
				for (r = i, o = !1; u(); )
					if (((s = e.charAt(i)), s === ",")) {
						for (a = i, i += 1, u(), n = i; i < e.length && h(); )
							i += 1;
						i < e.length && e.charAt(i) === "="
							? ((o = !0),
								(i = n),
								t.push(e.substring(r, a)),
								(r = i))
							: (i = a + 1);
					} else i += 1;
				(!o || i >= e.length) && t.push(e.substring(r, e.length));
			}
			return t;
		}
		We.exports = ts;
		We.exports.parse = ts;
		We.exports.parseString = si;
		We.exports.splitCookiesString = _n;
	});
	var Es = ie(() => {});
	var be = ie((bt, As) => {
		(function (e, t) {
			typeof bt == "object"
				? (As.exports = bt = t())
				: typeof define == "function" && define.amd
					? define([], t)
					: (e.CryptoJS = t());
		})(bt, function () {
			var e =
				e ||
				(function (t, i) {
					var r;
					if (
						(typeof window < "u" &&
							window.crypto &&
							(r = window.crypto),
						typeof self < "u" && self.crypto && (r = self.crypto),
						typeof globalThis < "u" &&
							globalThis.crypto &&
							(r = globalThis.crypto),
						!r &&
							typeof window < "u" &&
							window.msCrypto &&
							(r = window.msCrypto),
						!r &&
							typeof global < "u" &&
							global.crypto &&
							(r = global.crypto),
						!r && typeof zi == "function")
					)
						try {
							r = Es();
						} catch {}
					var s = function () {
							if (r) {
								if (typeof r.getRandomValues == "function")
									try {
										return r.getRandomValues(
											new Uint32Array(1),
										)[0];
									} catch {}
								if (typeof r.randomBytes == "function")
									try {
										return r.randomBytes(4).readInt32LE();
									} catch {}
							}
							throw new Error(
								"Native crypto module could not be used to get secure random number.",
							);
						},
						a =
							Object.create ||
							(function () {
								function l() {}
								return function (d) {
									var b;
									return (
										(l.prototype = d),
										(b = new l()),
										(l.prototype = null),
										b
									);
								};
							})(),
						n = {},
						o = (n.lib = {}),
						u = (o.Base = (function () {
							return {
								extend: function (l) {
									var d = a(this);
									return (
										l && d.mixIn(l),
										(!d.hasOwnProperty("init") ||
											this.init === d.init) &&
											(d.init = function () {
												d.$super.init.apply(
													this,
													arguments,
												);
											}),
										(d.init.prototype = d),
										(d.$super = this),
										d
									);
								},
								create: function () {
									var l = this.extend();
									return l.init.apply(l, arguments), l;
								},
								init: function () {},
								mixIn: function (l) {
									for (var d in l)
										l.hasOwnProperty(d) && (this[d] = l[d]);
									l.hasOwnProperty("toString") &&
										(this.toString = l.toString);
								},
								clone: function () {
									return this.init.prototype.extend(this);
								},
							};
						})()),
						h = (o.WordArray = u.extend({
							init: function (l, d) {
								(l = this.words = l || []),
									d != i
										? (this.sigBytes = d)
										: (this.sigBytes = l.length * 4);
							},
							toString: function (l) {
								return (l || p).stringify(this);
							},
							concat: function (l) {
								var d = this.words,
									b = l.words,
									v = this.sigBytes,
									L = l.sigBytes;
								if ((this.clamp(), v % 4))
									for (var D = 0; D < L; D++) {
										var O =
											(b[D >>> 2] >>>
												(24 - (D % 4) * 8)) &
											255;
										d[(v + D) >>> 2] |=
											O << (24 - ((v + D) % 4) * 8);
									}
								else
									for (var N = 0; N < L; N += 4)
										d[(v + N) >>> 2] = b[N >>> 2];
								return (this.sigBytes += L), this;
							},
							clamp: function () {
								var l = this.words,
									d = this.sigBytes;
								(l[d >>> 2] &=
									4294967295 << (32 - (d % 4) * 8)),
									(l.length = t.ceil(d / 4));
							},
							clone: function () {
								var l = u.clone.call(this);
								return (l.words = this.words.slice(0)), l;
							},
							random: function (l) {
								for (var d = [], b = 0; b < l; b += 4)
									d.push(s());
								return new h.init(d, l);
							},
						})),
						f = (n.enc = {}),
						p = (f.Hex = {
							stringify: function (l) {
								for (
									var d = l.words,
										b = l.sigBytes,
										v = [],
										L = 0;
									L < b;
									L++
								) {
									var D =
										(d[L >>> 2] >>> (24 - (L % 4) * 8)) &
										255;
									v.push((D >>> 4).toString(16)),
										v.push((D & 15).toString(16));
								}
								return v.join("");
							},
							parse: function (l) {
								for (
									var d = l.length, b = [], v = 0;
									v < d;
									v += 2
								)
									b[v >>> 3] |=
										parseInt(l.substr(v, 2), 16) <<
										(24 - (v % 8) * 4);
								return new h.init(b, d / 2);
							},
						}),
						g = (f.Latin1 = {
							stringify: function (l) {
								for (
									var d = l.words,
										b = l.sigBytes,
										v = [],
										L = 0;
									L < b;
									L++
								) {
									var D =
										(d[L >>> 2] >>> (24 - (L % 4) * 8)) &
										255;
									v.push(String.fromCharCode(D));
								}
								return v.join("");
							},
							parse: function (l) {
								for (
									var d = l.length, b = [], v = 0;
									v < d;
									v++
								)
									b[v >>> 2] |=
										(l.charCodeAt(v) & 255) <<
										(24 - (v % 4) * 8);
								return new h.init(b, d);
							},
						}),
						y = (f.Utf8 = {
							stringify: function (l) {
								try {
									return decodeURIComponent(
										escape(g.stringify(l)),
									);
								} catch {
									throw new Error("Malformed UTF-8 data");
								}
							},
							parse: function (l) {
								return g.parse(unescape(encodeURIComponent(l)));
							},
						}),
						m = (o.BufferedBlockAlgorithm = u.extend({
							reset: function () {
								(this._data = new h.init()),
									(this._nDataBytes = 0);
							},
							_append: function (l) {
								typeof l == "string" && (l = y.parse(l)),
									this._data.concat(l),
									(this._nDataBytes += l.sigBytes);
							},
							_process: function (l) {
								var d,
									b = this._data,
									v = b.words,
									L = b.sigBytes,
									D = this.blockSize,
									O = D * 4,
									N = L / O;
								l
									? (N = t.ceil(N))
									: (N = t.max(
											(N | 0) - this._minBufferSize,
											0,
										));
								var H = N * D,
									$ = t.min(H * 4, L);
								if (H) {
									for (var x = 0; x < H; x += D)
										this._doProcessBlock(v, x);
									(d = v.splice(0, H)), (b.sigBytes -= $);
								}
								return new h.init(d, $);
							},
							clone: function () {
								var l = u.clone.call(this);
								return (l._data = this._data.clone()), l;
							},
							_minBufferSize: 0,
						})),
						T = (o.Hasher = m.extend({
							cfg: u.extend(),
							init: function (l) {
								(this.cfg = this.cfg.extend(l)), this.reset();
							},
							reset: function () {
								m.reset.call(this), this._doReset();
							},
							update: function (l) {
								return this._append(l), this._process(), this;
							},
							finalize: function (l) {
								l && this._append(l);
								var d = this._doFinalize();
								return d;
							},
							blockSize: 512 / 32,
							_createHelper: function (l) {
								return function (d, b) {
									return new l.init(b).finalize(d);
								};
							},
							_createHmacHelper: function (l) {
								return function (d, b) {
									return new I.HMAC.init(l, b).finalize(d);
								};
							},
						})),
						I = (n.algo = {});
					return n;
				})(Math);
			return e;
		});
	});
	var Ps = ie((wt, Is) => {
		(function (e, t) {
			typeof wt == "object"
				? (Is.exports = wt = t(be()))
				: typeof define == "function" && define.amd
					? define(["./core"], t)
					: t(e.CryptoJS);
		})(wt, function (e) {
			return (
				(function () {
					var t = e,
						i = t.lib,
						r = i.WordArray,
						s = t.enc,
						a = (s.Base64 = {
							stringify: function (o) {
								var u = o.words,
									h = o.sigBytes,
									f = this._map;
								o.clamp();
								for (var p = [], g = 0; g < h; g += 3)
									for (
										var y =
												(u[g >>> 2] >>>
													(24 - (g % 4) * 8)) &
												255,
											m =
												(u[(g + 1) >>> 2] >>>
													(24 - ((g + 1) % 4) * 8)) &
												255,
											T =
												(u[(g + 2) >>> 2] >>>
													(24 - ((g + 2) % 4) * 8)) &
												255,
											I = (y << 16) | (m << 8) | T,
											l = 0;
										l < 4 && g + l * 0.75 < h;
										l++
									)
										p.push(
											f.charAt(
												(I >>> (6 * (3 - l))) & 63,
											),
										);
								var d = f.charAt(64);
								if (d) for (; p.length % 4; ) p.push(d);
								return p.join("");
							},
							parse: function (o) {
								var u = o.length,
									h = this._map,
									f = this._reverseMap;
								if (!f) {
									f = this._reverseMap = [];
									for (var p = 0; p < h.length; p++)
										f[h.charCodeAt(p)] = p;
								}
								var g = h.charAt(64);
								if (g) {
									var y = o.indexOf(g);
									y !== -1 && (u = y);
								}
								return n(o, u, f);
							},
							_map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
						});
					function n(o, u, h) {
						for (var f = [], p = 0, g = 0; g < u; g++)
							if (g % 4) {
								var y = h[o.charCodeAt(g - 1)] << ((g % 4) * 2),
									m =
										h[o.charCodeAt(g)] >>>
										(6 - (g % 4) * 2),
									T = y | m;
								(f[p >>> 2] |= T << (24 - (p % 4) * 8)), p++;
							}
						return r.create(f, p);
					}
				})(),
				e.enc.Base64
			);
		});
	});
	var Ns = ie((_t, Rs) => {
		(function (e, t) {
			typeof _t == "object"
				? (Rs.exports = _t = t(be()))
				: typeof define == "function" && define.amd
					? define(["./core"], t)
					: t(e.CryptoJS);
		})(_t, function (e) {
			return (
				(function (t) {
					var i = e,
						r = i.lib,
						s = r.WordArray,
						a = r.Hasher,
						n = i.algo,
						o = [];
					(function () {
						for (var y = 0; y < 64; y++)
							o[y] = (t.abs(t.sin(y + 1)) * 4294967296) | 0;
					})();
					var u = (n.MD5 = a.extend({
						_doReset: function () {
							this._hash = new s.init([
								1732584193, 4023233417, 2562383102, 271733878,
							]);
						},
						_doProcessBlock: function (y, m) {
							for (var T = 0; T < 16; T++) {
								var I = m + T,
									l = y[I];
								y[I] =
									(((l << 8) | (l >>> 24)) & 16711935) |
									(((l << 24) | (l >>> 8)) & 4278255360);
							}
							var d = this._hash.words,
								b = y[m + 0],
								v = y[m + 1],
								L = y[m + 2],
								D = y[m + 3],
								O = y[m + 4],
								N = y[m + 5],
								H = y[m + 6],
								$ = y[m + 7],
								x = y[m + 8],
								E = y[m + 9],
								P = y[m + 10],
								_ = y[m + 11],
								V = y[m + 12],
								j = y[m + 13],
								z = y[m + 14],
								J = y[m + 15],
								w = d[0],
								C = d[1],
								k = d[2],
								S = d[3];
							(w = h(w, C, k, S, b, 7, o[0])),
								(S = h(S, w, C, k, v, 12, o[1])),
								(k = h(k, S, w, C, L, 17, o[2])),
								(C = h(C, k, S, w, D, 22, o[3])),
								(w = h(w, C, k, S, O, 7, o[4])),
								(S = h(S, w, C, k, N, 12, o[5])),
								(k = h(k, S, w, C, H, 17, o[6])),
								(C = h(C, k, S, w, $, 22, o[7])),
								(w = h(w, C, k, S, x, 7, o[8])),
								(S = h(S, w, C, k, E, 12, o[9])),
								(k = h(k, S, w, C, P, 17, o[10])),
								(C = h(C, k, S, w, _, 22, o[11])),
								(w = h(w, C, k, S, V, 7, o[12])),
								(S = h(S, w, C, k, j, 12, o[13])),
								(k = h(k, S, w, C, z, 17, o[14])),
								(C = h(C, k, S, w, J, 22, o[15])),
								(w = f(w, C, k, S, v, 5, o[16])),
								(S = f(S, w, C, k, H, 9, o[17])),
								(k = f(k, S, w, C, _, 14, o[18])),
								(C = f(C, k, S, w, b, 20, o[19])),
								(w = f(w, C, k, S, N, 5, o[20])),
								(S = f(S, w, C, k, P, 9, o[21])),
								(k = f(k, S, w, C, J, 14, o[22])),
								(C = f(C, k, S, w, O, 20, o[23])),
								(w = f(w, C, k, S, E, 5, o[24])),
								(S = f(S, w, C, k, z, 9, o[25])),
								(k = f(k, S, w, C, D, 14, o[26])),
								(C = f(C, k, S, w, x, 20, o[27])),
								(w = f(w, C, k, S, j, 5, o[28])),
								(S = f(S, w, C, k, L, 9, o[29])),
								(k = f(k, S, w, C, $, 14, o[30])),
								(C = f(C, k, S, w, V, 20, o[31])),
								(w = p(w, C, k, S, N, 4, o[32])),
								(S = p(S, w, C, k, x, 11, o[33])),
								(k = p(k, S, w, C, _, 16, o[34])),
								(C = p(C, k, S, w, z, 23, o[35])),
								(w = p(w, C, k, S, v, 4, o[36])),
								(S = p(S, w, C, k, O, 11, o[37])),
								(k = p(k, S, w, C, $, 16, o[38])),
								(C = p(C, k, S, w, P, 23, o[39])),
								(w = p(w, C, k, S, j, 4, o[40])),
								(S = p(S, w, C, k, b, 11, o[41])),
								(k = p(k, S, w, C, D, 16, o[42])),
								(C = p(C, k, S, w, H, 23, o[43])),
								(w = p(w, C, k, S, E, 4, o[44])),
								(S = p(S, w, C, k, V, 11, o[45])),
								(k = p(k, S, w, C, J, 16, o[46])),
								(C = p(C, k, S, w, L, 23, o[47])),
								(w = g(w, C, k, S, b, 6, o[48])),
								(S = g(S, w, C, k, $, 10, o[49])),
								(k = g(k, S, w, C, z, 15, o[50])),
								(C = g(C, k, S, w, N, 21, o[51])),
								(w = g(w, C, k, S, V, 6, o[52])),
								(S = g(S, w, C, k, D, 10, o[53])),
								(k = g(k, S, w, C, P, 15, o[54])),
								(C = g(C, k, S, w, v, 21, o[55])),
								(w = g(w, C, k, S, x, 6, o[56])),
								(S = g(S, w, C, k, J, 10, o[57])),
								(k = g(k, S, w, C, H, 15, o[58])),
								(C = g(C, k, S, w, j, 21, o[59])),
								(w = g(w, C, k, S, O, 6, o[60])),
								(S = g(S, w, C, k, _, 10, o[61])),
								(k = g(k, S, w, C, L, 15, o[62])),
								(C = g(C, k, S, w, E, 21, o[63])),
								(d[0] = (d[0] + w) | 0),
								(d[1] = (d[1] + C) | 0),
								(d[2] = (d[2] + k) | 0),
								(d[3] = (d[3] + S) | 0);
						},
						_doFinalize: function () {
							var y = this._data,
								m = y.words,
								T = this._nDataBytes * 8,
								I = y.sigBytes * 8;
							m[I >>> 5] |= 128 << (24 - (I % 32));
							var l = t.floor(T / 4294967296),
								d = T;
							(m[(((I + 64) >>> 9) << 4) + 15] =
								(((l << 8) | (l >>> 24)) & 16711935) |
								(((l << 24) | (l >>> 8)) & 4278255360)),
								(m[(((I + 64) >>> 9) << 4) + 14] =
									(((d << 8) | (d >>> 24)) & 16711935) |
									(((d << 24) | (d >>> 8)) & 4278255360)),
								(y.sigBytes = (m.length + 1) * 4),
								this._process();
							for (
								var b = this._hash, v = b.words, L = 0;
								L < 4;
								L++
							) {
								var D = v[L];
								v[L] =
									(((D << 8) | (D >>> 24)) & 16711935) |
									(((D << 24) | (D >>> 8)) & 4278255360);
							}
							return b;
						},
						clone: function () {
							var y = a.clone.call(this);
							return (y._hash = this._hash.clone()), y;
						},
					}));
					function h(y, m, T, I, l, d, b) {
						var v = y + ((m & T) | (~m & I)) + l + b;
						return ((v << d) | (v >>> (32 - d))) + m;
					}
					function f(y, m, T, I, l, d, b) {
						var v = y + ((m & I) | (T & ~I)) + l + b;
						return ((v << d) | (v >>> (32 - d))) + m;
					}
					function p(y, m, T, I, l, d, b) {
						var v = y + (m ^ T ^ I) + l + b;
						return ((v << d) | (v >>> (32 - d))) + m;
					}
					function g(y, m, T, I, l, d, b) {
						var v = y + (T ^ (m | ~I)) + l + b;
						return ((v << d) | (v >>> (32 - d))) + m;
					}
					(i.MD5 = a._createHelper(u)),
						(i.HmacMD5 = a._createHmacHelper(u));
				})(Math),
				e.MD5
			);
		});
	});
	var Ds = ie((Ct, Ls) => {
		(function (e, t) {
			typeof Ct == "object"
				? (Ls.exports = Ct = t(be()))
				: typeof define == "function" && define.amd
					? define(["./core"], t)
					: t(e.CryptoJS);
		})(Ct, function (e) {
			return (
				(function () {
					var t = e,
						i = t.lib,
						r = i.WordArray,
						s = i.Hasher,
						a = t.algo,
						n = [],
						o = (a.SHA1 = s.extend({
							_doReset: function () {
								this._hash = new r.init([
									1732584193, 4023233417, 2562383102,
									271733878, 3285377520,
								]);
							},
							_doProcessBlock: function (u, h) {
								for (
									var f = this._hash.words,
										p = f[0],
										g = f[1],
										y = f[2],
										m = f[3],
										T = f[4],
										I = 0;
									I < 80;
									I++
								) {
									if (I < 16) n[I] = u[h + I] | 0;
									else {
										var l =
											n[I - 3] ^
											n[I - 8] ^
											n[I - 14] ^
											n[I - 16];
										n[I] = (l << 1) | (l >>> 31);
									}
									var d = ((p << 5) | (p >>> 27)) + T + n[I];
									I < 20
										? (d +=
												((g & y) | (~g & m)) +
												1518500249)
										: I < 40
											? (d += (g ^ y ^ m) + 1859775393)
											: I < 60
												? (d +=
														((g & y) |
															(g & m) |
															(y & m)) -
														1894007588)
												: (d +=
														(g ^ y ^ m) -
														899497514),
										(T = m),
										(m = y),
										(y = (g << 30) | (g >>> 2)),
										(g = p),
										(p = d);
								}
								(f[0] = (f[0] + p) | 0),
									(f[1] = (f[1] + g) | 0),
									(f[2] = (f[2] + y) | 0),
									(f[3] = (f[3] + m) | 0),
									(f[4] = (f[4] + T) | 0);
							},
							_doFinalize: function () {
								var u = this._data,
									h = u.words,
									f = this._nDataBytes * 8,
									p = u.sigBytes * 8;
								return (
									(h[p >>> 5] |= 128 << (24 - (p % 32))),
									(h[(((p + 64) >>> 9) << 4) + 14] =
										Math.floor(f / 4294967296)),
									(h[(((p + 64) >>> 9) << 4) + 15] = f),
									(u.sigBytes = h.length * 4),
									this._process(),
									this._hash
								);
							},
							clone: function () {
								var u = s.clone.call(this);
								return (u._hash = this._hash.clone()), u;
							},
						}));
					(t.SHA1 = s._createHelper(o)),
						(t.HmacSHA1 = s._createHmacHelper(o));
				})(),
				e.SHA1
			);
		});
	});
	var Bs = ie((kt, Ts) => {
		(function (e, t) {
			typeof kt == "object"
				? (Ts.exports = kt = t(be()))
				: typeof define == "function" && define.amd
					? define(["./core"], t)
					: t(e.CryptoJS);
		})(kt, function (e) {
			(function () {
				var t = e,
					i = t.lib,
					r = i.Base,
					s = t.enc,
					a = s.Utf8,
					n = t.algo,
					o = (n.HMAC = r.extend({
						init: function (u, h) {
							(u = this._hasher = new u.init()),
								typeof h == "string" && (h = a.parse(h));
							var f = u.blockSize,
								p = f * 4;
							h.sigBytes > p && (h = u.finalize(h)), h.clamp();
							for (
								var g = (this._oKey = h.clone()),
									y = (this._iKey = h.clone()),
									m = g.words,
									T = y.words,
									I = 0;
								I < f;
								I++
							)
								(m[I] ^= 1549556828), (T[I] ^= 909522486);
							(g.sigBytes = y.sigBytes = p), this.reset();
						},
						reset: function () {
							var u = this._hasher;
							u.reset(), u.update(this._iKey);
						},
						update: function (u) {
							return this._hasher.update(u), this;
						},
						finalize: function (u) {
							var h = this._hasher,
								f = h.finalize(u);
							h.reset();
							var p = h.finalize(this._oKey.clone().concat(f));
							return p;
						},
					}));
			})();
		});
	});
	var Hi = ie((St, Os) => {
		(function (e, t, i) {
			typeof St == "object"
				? (Os.exports = St = t(be(), Ds(), Bs()))
				: typeof define == "function" && define.amd
					? define(["./core", "./sha1", "./hmac"], t)
					: t(e.CryptoJS);
		})(St, function (e) {
			return (
				(function () {
					var t = e,
						i = t.lib,
						r = i.Base,
						s = i.WordArray,
						a = t.algo,
						n = a.MD5,
						o = (a.EvpKDF = r.extend({
							cfg: r.extend({
								keySize: 128 / 32,
								hasher: n,
								iterations: 1,
							}),
							init: function (u) {
								this.cfg = this.cfg.extend(u);
							},
							compute: function (u, h) {
								for (
									var f,
										p = this.cfg,
										g = p.hasher.create(),
										y = s.create(),
										m = y.words,
										T = p.keySize,
										I = p.iterations;
									m.length < T;

								) {
									f && g.update(f),
										(f = g.update(u).finalize(h)),
										g.reset();
									for (var l = 1; l < I; l++)
										(f = g.finalize(f)), g.reset();
									y.concat(f);
								}
								return (y.sigBytes = T * 4), y;
							},
						}));
					t.EvpKDF = function (u, h, f) {
						return o.create(f).compute(u, h);
					};
				})(),
				e.EvpKDF
			);
		});
	});
	var Ms = ie((Et, Vs) => {
		(function (e, t, i) {
			typeof Et == "object"
				? (Vs.exports = Et = t(be(), Hi()))
				: typeof define == "function" && define.amd
					? define(["./core", "./evpkdf"], t)
					: t(e.CryptoJS);
		})(Et, function (e) {
			e.lib.Cipher ||
				(function (t) {
					var i = e,
						r = i.lib,
						s = r.Base,
						a = r.WordArray,
						n = r.BufferedBlockAlgorithm,
						o = i.enc,
						u = o.Utf8,
						h = o.Base64,
						f = i.algo,
						p = f.EvpKDF,
						g = (r.Cipher = n.extend({
							cfg: s.extend(),
							createEncryptor: function (x, E) {
								return this.create(this._ENC_XFORM_MODE, x, E);
							},
							createDecryptor: function (x, E) {
								return this.create(this._DEC_XFORM_MODE, x, E);
							},
							init: function (x, E, P) {
								(this.cfg = this.cfg.extend(P)),
									(this._xformMode = x),
									(this._key = E),
									this.reset();
							},
							reset: function () {
								n.reset.call(this), this._doReset();
							},
							process: function (x) {
								return this._append(x), this._process();
							},
							finalize: function (x) {
								x && this._append(x);
								var E = this._doFinalize();
								return E;
							},
							keySize: 128 / 32,
							ivSize: 128 / 32,
							_ENC_XFORM_MODE: 1,
							_DEC_XFORM_MODE: 2,
							_createHelper: (function () {
								function x(E) {
									return typeof E == "string" ? $ : O;
								}
								return function (E) {
									return {
										encrypt: function (P, _, V) {
											return x(_).encrypt(E, P, _, V);
										},
										decrypt: function (P, _, V) {
											return x(_).decrypt(E, P, _, V);
										},
									};
								};
							})(),
						})),
						y = (r.StreamCipher = g.extend({
							_doFinalize: function () {
								var x = this._process(!0);
								return x;
							},
							blockSize: 1,
						})),
						m = (i.mode = {}),
						T = (r.BlockCipherMode = s.extend({
							createEncryptor: function (x, E) {
								return this.Encryptor.create(x, E);
							},
							createDecryptor: function (x, E) {
								return this.Decryptor.create(x, E);
							},
							init: function (x, E) {
								(this._cipher = x), (this._iv = E);
							},
						})),
						I = (m.CBC = (function () {
							var x = T.extend();
							(x.Encryptor = x.extend({
								processBlock: function (P, _) {
									var V = this._cipher,
										j = V.blockSize;
									E.call(this, P, _, j),
										V.encryptBlock(P, _),
										(this._prevBlock = P.slice(_, _ + j));
								},
							})),
								(x.Decryptor = x.extend({
									processBlock: function (P, _) {
										var V = this._cipher,
											j = V.blockSize,
											z = P.slice(_, _ + j);
										V.decryptBlock(P, _),
											E.call(this, P, _, j),
											(this._prevBlock = z);
									},
								}));
							function E(P, _, V) {
								var j,
									z = this._iv;
								z
									? ((j = z), (this._iv = t))
									: (j = this._prevBlock);
								for (var J = 0; J < V; J++) P[_ + J] ^= j[J];
							}
							return x;
						})()),
						l = (i.pad = {}),
						d = (l.Pkcs7 = {
							pad: function (x, E) {
								for (
									var P = E * 4,
										_ = P - (x.sigBytes % P),
										V =
											(_ << 24) |
											(_ << 16) |
											(_ << 8) |
											_,
										j = [],
										z = 0;
									z < _;
									z += 4
								)
									j.push(V);
								var J = a.create(j, _);
								x.concat(J);
							},
							unpad: function (x) {
								var E = x.words[(x.sigBytes - 1) >>> 2] & 255;
								x.sigBytes -= E;
							},
						}),
						b = (r.BlockCipher = g.extend({
							cfg: g.cfg.extend({ mode: I, padding: d }),
							reset: function () {
								var x;
								g.reset.call(this);
								var E = this.cfg,
									P = E.iv,
									_ = E.mode;
								this._xformMode == this._ENC_XFORM_MODE
									? (x = _.createEncryptor)
									: ((x = _.createDecryptor),
										(this._minBufferSize = 1)),
									this._mode && this._mode.__creator == x
										? this._mode.init(this, P && P.words)
										: ((this._mode = x.call(
												_,
												this,
												P && P.words,
											)),
											(this._mode.__creator = x));
							},
							_doProcessBlock: function (x, E) {
								this._mode.processBlock(x, E);
							},
							_doFinalize: function () {
								var x,
									E = this.cfg.padding;
								return (
									this._xformMode == this._ENC_XFORM_MODE
										? (E.pad(this._data, this.blockSize),
											(x = this._process(!0)))
										: ((x = this._process(!0)), E.unpad(x)),
									x
								);
							},
							blockSize: 128 / 32,
						})),
						v = (r.CipherParams = s.extend({
							init: function (x) {
								this.mixIn(x);
							},
							toString: function (x) {
								return (x || this.formatter).stringify(this);
							},
						})),
						L = (i.format = {}),
						D = (L.OpenSSL = {
							stringify: function (x) {
								var E,
									P = x.ciphertext,
									_ = x.salt;
								return (
									_
										? (E = a
												.create([
													1398893684, 1701076831,
												])
												.concat(_)
												.concat(P))
										: (E = P),
									E.toString(h)
								);
							},
							parse: function (x) {
								var E,
									P = h.parse(x),
									_ = P.words;
								return (
									_[0] == 1398893684 &&
										_[1] == 1701076831 &&
										((E = a.create(_.slice(2, 4))),
										_.splice(0, 4),
										(P.sigBytes -= 16)),
									v.create({ ciphertext: P, salt: E })
								);
							},
						}),
						O = (r.SerializableCipher = s.extend({
							cfg: s.extend({ format: D }),
							encrypt: function (x, E, P, _) {
								_ = this.cfg.extend(_);
								var V = x.createEncryptor(P, _),
									j = V.finalize(E),
									z = V.cfg;
								return v.create({
									ciphertext: j,
									key: P,
									iv: z.iv,
									algorithm: x,
									mode: z.mode,
									padding: z.padding,
									blockSize: x.blockSize,
									formatter: _.format,
								});
							},
							decrypt: function (x, E, P, _) {
								(_ = this.cfg.extend(_)),
									(E = this._parse(E, _.format));
								var V = x
									.createDecryptor(P, _)
									.finalize(E.ciphertext);
								return V;
							},
							_parse: function (x, E) {
								return typeof x == "string"
									? E.parse(x, this)
									: x;
							},
						})),
						N = (i.kdf = {}),
						H = (N.OpenSSL = {
							execute: function (x, E, P, _, V) {
								if ((_ || (_ = a.random(64 / 8)), V))
									var j = p
										.create({ keySize: E + P, hasher: V })
										.compute(x, _);
								else
									var j = p
										.create({ keySize: E + P })
										.compute(x, _);
								var z = a.create(j.words.slice(E), P * 4);
								return (
									(j.sigBytes = E * 4),
									v.create({ key: j, iv: z, salt: _ })
								);
							},
						}),
						$ = (r.PasswordBasedCipher = O.extend({
							cfg: O.cfg.extend({ kdf: H }),
							encrypt: function (x, E, P, _) {
								_ = this.cfg.extend(_);
								var V = _.kdf.execute(
									P,
									x.keySize,
									x.ivSize,
									_.salt,
									_.hasher,
								);
								_.iv = V.iv;
								var j = O.encrypt.call(this, x, E, V.key, _);
								return j.mixIn(V), j;
							},
							decrypt: function (x, E, P, _) {
								(_ = this.cfg.extend(_)),
									(E = this._parse(E, _.format));
								var V = _.kdf.execute(
									P,
									x.keySize,
									x.ivSize,
									E.salt,
									_.hasher,
								);
								_.iv = V.iv;
								var j = O.decrypt.call(this, x, E, V.key, _);
								return j;
							},
						}));
				})();
		});
	});
	var js = ie((At, Fs) => {
		(function (e, t, i) {
			typeof At == "object"
				? (Fs.exports = At = t(be(), Ps(), Ns(), Hi(), Ms()))
				: typeof define == "function" && define.amd
					? define(
							[
								"./core",
								"./enc-base64",
								"./md5",
								"./evpkdf",
								"./cipher-core",
							],
							t,
						)
					: t(e.CryptoJS);
		})(At, function (e) {
			return (
				(function () {
					var t = e,
						i = t.lib,
						r = i.BlockCipher,
						s = t.algo,
						a = [],
						n = [],
						o = [],
						u = [],
						h = [],
						f = [],
						p = [],
						g = [],
						y = [],
						m = [];
					(function () {
						for (var l = [], d = 0; d < 256; d++)
							d < 128 ? (l[d] = d << 1) : (l[d] = (d << 1) ^ 283);
						for (var b = 0, v = 0, d = 0; d < 256; d++) {
							var L =
								v ^ (v << 1) ^ (v << 2) ^ (v << 3) ^ (v << 4);
							(L = (L >>> 8) ^ (L & 255) ^ 99),
								(a[b] = L),
								(n[L] = b);
							var D = l[b],
								O = l[D],
								N = l[O],
								H = (l[L] * 257) ^ (L * 16843008);
							(o[b] = (H << 24) | (H >>> 8)),
								(u[b] = (H << 16) | (H >>> 16)),
								(h[b] = (H << 8) | (H >>> 24)),
								(f[b] = H);
							var H =
								(N * 16843009) ^
								(O * 65537) ^
								(D * 257) ^
								(b * 16843008);
							(p[L] = (H << 24) | (H >>> 8)),
								(g[L] = (H << 16) | (H >>> 16)),
								(y[L] = (H << 8) | (H >>> 24)),
								(m[L] = H),
								b
									? ((b = D ^ l[l[l[N ^ D]]]), (v ^= l[l[v]]))
									: (b = v = 1);
						}
					})();
					var T = [0, 1, 2, 4, 8, 16, 32, 64, 128, 27, 54],
						I = (s.AES = r.extend({
							_doReset: function () {
								var l;
								if (
									!(
										this._nRounds &&
										this._keyPriorReset === this._key
									)
								) {
									for (
										var d = (this._keyPriorReset =
												this._key),
											b = d.words,
											v = d.sigBytes / 4,
											L = (this._nRounds = v + 6),
											D = (L + 1) * 4,
											O = (this._keySchedule = []),
											N = 0;
										N < D;
										N++
									)
										N < v
											? (O[N] = b[N])
											: ((l = O[N - 1]),
												N % v
													? v > 6 &&
														N % v == 4 &&
														(l =
															(a[l >>> 24] <<
																24) |
															(a[
																(l >>> 16) & 255
															] <<
																16) |
															(a[
																(l >>> 8) & 255
															] <<
																8) |
															a[l & 255])
													: ((l =
															(l << 8) |
															(l >>> 24)),
														(l =
															(a[l >>> 24] <<
																24) |
															(a[
																(l >>> 16) & 255
															] <<
																16) |
															(a[
																(l >>> 8) & 255
															] <<
																8) |
															a[l & 255]),
														(l ^=
															T[(N / v) | 0] <<
															24)),
												(O[N] = O[N - v] ^ l));
									for (
										var H = (this._invKeySchedule = []),
											$ = 0;
										$ < D;
										$++
									) {
										var N = D - $;
										if ($ % 4) var l = O[N];
										else var l = O[N - 4];
										$ < 4 || N <= 4
											? (H[$] = l)
											: (H[$] =
													p[a[l >>> 24]] ^
													g[a[(l >>> 16) & 255]] ^
													y[a[(l >>> 8) & 255]] ^
													m[a[l & 255]]);
									}
								}
							},
							encryptBlock: function (l, d) {
								this._doCryptBlock(
									l,
									d,
									this._keySchedule,
									o,
									u,
									h,
									f,
									a,
								);
							},
							decryptBlock: function (l, d) {
								var b = l[d + 1];
								(l[d + 1] = l[d + 3]),
									(l[d + 3] = b),
									this._doCryptBlock(
										l,
										d,
										this._invKeySchedule,
										p,
										g,
										y,
										m,
										n,
									);
								var b = l[d + 1];
								(l[d + 1] = l[d + 3]), (l[d + 3] = b);
							},
							_doCryptBlock: function (l, d, b, v, L, D, O, N) {
								for (
									var H = this._nRounds,
										$ = l[d] ^ b[0],
										x = l[d + 1] ^ b[1],
										E = l[d + 2] ^ b[2],
										P = l[d + 3] ^ b[3],
										_ = 4,
										V = 1;
									V < H;
									V++
								) {
									var j =
											v[$ >>> 24] ^
											L[(x >>> 16) & 255] ^
											D[(E >>> 8) & 255] ^
											O[P & 255] ^
											b[_++],
										z =
											v[x >>> 24] ^
											L[(E >>> 16) & 255] ^
											D[(P >>> 8) & 255] ^
											O[$ & 255] ^
											b[_++],
										J =
											v[E >>> 24] ^
											L[(P >>> 16) & 255] ^
											D[($ >>> 8) & 255] ^
											O[x & 255] ^
											b[_++],
										w =
											v[P >>> 24] ^
											L[($ >>> 16) & 255] ^
											D[(x >>> 8) & 255] ^
											O[E & 255] ^
											b[_++];
									($ = j), (x = z), (E = J), (P = w);
								}
								var j =
										((N[$ >>> 24] << 24) |
											(N[(x >>> 16) & 255] << 16) |
											(N[(E >>> 8) & 255] << 8) |
											N[P & 255]) ^
										b[_++],
									z =
										((N[x >>> 24] << 24) |
											(N[(E >>> 16) & 255] << 16) |
											(N[(P >>> 8) & 255] << 8) |
											N[$ & 255]) ^
										b[_++],
									J =
										((N[E >>> 24] << 24) |
											(N[(P >>> 16) & 255] << 16) |
											(N[($ >>> 8) & 255] << 8) |
											N[x & 255]) ^
										b[_++],
									w =
										((N[P >>> 24] << 24) |
											(N[($ >>> 16) & 255] << 16) |
											(N[(x >>> 8) & 255] << 8) |
											N[E & 255]) ^
										b[_++];
								(l[d] = j),
									(l[d + 1] = z),
									(l[d + 2] = J),
									(l[d + 3] = w);
							},
							keySize: 256 / 32,
						}));
					t.AES = r._createHelper(I);
				})(),
				e.AES
			);
		});
	});
	var Hs = ie((It, Us) => {
		(function (e, t) {
			typeof It == "object"
				? (Us.exports = It = t(be()))
				: typeof define == "function" && define.amd
					? define(["./core"], t)
					: t(e.CryptoJS);
		})(It, function (e) {
			return e.enc.Utf8;
		});
	});
	var Yi = Ae(Pt()),
		rt = {
			"application/ecmascript": {
				source: "apache",
				compressible: !0,
				extensions: ["ecma"],
			},
			"application/gzip": {
				source: "iana",
				compressible: !1,
				extensions: ["gz"],
			},
			"application/http": { source: "iana" },
			"application/javascript": {
				source: "apache",
				charset: "UTF-8",
				compressible: !0,
				extensions: ["js"],
			},
			"application/json": {
				source: "iana",
				charset: "UTF-8",
				compressible: !0,
				extensions: ["json", "map"],
			},
			"application/manifest+json": {
				source: "iana",
				charset: "UTF-8",
				compressible: !0,
				extensions: ["webmanifest"],
			},
			"application/marc": { source: "iana", extensions: ["mrc"] },
			"application/mp4": {
				source: "iana",
				extensions: ["mp4", "mpg4", "mp4s", "m4p"],
			},
			"application/ogg": {
				source: "iana",
				compressible: !1,
				extensions: ["ogx"],
			},
			"application/sql": { source: "iana", extensions: ["sql"] },
			"application/wasm": {
				source: "iana",
				compressible: !0,
				extensions: ["wasm"],
			},
			"application/x-bittorrent": {
				source: "apache",
				extensions: ["torrent"],
			},
			"application/x-gzip": { source: "apache" },
			"application/x-javascript": { compressible: !0 },
			"application/x-web-app-manifest+json": {
				compressible: !0,
				extensions: ["webapp"],
			},
			"application/x-www-form-urlencoded": {
				source: "iana",
				compressible: !0,
			},
			"application/xhtml+xml": {
				source: "iana",
				compressible: !0,
				extensions: ["xhtml", "xht"],
			},
			"application/xhtml-voice+xml": {
				source: "apache",
				compressible: !0,
			},
			"application/xml": {
				source: "iana",
				compressible: !0,
				extensions: ["xml", "xsl", "xsd", "rng"],
			},
			"application/zip": {
				source: "iana",
				compressible: !1,
				extensions: ["zip"],
			},
			"application/zlib": { source: "iana" },
			"audio/midi": {
				source: "apache",
				extensions: ["mid", "midi", "kar", "rmi"],
			},
			"audio/mp3": { compressible: !1, extensions: ["mp3"] },
			"audio/mp4": {
				source: "iana",
				compressible: !1,
				extensions: ["m4a", "mp4a"],
			},
			"audio/mp4a-latm": { source: "iana" },
			"audio/mpa": { source: "iana" },
			"audio/mpa-robust": { source: "iana" },
			"audio/mpeg": {
				source: "iana",
				compressible: !1,
				extensions: ["mpga", "mp2", "mp2a", "mp3", "m2a", "m3a"],
			},
			"audio/ogg": {
				source: "iana",
				compressible: !1,
				extensions: ["oga", "ogg", "spx", "opus"],
			},
			"audio/red": { source: "iana" },
			"audio/rtx": { source: "iana" },
			"audio/scip": { source: "iana" },
			"audio/silk": { source: "apache", extensions: ["sil"] },
			"audio/smv": { source: "iana" },
			"audio/wav": { compressible: !1, extensions: ["wav"] },
			"audio/wave": { compressible: !1, extensions: ["wav"] },
			"audio/webm": {
				source: "apache",
				compressible: !1,
				extensions: ["weba"],
			},
			"audio/x-aac": {
				source: "apache",
				compressible: !1,
				extensions: ["aac"],
			},
			"audio/x-aiff": {
				source: "apache",
				extensions: ["aif", "aiff", "aifc"],
			},
			"audio/x-caf": {
				source: "apache",
				compressible: !1,
				extensions: ["caf"],
			},
			"audio/x-flac": { source: "apache", extensions: ["flac"] },
			"audio/x-m4a": { source: "nginx", extensions: ["m4a"] },
			"audio/x-matroska": { source: "apache", extensions: ["mka"] },
			"audio/x-mpegurl": { source: "apache", extensions: ["m3u"] },
			"audio/x-ms-wax": { source: "apache", extensions: ["wax"] },
			"audio/x-ms-wma": { source: "apache", extensions: ["wma"] },
			"audio/x-pn-realaudio": {
				source: "apache",
				extensions: ["ram", "ra"],
			},
			"audio/x-pn-realaudio-plugin": {
				source: "apache",
				extensions: ["rmp"],
			},
			"audio/x-realaudio": { source: "nginx", extensions: ["ra"] },
			"audio/x-tta": { source: "apache" },
			"audio/x-wav": { source: "apache", extensions: ["wav"] },
			"audio/xm": { source: "apache", extensions: ["xm"] },
			"font/collection": { source: "iana", extensions: ["ttc"] },
			"font/otf": {
				source: "iana",
				compressible: !0,
				extensions: ["otf"],
			},
			"font/sfnt": { source: "iana" },
			"font/ttf": {
				source: "iana",
				compressible: !0,
				extensions: ["ttf"],
			},
			"font/woff": { source: "iana", extensions: ["woff"] },
			"font/woff2": { source: "iana", extensions: ["woff2"] },
			"image/gif": {
				source: "iana",
				compressible: !1,
				extensions: ["gif"],
			},
			"image/heic": { source: "iana", extensions: ["heic"] },
			"image/heic-sequence": { source: "iana", extensions: ["heics"] },
			"image/heif": { source: "iana", extensions: ["heif"] },
			"image/jpeg": {
				source: "iana",
				compressible: !1,
				extensions: ["jpeg", "jpg", "jpe"],
			},
			"image/png": {
				source: "iana",
				compressible: !1,
				extensions: ["png"],
			},
			"image/svg+xml": {
				source: "iana",
				compressible: !0,
				extensions: ["svg", "svgz"],
			},
			"image/webp": { source: "iana", extensions: ["webp"] },
			"text/coffeescript": { extensions: ["coffee", "litcoffee"] },
			"text/css": {
				source: "iana",
				charset: "UTF-8",
				compressible: !0,
				extensions: ["css"],
			},
			"text/ecmascript": { source: "apache" },
			"text/html": {
				source: "iana",
				compressible: !0,
				extensions: ["html", "htm", "shtml"],
			},
			"text/jade": { extensions: ["jade"] },
			"text/javascript": {
				source: "iana",
				charset: "UTF-8",
				compressible: !0,
				extensions: ["js", "mjs"],
			},
			"text/markdown": {
				source: "iana",
				compressible: !0,
				extensions: ["md", "markdown"],
			},
		},
		Ji = /^\s*([^;\s]*)(?:;|\s|$)/,
		Xs = /^text\//i,
		ee = {};
	function Qi(e) {
		if (!e || typeof e != "string") return !1;
		var t = Ji.exec(e),
			i = t && rt[t[1].toLowerCase()];
		return i && i.charset ? i.charset : !(!t || !Xs.test(t[1])) && "UTF-8";
	}
	function ea(e) {
		if (!e || typeof e != "string") return !1;
		var t = e.indexOf("/") === -1 ? ee.lookup(e) : e;
		if (!t) return !1;
		if (t.indexOf("charset") === -1) {
			var i = ee.charset(t);
			i && (t += "; charset=" + i.toLowerCase());
		}
		return t;
	}
	function ta(e) {
		if (!e || typeof e != "string") return !1;
		var t = Ji.exec(e),
			i = t && ee.extensions[t[1].toLowerCase()];
		return !(!i || !i.length) && i[0];
	}
	function ia(e) {
		if (!e || typeof e != "string") return !1;
		var t = (0, Yi.extname)("x." + e)
			.toLowerCase()
			.substr(1);
		return (t && ee.types[t]) || !1;
	}
	function ra(e, t) {
		var i = ["nginx", "apache", void 0, "iana"];
		Object.keys(rt).forEach(function (r) {
			var s = rt[r],
				a = s.extensions;
			if (a && a.length) {
				e[r] = a;
				for (var n = 0; n < a.length; n++) {
					var o = a[n];
					if (t[o]) {
						var u = i.indexOf(rt[t[o]].source),
							h = i.indexOf(s.source);
						if (
							t[o] !== "application/octet-stream" &&
							(u > h ||
								(u === h &&
									t[o].substr(0, 12) === "application/"))
						)
							continue;
					}
					t[o] = r;
				}
			}
		});
	}
	(ee.charset = Qi),
		(ee.charsets = { lookup: Qi }),
		(ee.contentType = ea),
		(ee.extension = ta),
		(ee.extensions = Object.create(null)),
		(ee.lookup = ia),
		(ee.types = Object.create(null)),
		ra(ee.extensions, ee.types);
	var Zi = ee;
	var Pn = Ae(Pt(), 1);
	var st = {};
	qi(st, {
		deleteDB: () => ha,
		openDB: () => Bt,
		unwrap: () => Oe,
		wrap: () => se,
	});
	var sa = (e, t) => t.some((i) => e instanceof i),
		Xi,
		er;
	function aa() {
		return (
			Xi ||
			(Xi = [
				IDBDatabase,
				IDBObjectStore,
				IDBIndex,
				IDBCursor,
				IDBTransaction,
			])
		);
	}
	function na() {
		return (
			er ||
			(er = [
				IDBCursor.prototype.advance,
				IDBCursor.prototype.continue,
				IDBCursor.prototype.continuePrimaryKey,
			])
		);
	}
	var tr = new WeakMap(),
		Nt = new WeakMap(),
		ir = new WeakMap(),
		Rt = new WeakMap(),
		Dt = new WeakMap();
	function oa(e) {
		let t = new Promise((i, r) => {
			let s = () => {
					e.removeEventListener("success", a),
						e.removeEventListener("error", n);
				},
				a = () => {
					i(se(e.result)), s();
				},
				n = () => {
					r(e.error), s();
				};
			e.addEventListener("success", a), e.addEventListener("error", n);
		});
		return (
			t
				.then((i) => {
					i instanceof IDBCursor && tr.set(i, e);
				})
				.catch(() => {}),
			Dt.set(t, e),
			t
		);
	}
	function ca(e) {
		if (Nt.has(e)) return;
		let t = new Promise((i, r) => {
			let s = () => {
					e.removeEventListener("complete", a),
						e.removeEventListener("error", n),
						e.removeEventListener("abort", n);
				},
				a = () => {
					i(), s();
				},
				n = () => {
					r(e.error || new DOMException("AbortError", "AbortError")),
						s();
				};
			e.addEventListener("complete", a),
				e.addEventListener("error", n),
				e.addEventListener("abort", n);
		});
		Nt.set(e, t);
	}
	var Lt = {
		get(e, t, i) {
			if (e instanceof IDBTransaction) {
				if (t === "done") return Nt.get(e);
				if (t === "objectStoreNames")
					return e.objectStoreNames || ir.get(e);
				if (t === "store")
					return i.objectStoreNames[1]
						? void 0
						: i.objectStore(i.objectStoreNames[0]);
			}
			return se(e[t]);
		},
		set(e, t, i) {
			return (e[t] = i), !0;
		},
		has(e, t) {
			return e instanceof IDBTransaction &&
				(t === "done" || t === "store")
				? !0
				: t in e;
		},
	};
	function rr(e) {
		Lt = e(Lt);
	}
	function ua(e) {
		return e === IDBDatabase.prototype.transaction &&
			!("objectStoreNames" in IDBTransaction.prototype)
			? function (t, ...i) {
					let r = e.call(Oe(this), t, ...i);
					return ir.set(r, t.sort ? t.sort() : [t]), se(r);
				}
			: na().includes(e)
				? function (...t) {
						return e.apply(Oe(this), t), se(tr.get(this));
					}
				: function (...t) {
						return se(e.apply(Oe(this), t));
					};
	}
	function la(e) {
		return typeof e == "function"
			? ua(e)
			: (e instanceof IDBTransaction && ca(e),
				sa(e, aa()) ? new Proxy(e, Lt) : e);
	}
	function se(e) {
		if (e instanceof IDBRequest) return oa(e);
		if (Rt.has(e)) return Rt.get(e);
		let t = la(e);
		return t !== e && (Rt.set(e, t), Dt.set(t, e)), t;
	}
	var Oe = (e) => Dt.get(e);
	function Bt(
		e,
		t,
		{ blocked: i, upgrade: r, blocking: s, terminated: a } = {},
	) {
		let n = indexedDB.open(e, t),
			o = se(n);
		return (
			r &&
				n.addEventListener("upgradeneeded", (u) => {
					r(
						se(n.result),
						u.oldVersion,
						u.newVersion,
						se(n.transaction),
						u,
					);
				}),
			i &&
				n.addEventListener("blocked", (u) =>
					i(u.oldVersion, u.newVersion, u),
				),
			o
				.then((u) => {
					a && u.addEventListener("close", () => a()),
						s &&
							u.addEventListener("versionchange", (h) =>
								s(h.oldVersion, h.newVersion, h),
							);
				})
				.catch(() => {}),
			o
		);
	}
	function ha(e, { blocked: t } = {}) {
		let i = indexedDB.deleteDatabase(e);
		return (
			t && i.addEventListener("blocked", (r) => t(r.oldVersion, r)),
			se(i).then(() => {})
		);
	}
	var fa = ["get", "getKey", "getAll", "getAllKeys", "count"],
		pa = ["put", "add", "delete", "clear"],
		Tt = new Map();
	function sr(e, t) {
		if (!(e instanceof IDBDatabase && !(t in e) && typeof t == "string"))
			return;
		if (Tt.get(t)) return Tt.get(t);
		let i = t.replace(/FromIndex$/, ""),
			r = t !== i,
			s = pa.includes(i);
		if (
			!(i in (r ? IDBIndex : IDBObjectStore).prototype) ||
			!(s || fa.includes(i))
		)
			return;
		let a = async function (n, ...o) {
			let u = this.transaction(n, s ? "readwrite" : "readonly"),
				h = u.store;
			return (
				r && (h = h.index(o.shift())),
				(await Promise.all([h[i](...o), s && u.done]))[0]
			);
		};
		return Tt.set(t, a), a;
	}
	rr((e) => ({
		...e,
		get: (t, i, r) => sr(t, i) || e.get(t, i, r),
		has: (t, i) => !!sr(t, i) || e.has(t, i),
	}));
	var da = [
			509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0,
			166, 1, 574, 3, 9, 9, 370, 1, 81, 2, 71, 10, 50, 3, 123, 2, 54, 14,
			32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1,
			45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 3, 0, 158, 11, 6,
			9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17,
			10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82,
			12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2,
			1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47,
			15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2,
			0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 10, 1, 2, 0, 49, 6, 4, 4,
			14, 9, 5351, 0, 7, 14, 13835, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014,
			0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4,
			5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0,
			23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 101, 0, 161, 6, 10,
			9, 357, 0, 62, 13, 499, 13, 983, 6, 110, 6, 6, 9, 4759, 9, 787719,
			239,
		],
		lr = [
			0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28,
			4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157,
			19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2,
			14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5,
			3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11,
			21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28,
			36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14,
			50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28,
			22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34,
			4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 20, 1, 64, 6, 2, 0,
			2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4,
			0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185,
			46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43,
			117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38,
			17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264,
			8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2,
			31, 15, 0, 328, 18, 16, 0, 2, 12, 2, 33, 125, 0, 80, 921, 103, 110,
			18, 195, 2637, 96, 16, 1071, 18, 5, 4026, 582, 8634, 568, 8, 30, 18,
			78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0,
			67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1,
			2, 290, 16, 0, 30, 2, 3, 0, 15, 3, 9, 395, 2309, 106, 6, 12, 4, 8,
			8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2,
			64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24,
			2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7,
			1845, 30, 7, 5, 262, 61, 147, 44, 11, 6, 17, 0, 322, 29, 19, 43,
			485, 27, 757, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3,
			2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0,
			2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3,
			3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421,
			42719, 33, 4153, 7, 221, 3, 5761, 15, 7472, 16, 621, 2467, 541,
			1507, 4938, 6, 4191,
		],
		ma =
			"\u200C\u200D\xB7\u0300-\u036F\u0387\u0483-\u0487\u0591-\u05BD\u05BF\u05C1\u05C2\u05C4\u05C5\u05C7\u0610-\u061A\u064B-\u0669\u0670\u06D6-\u06DC\u06DF-\u06E4\u06E7\u06E8\u06EA-\u06ED\u06F0-\u06F9\u0711\u0730-\u074A\u07A6-\u07B0\u07C0-\u07C9\u07EB-\u07F3\u07FD\u0816-\u0819\u081B-\u0823\u0825-\u0827\u0829-\u082D\u0859-\u085B\u0898-\u089F\u08CA-\u08E1\u08E3-\u0903\u093A-\u093C\u093E-\u094F\u0951-\u0957\u0962\u0963\u0966-\u096F\u0981-\u0983\u09BC\u09BE-\u09C4\u09C7\u09C8\u09CB-\u09CD\u09D7\u09E2\u09E3\u09E6-\u09EF\u09FE\u0A01-\u0A03\u0A3C\u0A3E-\u0A42\u0A47\u0A48\u0A4B-\u0A4D\u0A51\u0A66-\u0A71\u0A75\u0A81-\u0A83\u0ABC\u0ABE-\u0AC5\u0AC7-\u0AC9\u0ACB-\u0ACD\u0AE2\u0AE3\u0AE6-\u0AEF\u0AFA-\u0AFF\u0B01-\u0B03\u0B3C\u0B3E-\u0B44\u0B47\u0B48\u0B4B-\u0B4D\u0B55-\u0B57\u0B62\u0B63\u0B66-\u0B6F\u0B82\u0BBE-\u0BC2\u0BC6-\u0BC8\u0BCA-\u0BCD\u0BD7\u0BE6-\u0BEF\u0C00-\u0C04\u0C3C\u0C3E-\u0C44\u0C46-\u0C48\u0C4A-\u0C4D\u0C55\u0C56\u0C62\u0C63\u0C66-\u0C6F\u0C81-\u0C83\u0CBC\u0CBE-\u0CC4\u0CC6-\u0CC8\u0CCA-\u0CCD\u0CD5\u0CD6\u0CE2\u0CE3\u0CE6-\u0CEF\u0CF3\u0D00-\u0D03\u0D3B\u0D3C\u0D3E-\u0D44\u0D46-\u0D48\u0D4A-\u0D4D\u0D57\u0D62\u0D63\u0D66-\u0D6F\u0D81-\u0D83\u0DCA\u0DCF-\u0DD4\u0DD6\u0DD8-\u0DDF\u0DE6-\u0DEF\u0DF2\u0DF3\u0E31\u0E34-\u0E3A\u0E47-\u0E4E\u0E50-\u0E59\u0EB1\u0EB4-\u0EBC\u0EC8-\u0ECE\u0ED0-\u0ED9\u0F18\u0F19\u0F20-\u0F29\u0F35\u0F37\u0F39\u0F3E\u0F3F\u0F71-\u0F84\u0F86\u0F87\u0F8D-\u0F97\u0F99-\u0FBC\u0FC6\u102B-\u103E\u1040-\u1049\u1056-\u1059\u105E-\u1060\u1062-\u1064\u1067-\u106D\u1071-\u1074\u1082-\u108D\u108F-\u109D\u135D-\u135F\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17B4-\u17D3\u17DD\u17E0-\u17E9\u180B-\u180D\u180F-\u1819\u18A9\u1920-\u192B\u1930-\u193B\u1946-\u194F\u19D0-\u19DA\u1A17-\u1A1B\u1A55-\u1A5E\u1A60-\u1A7C\u1A7F-\u1A89\u1A90-\u1A99\u1AB0-\u1ABD\u1ABF-\u1ACE\u1B00-\u1B04\u1B34-\u1B44\u1B50-\u1B59\u1B6B-\u1B73\u1B80-\u1B82\u1BA1-\u1BAD\u1BB0-\u1BB9\u1BE6-\u1BF3\u1C24-\u1C37\u1C40-\u1C49\u1C50-\u1C59\u1CD0-\u1CD2\u1CD4-\u1CE8\u1CED\u1CF4\u1CF7-\u1CF9\u1DC0-\u1DFF\u200C\u200D\u203F\u2040\u2054\u20D0-\u20DC\u20E1\u20E5-\u20F0\u2CEF-\u2CF1\u2D7F\u2DE0-\u2DFF\u302A-\u302F\u3099\u309A\u30FB\uA620-\uA629\uA66F\uA674-\uA67D\uA69E\uA69F\uA6F0\uA6F1\uA802\uA806\uA80B\uA823-\uA827\uA82C\uA880\uA881\uA8B4-\uA8C5\uA8D0-\uA8D9\uA8E0-\uA8F1\uA8FF-\uA909\uA926-\uA92D\uA947-\uA953\uA980-\uA983\uA9B3-\uA9C0\uA9D0-\uA9D9\uA9E5\uA9F0-\uA9F9\uAA29-\uAA36\uAA43\uAA4C\uAA4D\uAA50-\uAA59\uAA7B-\uAA7D\uAAB0\uAAB2-\uAAB4\uAAB7\uAAB8\uAABE\uAABF\uAAC1\uAAEB-\uAAEF\uAAF5\uAAF6\uABE3-\uABEA\uABEC\uABED\uABF0-\uABF9\uFB1E\uFE00-\uFE0F\uFE20-\uFE2F\uFE33\uFE34\uFE4D-\uFE4F\uFF10-\uFF19\uFF3F\uFF65",
		hr =
			"\xAA\xB5\xBA\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE\u06EF\u06FA-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07CA-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09F0\u09F1\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B71\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D5F-\u0D61\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0EDC-\u0EDF\u0F00\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u1820-\u1878\u1880-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1950-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u1A00-\u1A16\u1A20-\u1A54\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B83-\u1BA0\u1BAE\u1BAF\u1BBA-\u1BE5\u1C00-\u1C23\u1C4D-\u1C4F\u1C5A-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2071\u207F\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2118-\u211D\u2124\u2126\u2128\u212A-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2160-\u2188\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309B-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u31A0-\u31BF\u31F0-\u31FF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA61F\uA62A\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA840-\uA873\uA882-\uA8B3\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA90A-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF\uA9E0-\uA9E4\uA9E6-\uA9EF\uA9FA-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC",
		Ot = {
			3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile",
			5: "class enum extends super const export import",
			6: "enum",
			strict: "implements interface let package private protected public static yield",
			strictBind: "eval arguments",
		},
		Vt =
			"break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this",
		ga = {
			5: Vt,
			"5module": Vt + " export import",
			6: Vt + " const class extends export import super",
		},
		xa = /^in(stanceof)?$/,
		ya = new RegExp("[" + hr + "]"),
		va = new RegExp("[" + hr + ma + "]");
	function Ft(e, t) {
		for (var i = 65536, r = 0; r < t.length; r += 2) {
			if (((i += t[r]), i > e)) return !1;
			if (((i += t[r + 1]), i >= e)) return !0;
		}
		return !1;
	}
	function ge(e, t) {
		return e < 65
			? e === 36
			: e < 91
				? !0
				: e < 97
					? e === 95
					: e < 123
						? !0
						: e <= 65535
							? e >= 170 && ya.test(String.fromCharCode(e))
							: t === !1
								? !1
								: Ft(e, lr);
	}
	function Pe(e, t) {
		return e < 48
			? e === 36
			: e < 58
				? !0
				: e < 65
					? !1
					: e < 91
						? !0
						: e < 97
							? e === 95
							: e < 123
								? !0
								: e <= 65535
									? e >= 170 &&
										va.test(String.fromCharCode(e))
									: t === !1
										? !1
										: Ft(e, lr) || Ft(e, da);
	}
	var U = function (t, i) {
		i === void 0 && (i = {}),
			(this.label = t),
			(this.keyword = i.keyword),
			(this.beforeExpr = !!i.beforeExpr),
			(this.startsExpr = !!i.startsExpr),
			(this.isLoop = !!i.isLoop),
			(this.isAssign = !!i.isAssign),
			(this.prefix = !!i.prefix),
			(this.postfix = !!i.postfix),
			(this.binop = i.binop || null),
			(this.updateContext = null);
	};
	function ae(e, t) {
		return new U(e, { beforeExpr: !0, binop: t });
	}
	var ne = { beforeExpr: !0 },
		te = { startsExpr: !0 },
		Ht = {};
	function F(e, t) {
		return t === void 0 && (t = {}), (t.keyword = e), (Ht[e] = new U(e, t));
	}
	var c = {
			num: new U("num", te),
			regexp: new U("regexp", te),
			string: new U("string", te),
			name: new U("name", te),
			privateId: new U("privateId", te),
			eof: new U("eof"),
			bracketL: new U("[", { beforeExpr: !0, startsExpr: !0 }),
			bracketR: new U("]"),
			braceL: new U("{", { beforeExpr: !0, startsExpr: !0 }),
			braceR: new U("}"),
			parenL: new U("(", { beforeExpr: !0, startsExpr: !0 }),
			parenR: new U(")"),
			comma: new U(",", ne),
			semi: new U(";", ne),
			colon: new U(":", ne),
			dot: new U("."),
			question: new U("?", ne),
			questionDot: new U("?."),
			arrow: new U("=>", ne),
			template: new U("template"),
			invalidTemplate: new U("invalidTemplate"),
			ellipsis: new U("...", ne),
			backQuote: new U("`", te),
			dollarBraceL: new U("${", { beforeExpr: !0, startsExpr: !0 }),
			eq: new U("=", { beforeExpr: !0, isAssign: !0 }),
			assign: new U("_=", { beforeExpr: !0, isAssign: !0 }),
			incDec: new U("++/--", { prefix: !0, postfix: !0, startsExpr: !0 }),
			prefix: new U("!/~", {
				beforeExpr: !0,
				prefix: !0,
				startsExpr: !0,
			}),
			logicalOR: ae("||", 1),
			logicalAND: ae("&&", 2),
			bitwiseOR: ae("|", 3),
			bitwiseXOR: ae("^", 4),
			bitwiseAND: ae("&", 5),
			equality: ae("==/!=/===/!==", 6),
			relational: ae("</>/<=/>=", 7),
			bitShift: ae("<</>>/>>>", 8),
			plusMin: new U("+/-", {
				beforeExpr: !0,
				binop: 9,
				prefix: !0,
				startsExpr: !0,
			}),
			modulo: ae("%", 10),
			star: ae("*", 10),
			slash: ae("/", 10),
			starstar: new U("**", { beforeExpr: !0 }),
			coalesce: ae("??", 1),
			_break: F("break"),
			_case: F("case", ne),
			_catch: F("catch"),
			_continue: F("continue"),
			_debugger: F("debugger"),
			_default: F("default", ne),
			_do: F("do", { isLoop: !0, beforeExpr: !0 }),
			_else: F("else", ne),
			_finally: F("finally"),
			_for: F("for", { isLoop: !0 }),
			_function: F("function", te),
			_if: F("if"),
			_return: F("return", ne),
			_switch: F("switch"),
			_throw: F("throw", ne),
			_try: F("try"),
			_var: F("var"),
			_const: F("const"),
			_while: F("while", { isLoop: !0 }),
			_with: F("with"),
			_new: F("new", { beforeExpr: !0, startsExpr: !0 }),
			_this: F("this", te),
			_super: F("super", te),
			_class: F("class", te),
			_extends: F("extends", ne),
			_export: F("export"),
			_import: F("import", te),
			_null: F("null", te),
			_true: F("true", te),
			_false: F("false", te),
			_in: F("in", { beforeExpr: !0, binop: 7 }),
			_instanceof: F("instanceof", { beforeExpr: !0, binop: 7 }),
			_typeof: F("typeof", {
				beforeExpr: !0,
				prefix: !0,
				startsExpr: !0,
			}),
			_void: F("void", { beforeExpr: !0, prefix: !0, startsExpr: !0 }),
			_delete: F("delete", {
				beforeExpr: !0,
				prefix: !0,
				startsExpr: !0,
			}),
		},
		ue = /\r\n?|\n|\u2028|\u2029/,
		ba = new RegExp(ue.source, "g");
	function Re(e) {
		return e === 10 || e === 13 || e === 8232 || e === 8233;
	}
	function fr(e, t, i) {
		i === void 0 && (i = e.length);
		for (var r = t; r < i; r++) {
			var s = e.charCodeAt(r);
			if (Re(s))
				return r < i - 1 && s === 13 && e.charCodeAt(r + 1) === 10
					? r + 2
					: r + 1;
		}
		return -1;
	}
	var pr = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/,
		oe = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g,
		dr = Object.prototype,
		wa = dr.hasOwnProperty,
		_a = dr.toString,
		je =
			Object.hasOwn ||
			function (e, t) {
				return wa.call(e, t);
			},
		ar =
			Array.isArray ||
			function (e) {
				return _a.call(e) === "[object Array]";
			},
		nr = Object.create(null);
	function we(e) {
		return (
			nr[e] || (nr[e] = new RegExp("^(?:" + e.replace(/ /g, "|") + ")$"))
		);
	}
	function _e(e) {
		return e <= 65535
			? String.fromCharCode(e)
			: ((e -= 65536),
				String.fromCharCode((e >> 10) + 55296, (e & 1023) + 56320));
	}
	var Ca =
			/(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/,
		Me = function (t, i) {
			(this.line = t), (this.column = i);
		};
	Me.prototype.offset = function (t) {
		return new Me(this.line, this.column + t);
	};
	var ut = function (t, i, r) {
		(this.start = i),
			(this.end = r),
			t.sourceFile !== null && (this.source = t.sourceFile);
	};
	function mr(e, t) {
		for (var i = 1, r = 0; ; ) {
			var s = fr(e, r, t);
			if (s < 0) return new Me(i, t - r);
			++i, (r = s);
		}
	}
	var jt = {
			ecmaVersion: null,
			sourceType: "script",
			onInsertedSemicolon: null,
			onTrailingComma: null,
			allowReserved: null,
			allowReturnOutsideFunction: !1,
			allowImportExportEverywhere: !1,
			allowAwaitOutsideFunction: null,
			allowSuperOutsideMethod: null,
			allowHashBang: !1,
			checkPrivateFields: !0,
			locations: !1,
			onToken: null,
			onComment: null,
			ranges: !1,
			program: null,
			sourceFile: null,
			directSourceFile: null,
			preserveParens: !1,
		},
		or = !1;
	function ka(e) {
		var t = {};
		for (var i in jt) t[i] = e && je(e, i) ? e[i] : jt[i];
		if (
			(t.ecmaVersion === "latest"
				? (t.ecmaVersion = 1e8)
				: t.ecmaVersion == null
					? (!or &&
							typeof console == "object" &&
							console.warn &&
							((or = !0),
							console.warn(`Since Acorn 8.0.0, options.ecmaVersion is required.
Defaulting to 2020, but this will stop working in the future.`)),
						(t.ecmaVersion = 11))
					: t.ecmaVersion >= 2015 && (t.ecmaVersion -= 2009),
			t.allowReserved == null && (t.allowReserved = t.ecmaVersion < 5),
			(!e || e.allowHashBang == null) &&
				(t.allowHashBang = t.ecmaVersion >= 14),
			ar(t.onToken))
		) {
			var r = t.onToken;
			t.onToken = function (s) {
				return r.push(s);
			};
		}
		return ar(t.onComment) && (t.onComment = Sa(t, t.onComment)), t;
	}
	function Sa(e, t) {
		return function (i, r, s, a, n, o) {
			var u = { type: i ? "Block" : "Line", value: r, start: s, end: a };
			e.locations && (u.loc = new ut(this, n, o)),
				e.ranges && (u.range = [s, a]),
				t.push(u);
		};
	}
	var Fe = 1,
		Ne = 2,
		$t = 4,
		gr = 8,
		xr = 16,
		yr = 32,
		Wt = 64,
		vr = 128,
		Ue = 256,
		zt = Fe | Ne | Ue;
	function qt(e, t) {
		return Ne | (e ? $t : 0) | (t ? gr : 0);
	}
	var nt = 0,
		Gt = 1,
		ye = 2,
		br = 3,
		wr = 4,
		_r = 5,
		q = function (t, i, r) {
			(this.options = t = ka(t)),
				(this.sourceFile = t.sourceFile),
				(this.keywords = we(
					ga[
						t.ecmaVersion >= 6
							? 6
							: t.sourceType === "module"
								? "5module"
								: 5
					],
				));
			var s = "";
			t.allowReserved !== !0 &&
				((s = Ot[t.ecmaVersion >= 6 ? 6 : t.ecmaVersion === 5 ? 5 : 3]),
				t.sourceType === "module" && (s += " await")),
				(this.reservedWords = we(s));
			var a = (s ? s + " " : "") + Ot.strict;
			(this.reservedWordsStrict = we(a)),
				(this.reservedWordsStrictBind = we(a + " " + Ot.strictBind)),
				(this.input = String(i)),
				(this.containsEsc = !1),
				r
					? ((this.pos = r),
						(this.lineStart =
							this.input.lastIndexOf(
								`
`,
								r - 1,
							) + 1),
						(this.curLine = this.input
							.slice(0, this.lineStart)
							.split(ue).length))
					: ((this.pos = this.lineStart = 0), (this.curLine = 1)),
				(this.type = c.eof),
				(this.value = null),
				(this.start = this.end = this.pos),
				(this.startLoc = this.endLoc = this.curPosition()),
				(this.lastTokEndLoc = this.lastTokStartLoc = null),
				(this.lastTokStart = this.lastTokEnd = this.pos),
				(this.context = this.initialContext()),
				(this.exprAllowed = !0),
				(this.inModule = t.sourceType === "module"),
				(this.strict = this.inModule || this.strictDirective(this.pos)),
				(this.potentialArrowAt = -1),
				(this.potentialArrowInForAwait = !1),
				(this.yieldPos = this.awaitPos = this.awaitIdentPos = 0),
				(this.labels = []),
				(this.undefinedExports = Object.create(null)),
				this.pos === 0 &&
					t.allowHashBang &&
					this.input.slice(0, 2) === "#!" &&
					this.skipLineComment(2),
				(this.scopeStack = []),
				this.enterScope(Fe),
				(this.regexpState = null),
				(this.privateNameStack = []);
		},
		de = {
			inFunction: { configurable: !0 },
			inGenerator: { configurable: !0 },
			inAsync: { configurable: !0 },
			canAwait: { configurable: !0 },
			allowSuper: { configurable: !0 },
			allowDirectSuper: { configurable: !0 },
			treatFunctionsAsVar: { configurable: !0 },
			allowNewDotTarget: { configurable: !0 },
			inClassStaticBlock: { configurable: !0 },
		};
	q.prototype.parse = function () {
		var t = this.options.program || this.startNode();
		return this.nextToken(), this.parseTopLevel(t);
	};
	de.inFunction.get = function () {
		return (this.currentVarScope().flags & Ne) > 0;
	};
	de.inGenerator.get = function () {
		return (
			(this.currentVarScope().flags & gr) > 0 &&
			!this.currentVarScope().inClassFieldInit
		);
	};
	de.inAsync.get = function () {
		return (
			(this.currentVarScope().flags & $t) > 0 &&
			!this.currentVarScope().inClassFieldInit
		);
	};
	de.canAwait.get = function () {
		for (var e = this.scopeStack.length - 1; e >= 0; e--) {
			var t = this.scopeStack[e];
			if (t.inClassFieldInit || t.flags & Ue) return !1;
			if (t.flags & Ne) return (t.flags & $t) > 0;
		}
		return (
			(this.inModule && this.options.ecmaVersion >= 13) ||
			this.options.allowAwaitOutsideFunction
		);
	};
	de.allowSuper.get = function () {
		var e = this.currentThisScope(),
			t = e.flags,
			i = e.inClassFieldInit;
		return (t & Wt) > 0 || i || this.options.allowSuperOutsideMethod;
	};
	de.allowDirectSuper.get = function () {
		return (this.currentThisScope().flags & vr) > 0;
	};
	de.treatFunctionsAsVar.get = function () {
		return this.treatFunctionsAsVarInScope(this.currentScope());
	};
	de.allowNewDotTarget.get = function () {
		var e = this.currentThisScope(),
			t = e.flags,
			i = e.inClassFieldInit;
		return (t & (Ne | Ue)) > 0 || i;
	};
	de.inClassStaticBlock.get = function () {
		return (this.currentVarScope().flags & Ue) > 0;
	};
	q.extend = function () {
		for (var t = [], i = arguments.length; i--; ) t[i] = arguments[i];
		for (var r = this, s = 0; s < t.length; s++) r = t[s](r);
		return r;
	};
	q.parse = function (t, i) {
		return new this(i, t).parse();
	};
	q.parseExpressionAt = function (t, i, r) {
		var s = new this(r, t, i);
		return s.nextToken(), s.parseExpression();
	};
	q.tokenizer = function (t, i) {
		return new this(i, t);
	};
	Object.defineProperties(q.prototype, de);
	var Z = q.prototype,
		Ea = /^(?:'((?:\\.|[^'\\])*?)'|"((?:\\.|[^"\\])*?)")/;
	Z.strictDirective = function (e) {
		if (this.options.ecmaVersion < 5) return !1;
		for (;;) {
			(oe.lastIndex = e), (e += oe.exec(this.input)[0].length);
			var t = Ea.exec(this.input.slice(e));
			if (!t) return !1;
			if ((t[1] || t[2]) === "use strict") {
				oe.lastIndex = e + t[0].length;
				var i = oe.exec(this.input),
					r = i.index + i[0].length,
					s = this.input.charAt(r);
				return (
					s === ";" ||
					s === "}" ||
					(ue.test(i[0]) &&
						!(
							/[(`.[+\-/*%<>=,?^&]/.test(s) ||
							(s === "!" && this.input.charAt(r + 1) === "=")
						))
				);
			}
			(e += t[0].length),
				(oe.lastIndex = e),
				(e += oe.exec(this.input)[0].length),
				this.input[e] === ";" && e++;
		}
	};
	Z.eat = function (e) {
		return this.type === e ? (this.next(), !0) : !1;
	};
	Z.isContextual = function (e) {
		return this.type === c.name && this.value === e && !this.containsEsc;
	};
	Z.eatContextual = function (e) {
		return this.isContextual(e) ? (this.next(), !0) : !1;
	};
	Z.expectContextual = function (e) {
		this.eatContextual(e) || this.unexpected();
	};
	Z.canInsertSemicolon = function () {
		return (
			this.type === c.eof ||
			this.type === c.braceR ||
			ue.test(this.input.slice(this.lastTokEnd, this.start))
		);
	};
	Z.insertSemicolon = function () {
		if (this.canInsertSemicolon())
			return (
				this.options.onInsertedSemicolon &&
					this.options.onInsertedSemicolon(
						this.lastTokEnd,
						this.lastTokEndLoc,
					),
				!0
			);
	};
	Z.semicolon = function () {
		!this.eat(c.semi) && !this.insertSemicolon() && this.unexpected();
	};
	Z.afterTrailingComma = function (e, t) {
		if (this.type === e)
			return (
				this.options.onTrailingComma &&
					this.options.onTrailingComma(
						this.lastTokStart,
						this.lastTokStartLoc,
					),
				t || this.next(),
				!0
			);
	};
	Z.expect = function (e) {
		this.eat(e) || this.unexpected();
	};
	Z.unexpected = function (e) {
		this.raise(e ?? this.start, "Unexpected token");
	};
	var lt = function () {
		this.shorthandAssign =
			this.trailingComma =
			this.parenthesizedAssign =
			this.parenthesizedBind =
			this.doubleProto =
				-1;
	};
	Z.checkPatternErrors = function (e, t) {
		if (e) {
			e.trailingComma > -1 &&
				this.raiseRecoverable(
					e.trailingComma,
					"Comma is not permitted after the rest element",
				);
			var i = t ? e.parenthesizedAssign : e.parenthesizedBind;
			i > -1 &&
				this.raiseRecoverable(
					i,
					t ? "Assigning to rvalue" : "Parenthesized pattern",
				);
		}
	};
	Z.checkExpressionErrors = function (e, t) {
		if (!e) return !1;
		var i = e.shorthandAssign,
			r = e.doubleProto;
		if (!t) return i >= 0 || r >= 0;
		i >= 0 &&
			this.raise(
				i,
				"Shorthand property assignments are valid only in destructuring patterns",
			),
			r >= 0 &&
				this.raiseRecoverable(r, "Redefinition of __proto__ property");
	};
	Z.checkYieldAwaitInDefaultParams = function () {
		this.yieldPos &&
			(!this.awaitPos || this.yieldPos < this.awaitPos) &&
			this.raise(
				this.yieldPos,
				"Yield expression cannot be a default value",
			),
			this.awaitPos &&
				this.raise(
					this.awaitPos,
					"Await expression cannot be a default value",
				);
	};
	Z.isSimpleAssignTarget = function (e) {
		return e.type === "ParenthesizedExpression"
			? this.isSimpleAssignTarget(e.expression)
			: e.type === "Identifier" || e.type === "MemberExpression";
	};
	var R = q.prototype;
	R.parseTopLevel = function (e) {
		var t = Object.create(null);
		for (e.body || (e.body = []); this.type !== c.eof; ) {
			var i = this.parseStatement(null, !0, t);
			e.body.push(i);
		}
		if (this.inModule)
			for (
				var r = 0, s = Object.keys(this.undefinedExports);
				r < s.length;
				r += 1
			) {
				var a = s[r];
				this.raiseRecoverable(
					this.undefinedExports[a].start,
					"Export '" + a + "' is not defined",
				);
			}
		return (
			this.adaptDirectivePrologue(e.body),
			this.next(),
			(e.sourceType = this.options.sourceType),
			this.finishNode(e, "Program")
		);
	};
	var Kt = { kind: "loop" },
		Aa = { kind: "switch" };
	R.isLet = function (e) {
		if (this.options.ecmaVersion < 6 || !this.isContextual("let"))
			return !1;
		oe.lastIndex = this.pos;
		var t = oe.exec(this.input),
			i = this.pos + t[0].length,
			r = this.input.charCodeAt(i);
		if (r === 91 || r === 92) return !0;
		if (e) return !1;
		if (r === 123 || (r > 55295 && r < 56320)) return !0;
		if (ge(r, !0)) {
			for (var s = i + 1; Pe((r = this.input.charCodeAt(s)), !0); ) ++s;
			if (r === 92 || (r > 55295 && r < 56320)) return !0;
			var a = this.input.slice(i, s);
			if (!xa.test(a)) return !0;
		}
		return !1;
	};
	R.isAsyncFunction = function () {
		if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
			return !1;
		oe.lastIndex = this.pos;
		var e = oe.exec(this.input),
			t = this.pos + e[0].length,
			i;
		return (
			!ue.test(this.input.slice(this.pos, t)) &&
			this.input.slice(t, t + 8) === "function" &&
			(t + 8 === this.input.length ||
				!(
					Pe((i = this.input.charCodeAt(t + 8))) ||
					(i > 55295 && i < 56320)
				))
		);
	};
	R.parseStatement = function (e, t, i) {
		var r = this.type,
			s = this.startNode(),
			a;
		switch ((this.isLet(e) && ((r = c._var), (a = "let")), r)) {
			case c._break:
			case c._continue:
				return this.parseBreakContinueStatement(s, r.keyword);
			case c._debugger:
				return this.parseDebuggerStatement(s);
			case c._do:
				return this.parseDoStatement(s);
			case c._for:
				return this.parseForStatement(s);
			case c._function:
				return (
					e &&
						(this.strict || (e !== "if" && e !== "label")) &&
						this.options.ecmaVersion >= 6 &&
						this.unexpected(),
					this.parseFunctionStatement(s, !1, !e)
				);
			case c._class:
				return e && this.unexpected(), this.parseClass(s, !0);
			case c._if:
				return this.parseIfStatement(s);
			case c._return:
				return this.parseReturnStatement(s);
			case c._switch:
				return this.parseSwitchStatement(s);
			case c._throw:
				return this.parseThrowStatement(s);
			case c._try:
				return this.parseTryStatement(s);
			case c._const:
			case c._var:
				return (
					(a = a || this.value),
					e && a !== "var" && this.unexpected(),
					this.parseVarStatement(s, a)
				);
			case c._while:
				return this.parseWhileStatement(s);
			case c._with:
				return this.parseWithStatement(s);
			case c.braceL:
				return this.parseBlock(!0, s);
			case c.semi:
				return this.parseEmptyStatement(s);
			case c._export:
			case c._import:
				if (this.options.ecmaVersion > 10 && r === c._import) {
					oe.lastIndex = this.pos;
					var n = oe.exec(this.input),
						o = this.pos + n[0].length,
						u = this.input.charCodeAt(o);
					if (u === 40 || u === 46)
						return this.parseExpressionStatement(
							s,
							this.parseExpression(),
						);
				}
				return (
					this.options.allowImportExportEverywhere ||
						(t ||
							this.raise(
								this.start,
								"'import' and 'export' may only appear at the top level",
							),
						this.inModule ||
							this.raise(
								this.start,
								"'import' and 'export' may appear only with 'sourceType: module'",
							)),
					r === c._import
						? this.parseImport(s)
						: this.parseExport(s, i)
				);
			default:
				if (this.isAsyncFunction())
					return (
						e && this.unexpected(),
						this.next(),
						this.parseFunctionStatement(s, !0, !e)
					);
				var h = this.value,
					f = this.parseExpression();
				return r === c.name &&
					f.type === "Identifier" &&
					this.eat(c.colon)
					? this.parseLabeledStatement(s, h, f, e)
					: this.parseExpressionStatement(s, f);
		}
	};
	R.parseBreakContinueStatement = function (e, t) {
		var i = t === "break";
		this.next(),
			this.eat(c.semi) || this.insertSemicolon()
				? (e.label = null)
				: this.type !== c.name
					? this.unexpected()
					: ((e.label = this.parseIdent()), this.semicolon());
		for (var r = 0; r < this.labels.length; ++r) {
			var s = this.labels[r];
			if (
				(e.label == null || s.name === e.label.name) &&
				((s.kind != null && (i || s.kind === "loop")) || (e.label && i))
			)
				break;
		}
		return (
			r === this.labels.length && this.raise(e.start, "Unsyntactic " + t),
			this.finishNode(e, i ? "BreakStatement" : "ContinueStatement")
		);
	};
	R.parseDebuggerStatement = function (e) {
		return (
			this.next(),
			this.semicolon(),
			this.finishNode(e, "DebuggerStatement")
		);
	};
	R.parseDoStatement = function (e) {
		return (
			this.next(),
			this.labels.push(Kt),
			(e.body = this.parseStatement("do")),
			this.labels.pop(),
			this.expect(c._while),
			(e.test = this.parseParenExpression()),
			this.options.ecmaVersion >= 6 ? this.eat(c.semi) : this.semicolon(),
			this.finishNode(e, "DoWhileStatement")
		);
	};
	R.parseForStatement = function (e) {
		this.next();
		var t =
			this.options.ecmaVersion >= 9 &&
			this.canAwait &&
			this.eatContextual("await")
				? this.lastTokStart
				: -1;
		if (
			(this.labels.push(Kt),
			this.enterScope(0),
			this.expect(c.parenL),
			this.type === c.semi)
		)
			return t > -1 && this.unexpected(t), this.parseFor(e, null);
		var i = this.isLet();
		if (this.type === c._var || this.type === c._const || i) {
			var r = this.startNode(),
				s = i ? "let" : this.value;
			return (
				this.next(),
				this.parseVar(r, !0, s),
				this.finishNode(r, "VariableDeclaration"),
				(this.type === c._in ||
					(this.options.ecmaVersion >= 6 &&
						this.isContextual("of"))) &&
				r.declarations.length === 1
					? (this.options.ecmaVersion >= 9 &&
							(this.type === c._in
								? t > -1 && this.unexpected(t)
								: (e.await = t > -1)),
						this.parseForIn(e, r))
					: (t > -1 && this.unexpected(t), this.parseFor(e, r))
			);
		}
		var a = this.isContextual("let"),
			n = !1,
			o = new lt(),
			u = this.parseExpression(t > -1 ? "await" : !0, o);
		return this.type === c._in ||
			(n = this.options.ecmaVersion >= 6 && this.isContextual("of"))
			? (this.options.ecmaVersion >= 9 &&
					(this.type === c._in
						? t > -1 && this.unexpected(t)
						: (e.await = t > -1)),
				a &&
					n &&
					this.raise(
						u.start,
						"The left-hand side of a for-of loop may not start with 'let'.",
					),
				this.toAssignable(u, !1, o),
				this.checkLValPattern(u),
				this.parseForIn(e, u))
			: (this.checkExpressionErrors(o, !0),
				t > -1 && this.unexpected(t),
				this.parseFor(e, u));
	};
	R.parseFunctionStatement = function (e, t, i) {
		return this.next(), this.parseFunction(e, Ve | (i ? 0 : Ut), !1, t);
	};
	R.parseIfStatement = function (e) {
		return (
			this.next(),
			(e.test = this.parseParenExpression()),
			(e.consequent = this.parseStatement("if")),
			(e.alternate = this.eat(c._else)
				? this.parseStatement("if")
				: null),
			this.finishNode(e, "IfStatement")
		);
	};
	R.parseReturnStatement = function (e) {
		return (
			!this.inFunction &&
				!this.options.allowReturnOutsideFunction &&
				this.raise(this.start, "'return' outside of function"),
			this.next(),
			this.eat(c.semi) || this.insertSemicolon()
				? (e.argument = null)
				: ((e.argument = this.parseExpression()), this.semicolon()),
			this.finishNode(e, "ReturnStatement")
		);
	};
	R.parseSwitchStatement = function (e) {
		this.next(),
			(e.discriminant = this.parseParenExpression()),
			(e.cases = []),
			this.expect(c.braceL),
			this.labels.push(Aa),
			this.enterScope(0);
		for (var t, i = !1; this.type !== c.braceR; )
			if (this.type === c._case || this.type === c._default) {
				var r = this.type === c._case;
				t && this.finishNode(t, "SwitchCase"),
					e.cases.push((t = this.startNode())),
					(t.consequent = []),
					this.next(),
					r
						? (t.test = this.parseExpression())
						: (i &&
								this.raiseRecoverable(
									this.lastTokStart,
									"Multiple default clauses",
								),
							(i = !0),
							(t.test = null)),
					this.expect(c.colon);
			} else
				t || this.unexpected(),
					t.consequent.push(this.parseStatement(null));
		return (
			this.exitScope(),
			t && this.finishNode(t, "SwitchCase"),
			this.next(),
			this.labels.pop(),
			this.finishNode(e, "SwitchStatement")
		);
	};
	R.parseThrowStatement = function (e) {
		return (
			this.next(),
			ue.test(this.input.slice(this.lastTokEnd, this.start)) &&
				this.raise(this.lastTokEnd, "Illegal newline after throw"),
			(e.argument = this.parseExpression()),
			this.semicolon(),
			this.finishNode(e, "ThrowStatement")
		);
	};
	var Ia = [];
	R.parseCatchClauseParam = function () {
		var e = this.parseBindingAtom(),
			t = e.type === "Identifier";
		return (
			this.enterScope(t ? yr : 0),
			this.checkLValPattern(e, t ? wr : ye),
			this.expect(c.parenR),
			e
		);
	};
	R.parseTryStatement = function (e) {
		if (
			(this.next(),
			(e.block = this.parseBlock()),
			(e.handler = null),
			this.type === c._catch)
		) {
			var t = this.startNode();
			this.next(),
				this.eat(c.parenL)
					? (t.param = this.parseCatchClauseParam())
					: (this.options.ecmaVersion < 10 && this.unexpected(),
						(t.param = null),
						this.enterScope(0)),
				(t.body = this.parseBlock(!1)),
				this.exitScope(),
				(e.handler = this.finishNode(t, "CatchClause"));
		}
		return (
			(e.finalizer = this.eat(c._finally) ? this.parseBlock() : null),
			!e.handler &&
				!e.finalizer &&
				this.raise(e.start, "Missing catch or finally clause"),
			this.finishNode(e, "TryStatement")
		);
	};
	R.parseVarStatement = function (e, t, i) {
		return (
			this.next(),
			this.parseVar(e, !1, t, i),
			this.semicolon(),
			this.finishNode(e, "VariableDeclaration")
		);
	};
	R.parseWhileStatement = function (e) {
		return (
			this.next(),
			(e.test = this.parseParenExpression()),
			this.labels.push(Kt),
			(e.body = this.parseStatement("while")),
			this.labels.pop(),
			this.finishNode(e, "WhileStatement")
		);
	};
	R.parseWithStatement = function (e) {
		return (
			this.strict && this.raise(this.start, "'with' in strict mode"),
			this.next(),
			(e.object = this.parseParenExpression()),
			(e.body = this.parseStatement("with")),
			this.finishNode(e, "WithStatement")
		);
	};
	R.parseEmptyStatement = function (e) {
		return this.next(), this.finishNode(e, "EmptyStatement");
	};
	R.parseLabeledStatement = function (e, t, i, r) {
		for (var s = 0, a = this.labels; s < a.length; s += 1) {
			var n = a[s];
			n.name === t &&
				this.raise(i.start, "Label '" + t + "' is already declared");
		}
		for (
			var o = this.type.isLoop
					? "loop"
					: this.type === c._switch
						? "switch"
						: null,
				u = this.labels.length - 1;
			u >= 0;
			u--
		) {
			var h = this.labels[u];
			if (h.statementStart === e.start)
				(h.statementStart = this.start), (h.kind = o);
			else break;
		}
		return (
			this.labels.push({ name: t, kind: o, statementStart: this.start }),
			(e.body = this.parseStatement(
				r ? (r.indexOf("label") === -1 ? r + "label" : r) : "label",
			)),
			this.labels.pop(),
			(e.label = i),
			this.finishNode(e, "LabeledStatement")
		);
	};
	R.parseExpressionStatement = function (e, t) {
		return (
			(e.expression = t),
			this.semicolon(),
			this.finishNode(e, "ExpressionStatement")
		);
	};
	R.parseBlock = function (e, t, i) {
		for (
			e === void 0 && (e = !0),
				t === void 0 && (t = this.startNode()),
				t.body = [],
				this.expect(c.braceL),
				e && this.enterScope(0);
			this.type !== c.braceR;

		) {
			var r = this.parseStatement(null);
			t.body.push(r);
		}
		return (
			i && (this.strict = !1),
			this.next(),
			e && this.exitScope(),
			this.finishNode(t, "BlockStatement")
		);
	};
	R.parseFor = function (e, t) {
		return (
			(e.init = t),
			this.expect(c.semi),
			(e.test = this.type === c.semi ? null : this.parseExpression()),
			this.expect(c.semi),
			(e.update = this.type === c.parenR ? null : this.parseExpression()),
			this.expect(c.parenR),
			(e.body = this.parseStatement("for")),
			this.exitScope(),
			this.labels.pop(),
			this.finishNode(e, "ForStatement")
		);
	};
	R.parseForIn = function (e, t) {
		var i = this.type === c._in;
		return (
			this.next(),
			t.type === "VariableDeclaration" &&
				t.declarations[0].init != null &&
				(!i ||
					this.options.ecmaVersion < 8 ||
					this.strict ||
					t.kind !== "var" ||
					t.declarations[0].id.type !== "Identifier") &&
				this.raise(
					t.start,
					(i ? "for-in" : "for-of") +
						" loop variable declaration may not have an initializer",
				),
			(e.left = t),
			(e.right = i ? this.parseExpression() : this.parseMaybeAssign()),
			this.expect(c.parenR),
			(e.body = this.parseStatement("for")),
			this.exitScope(),
			this.labels.pop(),
			this.finishNode(e, i ? "ForInStatement" : "ForOfStatement")
		);
	};
	R.parseVar = function (e, t, i, r) {
		for (e.declarations = [], e.kind = i; ; ) {
			var s = this.startNode();
			if (
				(this.parseVarId(s, i),
				this.eat(c.eq)
					? (s.init = this.parseMaybeAssign(t))
					: !r &&
						  i === "const" &&
						  !(
								this.type === c._in ||
								(this.options.ecmaVersion >= 6 &&
									this.isContextual("of"))
						  )
						? this.unexpected()
						: !r &&
							  s.id.type !== "Identifier" &&
							  !(
									t &&
									(this.type === c._in ||
										this.isContextual("of"))
							  )
							? this.raise(
									this.lastTokEnd,
									"Complex binding patterns require an initialization value",
								)
							: (s.init = null),
				e.declarations.push(this.finishNode(s, "VariableDeclarator")),
				!this.eat(c.comma))
			)
				break;
		}
		return e;
	};
	R.parseVarId = function (e, t) {
		(e.id = this.parseBindingAtom()),
			this.checkLValPattern(e.id, t === "var" ? Gt : ye, !1);
	};
	var Ve = 1,
		Ut = 2,
		Cr = 4;
	R.parseFunction = function (e, t, i, r, s) {
		this.initFunction(e),
			(this.options.ecmaVersion >= 9 ||
				(this.options.ecmaVersion >= 6 && !r)) &&
				(this.type === c.star && t & Ut && this.unexpected(),
				(e.generator = this.eat(c.star))),
			this.options.ecmaVersion >= 8 && (e.async = !!r),
			t & Ve &&
				((e.id =
					t & Cr && this.type !== c.name ? null : this.parseIdent()),
				e.id &&
					!(t & Ut) &&
					this.checkLValSimple(
						e.id,
						this.strict || e.generator || e.async
							? this.treatFunctionsAsVar
								? Gt
								: ye
							: br,
					));
		var a = this.yieldPos,
			n = this.awaitPos,
			o = this.awaitIdentPos;
		return (
			(this.yieldPos = 0),
			(this.awaitPos = 0),
			(this.awaitIdentPos = 0),
			this.enterScope(qt(e.async, e.generator)),
			t & Ve || (e.id = this.type === c.name ? this.parseIdent() : null),
			this.parseFunctionParams(e),
			this.parseFunctionBody(e, i, !1, s),
			(this.yieldPos = a),
			(this.awaitPos = n),
			(this.awaitIdentPos = o),
			this.finishNode(
				e,
				t & Ve ? "FunctionDeclaration" : "FunctionExpression",
			)
		);
	};
	R.parseFunctionParams = function (e) {
		this.expect(c.parenL),
			(e.params = this.parseBindingList(
				c.parenR,
				!1,
				this.options.ecmaVersion >= 8,
			)),
			this.checkYieldAwaitInDefaultParams();
	};
	R.parseClass = function (e, t) {
		this.next();
		var i = this.strict;
		(this.strict = !0), this.parseClassId(e, t), this.parseClassSuper(e);
		var r = this.enterClassBody(),
			s = this.startNode(),
			a = !1;
		for (s.body = [], this.expect(c.braceL); this.type !== c.braceR; ) {
			var n = this.parseClassElement(e.superClass !== null);
			n &&
				(s.body.push(n),
				n.type === "MethodDefinition" && n.kind === "constructor"
					? (a &&
							this.raiseRecoverable(
								n.start,
								"Duplicate constructor in the same class",
							),
						(a = !0))
					: n.key &&
						n.key.type === "PrivateIdentifier" &&
						Pa(r, n) &&
						this.raiseRecoverable(
							n.key.start,
							"Identifier '#" +
								n.key.name +
								"' has already been declared",
						));
		}
		return (
			(this.strict = i),
			this.next(),
			(e.body = this.finishNode(s, "ClassBody")),
			this.exitClassBody(),
			this.finishNode(e, t ? "ClassDeclaration" : "ClassExpression")
		);
	};
	R.parseClassElement = function (e) {
		if (this.eat(c.semi)) return null;
		var t = this.options.ecmaVersion,
			i = this.startNode(),
			r = "",
			s = !1,
			a = !1,
			n = "method",
			o = !1;
		if (this.eatContextual("static")) {
			if (t >= 13 && this.eat(c.braceL))
				return this.parseClassStaticBlock(i), i;
			this.isClassElementNameStart() || this.type === c.star
				? (o = !0)
				: (r = "static");
		}
		if (
			((i.static = o),
			!r &&
				t >= 8 &&
				this.eatContextual("async") &&
				((this.isClassElementNameStart() || this.type === c.star) &&
				!this.canInsertSemicolon()
					? (a = !0)
					: (r = "async")),
			!r && (t >= 9 || !a) && this.eat(c.star) && (s = !0),
			!r && !a && !s)
		) {
			var u = this.value;
			(this.eatContextual("get") || this.eatContextual("set")) &&
				(this.isClassElementNameStart() ? (n = u) : (r = u));
		}
		if (
			(r
				? ((i.computed = !1),
					(i.key = this.startNodeAt(
						this.lastTokStart,
						this.lastTokStartLoc,
					)),
					(i.key.name = r),
					this.finishNode(i.key, "Identifier"))
				: this.parseClassElementName(i),
			t < 13 || this.type === c.parenL || n !== "method" || s || a)
		) {
			var h = !i.static && ot(i, "constructor"),
				f = h && e;
			h &&
				n !== "method" &&
				this.raise(
					i.key.start,
					"Constructor can't have get/set modifier",
				),
				(i.kind = h ? "constructor" : n),
				this.parseClassMethod(i, s, a, f);
		} else this.parseClassField(i);
		return i;
	};
	R.isClassElementNameStart = function () {
		return (
			this.type === c.name ||
			this.type === c.privateId ||
			this.type === c.num ||
			this.type === c.string ||
			this.type === c.bracketL ||
			this.type.keyword
		);
	};
	R.parseClassElementName = function (e) {
		this.type === c.privateId
			? (this.value === "constructor" &&
					this.raise(
						this.start,
						"Classes can't have an element named '#constructor'",
					),
				(e.computed = !1),
				(e.key = this.parsePrivateIdent()))
			: this.parsePropertyName(e);
	};
	R.parseClassMethod = function (e, t, i, r) {
		var s = e.key;
		e.kind === "constructor"
			? (t && this.raise(s.start, "Constructor can't be a generator"),
				i &&
					this.raise(s.start, "Constructor can't be an async method"))
			: e.static &&
				ot(e, "prototype") &&
				this.raise(
					s.start,
					"Classes may not have a static property named prototype",
				);
		var a = (e.value = this.parseMethod(t, i, r));
		return (
			e.kind === "get" &&
				a.params.length !== 0 &&
				this.raiseRecoverable(a.start, "getter should have no params"),
			e.kind === "set" &&
				a.params.length !== 1 &&
				this.raiseRecoverable(
					a.start,
					"setter should have exactly one param",
				),
			e.kind === "set" &&
				a.params[0].type === "RestElement" &&
				this.raiseRecoverable(
					a.params[0].start,
					"Setter cannot use rest params",
				),
			this.finishNode(e, "MethodDefinition")
		);
	};
	R.parseClassField = function (e) {
		if (
			(ot(e, "constructor")
				? this.raise(
						e.key.start,
						"Classes can't have a field named 'constructor'",
					)
				: e.static &&
					ot(e, "prototype") &&
					this.raise(
						e.key.start,
						"Classes can't have a static field named 'prototype'",
					),
			this.eat(c.eq))
		) {
			var t = this.currentThisScope(),
				i = t.inClassFieldInit;
			(t.inClassFieldInit = !0),
				(e.value = this.parseMaybeAssign()),
				(t.inClassFieldInit = i);
		} else e.value = null;
		return this.semicolon(), this.finishNode(e, "PropertyDefinition");
	};
	R.parseClassStaticBlock = function (e) {
		e.body = [];
		var t = this.labels;
		for (
			this.labels = [], this.enterScope(Ue | Wt);
			this.type !== c.braceR;

		) {
			var i = this.parseStatement(null);
			e.body.push(i);
		}
		return (
			this.next(),
			this.exitScope(),
			(this.labels = t),
			this.finishNode(e, "StaticBlock")
		);
	};
	R.parseClassId = function (e, t) {
		this.type === c.name
			? ((e.id = this.parseIdent()),
				t && this.checkLValSimple(e.id, ye, !1))
			: (t === !0 && this.unexpected(), (e.id = null));
	};
	R.parseClassSuper = function (e) {
		e.superClass = this.eat(c._extends)
			? this.parseExprSubscripts(null, !1)
			: null;
	};
	R.enterClassBody = function () {
		var e = { declared: Object.create(null), used: [] };
		return this.privateNameStack.push(e), e.declared;
	};
	R.exitClassBody = function () {
		var e = this.privateNameStack.pop(),
			t = e.declared,
			i = e.used;
		if (this.options.checkPrivateFields)
			for (
				var r = this.privateNameStack.length,
					s = r === 0 ? null : this.privateNameStack[r - 1],
					a = 0;
				a < i.length;
				++a
			) {
				var n = i[a];
				je(t, n.name) ||
					(s
						? s.used.push(n)
						: this.raiseRecoverable(
								n.start,
								"Private field '#" +
									n.name +
									"' must be declared in an enclosing class",
							));
			}
	};
	function Pa(e, t) {
		var i = t.key.name,
			r = e[i],
			s = "true";
		return (
			t.type === "MethodDefinition" &&
				(t.kind === "get" || t.kind === "set") &&
				(s = (t.static ? "s" : "i") + t.kind),
			(r === "iget" && s === "iset") ||
			(r === "iset" && s === "iget") ||
			(r === "sget" && s === "sset") ||
			(r === "sset" && s === "sget")
				? ((e[i] = "true"), !1)
				: r
					? !0
					: ((e[i] = s), !1)
		);
	}
	function ot(e, t) {
		var i = e.computed,
			r = e.key;
		return (
			!i &&
			((r.type === "Identifier" && r.name === t) ||
				(r.type === "Literal" && r.value === t))
		);
	}
	R.parseExportAllDeclaration = function (e, t) {
		return (
			this.options.ecmaVersion >= 11 &&
				(this.eatContextual("as")
					? ((e.exported = this.parseModuleExportName()),
						this.checkExport(t, e.exported, this.lastTokStart))
					: (e.exported = null)),
			this.expectContextual("from"),
			this.type !== c.string && this.unexpected(),
			(e.source = this.parseExprAtom()),
			this.semicolon(),
			this.finishNode(e, "ExportAllDeclaration")
		);
	};
	R.parseExport = function (e, t) {
		if ((this.next(), this.eat(c.star)))
			return this.parseExportAllDeclaration(e, t);
		if (this.eat(c._default))
			return (
				this.checkExport(t, "default", this.lastTokStart),
				(e.declaration = this.parseExportDefaultDeclaration()),
				this.finishNode(e, "ExportDefaultDeclaration")
			);
		if (this.shouldParseExportStatement())
			(e.declaration = this.parseExportDeclaration(e)),
				e.declaration.type === "VariableDeclaration"
					? this.checkVariableExport(t, e.declaration.declarations)
					: this.checkExport(
							t,
							e.declaration.id,
							e.declaration.id.start,
						),
				(e.specifiers = []),
				(e.source = null);
		else {
			if (
				((e.declaration = null),
				(e.specifiers = this.parseExportSpecifiers(t)),
				this.eatContextual("from"))
			)
				this.type !== c.string && this.unexpected(),
					(e.source = this.parseExprAtom());
			else {
				for (var i = 0, r = e.specifiers; i < r.length; i += 1) {
					var s = r[i];
					this.checkUnreserved(s.local),
						this.checkLocalExport(s.local),
						s.local.type === "Literal" &&
							this.raise(
								s.local.start,
								"A string literal cannot be used as an exported binding without `from`.",
							);
				}
				e.source = null;
			}
			this.semicolon();
		}
		return this.finishNode(e, "ExportNamedDeclaration");
	};
	R.parseExportDeclaration = function (e) {
		return this.parseStatement(null);
	};
	R.parseExportDefaultDeclaration = function () {
		var e;
		if (this.type === c._function || (e = this.isAsyncFunction())) {
			var t = this.startNode();
			return (
				this.next(),
				e && this.next(),
				this.parseFunction(t, Ve | Cr, !1, e)
			);
		} else if (this.type === c._class) {
			var i = this.startNode();
			return this.parseClass(i, "nullableID");
		} else {
			var r = this.parseMaybeAssign();
			return this.semicolon(), r;
		}
	};
	R.checkExport = function (e, t, i) {
		e &&
			(typeof t != "string" &&
				(t = t.type === "Identifier" ? t.name : t.value),
			je(e, t) &&
				this.raiseRecoverable(i, "Duplicate export '" + t + "'"),
			(e[t] = !0));
	};
	R.checkPatternExport = function (e, t) {
		var i = t.type;
		if (i === "Identifier") this.checkExport(e, t, t.start);
		else if (i === "ObjectPattern")
			for (var r = 0, s = t.properties; r < s.length; r += 1) {
				var a = s[r];
				this.checkPatternExport(e, a);
			}
		else if (i === "ArrayPattern")
			for (var n = 0, o = t.elements; n < o.length; n += 1) {
				var u = o[n];
				u && this.checkPatternExport(e, u);
			}
		else
			i === "Property"
				? this.checkPatternExport(e, t.value)
				: i === "AssignmentPattern"
					? this.checkPatternExport(e, t.left)
					: i === "RestElement" &&
						this.checkPatternExport(e, t.argument);
	};
	R.checkVariableExport = function (e, t) {
		if (e)
			for (var i = 0, r = t; i < r.length; i += 1) {
				var s = r[i];
				this.checkPatternExport(e, s.id);
			}
	};
	R.shouldParseExportStatement = function () {
		return (
			this.type.keyword === "var" ||
			this.type.keyword === "const" ||
			this.type.keyword === "class" ||
			this.type.keyword === "function" ||
			this.isLet() ||
			this.isAsyncFunction()
		);
	};
	R.parseExportSpecifier = function (e) {
		var t = this.startNode();
		return (
			(t.local = this.parseModuleExportName()),
			(t.exported = this.eatContextual("as")
				? this.parseModuleExportName()
				: t.local),
			this.checkExport(e, t.exported, t.exported.start),
			this.finishNode(t, "ExportSpecifier")
		);
	};
	R.parseExportSpecifiers = function (e) {
		var t = [],
			i = !0;
		for (this.expect(c.braceL); !this.eat(c.braceR); ) {
			if (i) i = !1;
			else if ((this.expect(c.comma), this.afterTrailingComma(c.braceR)))
				break;
			t.push(this.parseExportSpecifier(e));
		}
		return t;
	};
	R.parseImport = function (e) {
		return (
			this.next(),
			this.type === c.string
				? ((e.specifiers = Ia), (e.source = this.parseExprAtom()))
				: ((e.specifiers = this.parseImportSpecifiers()),
					this.expectContextual("from"),
					(e.source =
						this.type === c.string
							? this.parseExprAtom()
							: this.unexpected())),
			this.semicolon(),
			this.finishNode(e, "ImportDeclaration")
		);
	};
	R.parseImportSpecifier = function () {
		var e = this.startNode();
		return (
			(e.imported = this.parseModuleExportName()),
			this.eatContextual("as")
				? (e.local = this.parseIdent())
				: (this.checkUnreserved(e.imported), (e.local = e.imported)),
			this.checkLValSimple(e.local, ye),
			this.finishNode(e, "ImportSpecifier")
		);
	};
	R.parseImportDefaultSpecifier = function () {
		var e = this.startNode();
		return (
			(e.local = this.parseIdent()),
			this.checkLValSimple(e.local, ye),
			this.finishNode(e, "ImportDefaultSpecifier")
		);
	};
	R.parseImportNamespaceSpecifier = function () {
		var e = this.startNode();
		return (
			this.next(),
			this.expectContextual("as"),
			(e.local = this.parseIdent()),
			this.checkLValSimple(e.local, ye),
			this.finishNode(e, "ImportNamespaceSpecifier")
		);
	};
	R.parseImportSpecifiers = function () {
		var e = [],
			t = !0;
		if (
			this.type === c.name &&
			(e.push(this.parseImportDefaultSpecifier()), !this.eat(c.comma))
		)
			return e;
		if (this.type === c.star)
			return e.push(this.parseImportNamespaceSpecifier()), e;
		for (this.expect(c.braceL); !this.eat(c.braceR); ) {
			if (t) t = !1;
			else if ((this.expect(c.comma), this.afterTrailingComma(c.braceR)))
				break;
			e.push(this.parseImportSpecifier());
		}
		return e;
	};
	R.parseModuleExportName = function () {
		if (this.options.ecmaVersion >= 13 && this.type === c.string) {
			var e = this.parseLiteral(this.value);
			return (
				Ca.test(e.value) &&
					this.raise(
						e.start,
						"An export name cannot include a lone surrogate.",
					),
				e
			);
		}
		return this.parseIdent(!0);
	};
	R.adaptDirectivePrologue = function (e) {
		for (var t = 0; t < e.length && this.isDirectiveCandidate(e[t]); ++t)
			e[t].directive = e[t].expression.raw.slice(1, -1);
	};
	R.isDirectiveCandidate = function (e) {
		return (
			this.options.ecmaVersion >= 5 &&
			e.type === "ExpressionStatement" &&
			e.expression.type === "Literal" &&
			typeof e.expression.value == "string" &&
			(this.input[e.start] === '"' || this.input[e.start] === "'")
		);
	};
	var le = q.prototype;
	le.toAssignable = function (e, t, i) {
		if (this.options.ecmaVersion >= 6 && e)
			switch (e.type) {
				case "Identifier":
					this.inAsync &&
						e.name === "await" &&
						this.raise(
							e.start,
							"Cannot use 'await' as identifier inside an async function",
						);
					break;
				case "ObjectPattern":
				case "ArrayPattern":
				case "AssignmentPattern":
				case "RestElement":
					break;
				case "ObjectExpression":
					(e.type = "ObjectPattern"),
						i && this.checkPatternErrors(i, !0);
					for (var r = 0, s = e.properties; r < s.length; r += 1) {
						var a = s[r];
						this.toAssignable(a, t),
							a.type === "RestElement" &&
								(a.argument.type === "ArrayPattern" ||
									a.argument.type === "ObjectPattern") &&
								this.raise(
									a.argument.start,
									"Unexpected token",
								);
					}
					break;
				case "Property":
					e.kind !== "init" &&
						this.raise(
							e.key.start,
							"Object pattern can't contain getter or setter",
						),
						this.toAssignable(e.value, t);
					break;
				case "ArrayExpression":
					(e.type = "ArrayPattern"),
						i && this.checkPatternErrors(i, !0),
						this.toAssignableList(e.elements, t);
					break;
				case "SpreadElement":
					(e.type = "RestElement"),
						this.toAssignable(e.argument, t),
						e.argument.type === "AssignmentPattern" &&
							this.raise(
								e.argument.start,
								"Rest elements cannot have a default value",
							);
					break;
				case "AssignmentExpression":
					e.operator !== "=" &&
						this.raise(
							e.left.end,
							"Only '=' operator can be used for specifying default value.",
						),
						(e.type = "AssignmentPattern"),
						delete e.operator,
						this.toAssignable(e.left, t);
					break;
				case "ParenthesizedExpression":
					this.toAssignable(e.expression, t, i);
					break;
				case "ChainExpression":
					this.raiseRecoverable(
						e.start,
						"Optional chaining cannot appear in left-hand side",
					);
					break;
				case "MemberExpression":
					if (!t) break;
				default:
					this.raise(e.start, "Assigning to rvalue");
			}
		else i && this.checkPatternErrors(i, !0);
		return e;
	};
	le.toAssignableList = function (e, t) {
		for (var i = e.length, r = 0; r < i; r++) {
			var s = e[r];
			s && this.toAssignable(s, t);
		}
		if (i) {
			var a = e[i - 1];
			this.options.ecmaVersion === 6 &&
				t &&
				a &&
				a.type === "RestElement" &&
				a.argument.type !== "Identifier" &&
				this.unexpected(a.argument.start);
		}
		return e;
	};
	le.parseSpread = function (e) {
		var t = this.startNode();
		return (
			this.next(),
			(t.argument = this.parseMaybeAssign(!1, e)),
			this.finishNode(t, "SpreadElement")
		);
	};
	le.parseRestBinding = function () {
		var e = this.startNode();
		return (
			this.next(),
			this.options.ecmaVersion === 6 &&
				this.type !== c.name &&
				this.unexpected(),
			(e.argument = this.parseBindingAtom()),
			this.finishNode(e, "RestElement")
		);
	};
	le.parseBindingAtom = function () {
		if (this.options.ecmaVersion >= 6)
			switch (this.type) {
				case c.bracketL:
					var e = this.startNode();
					return (
						this.next(),
						(e.elements = this.parseBindingList(
							c.bracketR,
							!0,
							!0,
						)),
						this.finishNode(e, "ArrayPattern")
					);
				case c.braceL:
					return this.parseObj(!0);
			}
		return this.parseIdent();
	};
	le.parseBindingList = function (e, t, i, r) {
		for (var s = [], a = !0; !this.eat(e); )
			if (
				(a ? (a = !1) : this.expect(c.comma),
				t && this.type === c.comma)
			)
				s.push(null);
			else {
				if (i && this.afterTrailingComma(e)) break;
				if (this.type === c.ellipsis) {
					var n = this.parseRestBinding();
					this.parseBindingListItem(n),
						s.push(n),
						this.type === c.comma &&
							this.raiseRecoverable(
								this.start,
								"Comma is not permitted after the rest element",
							),
						this.expect(e);
					break;
				} else s.push(this.parseAssignableListItem(r));
			}
		return s;
	};
	le.parseAssignableListItem = function (e) {
		var t = this.parseMaybeDefault(this.start, this.startLoc);
		return this.parseBindingListItem(t), t;
	};
	le.parseBindingListItem = function (e) {
		return e;
	};
	le.parseMaybeDefault = function (e, t, i) {
		if (
			((i = i || this.parseBindingAtom()),
			this.options.ecmaVersion < 6 || !this.eat(c.eq))
		)
			return i;
		var r = this.startNodeAt(e, t);
		return (
			(r.left = i),
			(r.right = this.parseMaybeAssign()),
			this.finishNode(r, "AssignmentPattern")
		);
	};
	le.checkLValSimple = function (e, t, i) {
		t === void 0 && (t = nt);
		var r = t !== nt;
		switch (e.type) {
			case "Identifier":
				this.strict &&
					this.reservedWordsStrictBind.test(e.name) &&
					this.raiseRecoverable(
						e.start,
						(r ? "Binding " : "Assigning to ") +
							e.name +
							" in strict mode",
					),
					r &&
						(t === ye &&
							e.name === "let" &&
							this.raiseRecoverable(
								e.start,
								"let is disallowed as a lexically bound name",
							),
						i &&
							(je(i, e.name) &&
								this.raiseRecoverable(
									e.start,
									"Argument name clash",
								),
							(i[e.name] = !0)),
						t !== _r && this.declareName(e.name, t, e.start));
				break;
			case "ChainExpression":
				this.raiseRecoverable(
					e.start,
					"Optional chaining cannot appear in left-hand side",
				);
				break;
			case "MemberExpression":
				r &&
					this.raiseRecoverable(e.start, "Binding member expression");
				break;
			case "ParenthesizedExpression":
				return (
					r &&
						this.raiseRecoverable(
							e.start,
							"Binding parenthesized expression",
						),
					this.checkLValSimple(e.expression, t, i)
				);
			default:
				this.raise(
					e.start,
					(r ? "Binding" : "Assigning to") + " rvalue",
				);
		}
	};
	le.checkLValPattern = function (e, t, i) {
		switch ((t === void 0 && (t = nt), e.type)) {
			case "ObjectPattern":
				for (var r = 0, s = e.properties; r < s.length; r += 1) {
					var a = s[r];
					this.checkLValInnerPattern(a, t, i);
				}
				break;
			case "ArrayPattern":
				for (var n = 0, o = e.elements; n < o.length; n += 1) {
					var u = o[n];
					u && this.checkLValInnerPattern(u, t, i);
				}
				break;
			default:
				this.checkLValSimple(e, t, i);
		}
	};
	le.checkLValInnerPattern = function (e, t, i) {
		switch ((t === void 0 && (t = nt), e.type)) {
			case "Property":
				this.checkLValInnerPattern(e.value, t, i);
				break;
			case "AssignmentPattern":
				this.checkLValPattern(e.left, t, i);
				break;
			case "RestElement":
				this.checkLValPattern(e.argument, t, i);
				break;
			default:
				this.checkLValPattern(e, t, i);
		}
	};
	var he = function (t, i, r, s, a) {
			(this.token = t),
				(this.isExpr = !!i),
				(this.preserveSpace = !!r),
				(this.override = s),
				(this.generator = !!a);
		},
		W = {
			b_stat: new he("{", !1),
			b_expr: new he("{", !0),
			b_tmpl: new he("${", !1),
			p_stat: new he("(", !1),
			p_expr: new he("(", !0),
			q_tmpl: new he("`", !0, !0, function (e) {
				return e.tryReadTemplateToken();
			}),
			f_stat: new he("function", !1),
			f_expr: new he("function", !0),
			f_expr_gen: new he("function", !0, !1, null, !0),
			f_gen: new he("function", !1, !1, null, !0),
		},
		Le = q.prototype;
	Le.initialContext = function () {
		return [W.b_stat];
	};
	Le.curContext = function () {
		return this.context[this.context.length - 1];
	};
	Le.braceIsBlock = function (e) {
		var t = this.curContext();
		return t === W.f_expr || t === W.f_stat
			? !0
			: e === c.colon && (t === W.b_stat || t === W.b_expr)
				? !t.isExpr
				: e === c._return || (e === c.name && this.exprAllowed)
					? ue.test(this.input.slice(this.lastTokEnd, this.start))
					: e === c._else ||
						  e === c.semi ||
						  e === c.eof ||
						  e === c.parenR ||
						  e === c.arrow
						? !0
						: e === c.braceL
							? t === W.b_stat
							: e === c._var || e === c._const || e === c.name
								? !1
								: !this.exprAllowed;
	};
	Le.inGeneratorContext = function () {
		for (var e = this.context.length - 1; e >= 1; e--) {
			var t = this.context[e];
			if (t.token === "function") return t.generator;
		}
		return !1;
	};
	Le.updateContext = function (e) {
		var t,
			i = this.type;
		i.keyword && e === c.dot
			? (this.exprAllowed = !1)
			: (t = i.updateContext)
				? t.call(this, e)
				: (this.exprAllowed = i.beforeExpr);
	};
	Le.overrideContext = function (e) {
		this.curContext() !== e && (this.context[this.context.length - 1] = e);
	};
	c.parenR.updateContext = c.braceR.updateContext = function () {
		if (this.context.length === 1) {
			this.exprAllowed = !0;
			return;
		}
		var e = this.context.pop();
		e === W.b_stat &&
			this.curContext().token === "function" &&
			(e = this.context.pop()),
			(this.exprAllowed = !e.isExpr);
	};
	c.braceL.updateContext = function (e) {
		this.context.push(this.braceIsBlock(e) ? W.b_stat : W.b_expr),
			(this.exprAllowed = !0);
	};
	c.dollarBraceL.updateContext = function () {
		this.context.push(W.b_tmpl), (this.exprAllowed = !0);
	};
	c.parenL.updateContext = function (e) {
		var t = e === c._if || e === c._for || e === c._with || e === c._while;
		this.context.push(t ? W.p_stat : W.p_expr), (this.exprAllowed = !0);
	};
	c.incDec.updateContext = function () {};
	c._function.updateContext = c._class.updateContext = function (e) {
		e.beforeExpr &&
		e !== c._else &&
		!(e === c.semi && this.curContext() !== W.p_stat) &&
		!(
			e === c._return &&
			ue.test(this.input.slice(this.lastTokEnd, this.start))
		) &&
		!((e === c.colon || e === c.braceL) && this.curContext() === W.b_stat)
			? this.context.push(W.f_expr)
			: this.context.push(W.f_stat),
			(this.exprAllowed = !1);
	};
	c.colon.updateContext = function () {
		this.curContext().token === "function" && this.context.pop(),
			(this.exprAllowed = !0);
	};
	c.backQuote.updateContext = function () {
		this.curContext() === W.q_tmpl
			? this.context.pop()
			: this.context.push(W.q_tmpl),
			(this.exprAllowed = !1);
	};
	c.star.updateContext = function (e) {
		if (e === c._function) {
			var t = this.context.length - 1;
			this.context[t] === W.f_expr
				? (this.context[t] = W.f_expr_gen)
				: (this.context[t] = W.f_gen);
		}
		this.exprAllowed = !0;
	};
	c.name.updateContext = function (e) {
		var t = !1;
		this.options.ecmaVersion >= 6 &&
			e !== c.dot &&
			((this.value === "of" && !this.exprAllowed) ||
				(this.value === "yield" && this.inGeneratorContext())) &&
			(t = !0),
			(this.exprAllowed = t);
	};
	var B = q.prototype;
	B.checkPropClash = function (e, t, i) {
		if (
			!(this.options.ecmaVersion >= 9 && e.type === "SpreadElement") &&
			!(
				this.options.ecmaVersion >= 6 &&
				(e.computed || e.method || e.shorthand)
			)
		) {
			var r = e.key,
				s;
			switch (r.type) {
				case "Identifier":
					s = r.name;
					break;
				case "Literal":
					s = String(r.value);
					break;
				default:
					return;
			}
			var a = e.kind;
			if (this.options.ecmaVersion >= 6) {
				s === "__proto__" &&
					a === "init" &&
					(t.proto &&
						(i
							? i.doubleProto < 0 && (i.doubleProto = r.start)
							: this.raiseRecoverable(
									r.start,
									"Redefinition of __proto__ property",
								)),
					(t.proto = !0));
				return;
			}
			s = "$" + s;
			var n = t[s];
			if (n) {
				var o;
				a === "init"
					? (o = (this.strict && n.init) || n.get || n.set)
					: (o = n.init || n[a]),
					o &&
						this.raiseRecoverable(
							r.start,
							"Redefinition of property",
						);
			} else n = t[s] = { init: !1, get: !1, set: !1 };
			n[a] = !0;
		}
	};
	B.parseExpression = function (e, t) {
		var i = this.start,
			r = this.startLoc,
			s = this.parseMaybeAssign(e, t);
		if (this.type === c.comma) {
			var a = this.startNodeAt(i, r);
			for (a.expressions = [s]; this.eat(c.comma); )
				a.expressions.push(this.parseMaybeAssign(e, t));
			return this.finishNode(a, "SequenceExpression");
		}
		return s;
	};
	B.parseMaybeAssign = function (e, t, i) {
		if (this.isContextual("yield")) {
			if (this.inGenerator) return this.parseYield(e);
			this.exprAllowed = !1;
		}
		var r = !1,
			s = -1,
			a = -1,
			n = -1;
		t
			? ((s = t.parenthesizedAssign),
				(a = t.trailingComma),
				(n = t.doubleProto),
				(t.parenthesizedAssign = t.trailingComma = -1))
			: ((t = new lt()), (r = !0));
		var o = this.start,
			u = this.startLoc;
		(this.type === c.parenL || this.type === c.name) &&
			((this.potentialArrowAt = this.start),
			(this.potentialArrowInForAwait = e === "await"));
		var h = this.parseMaybeConditional(e, t);
		if ((i && (h = i.call(this, h, o, u)), this.type.isAssign)) {
			var f = this.startNodeAt(o, u);
			return (
				(f.operator = this.value),
				this.type === c.eq && (h = this.toAssignable(h, !1, t)),
				r ||
					(t.parenthesizedAssign =
						t.trailingComma =
						t.doubleProto =
							-1),
				t.shorthandAssign >= h.start && (t.shorthandAssign = -1),
				this.type === c.eq
					? this.checkLValPattern(h)
					: this.checkLValSimple(h),
				(f.left = h),
				this.next(),
				(f.right = this.parseMaybeAssign(e)),
				n > -1 && (t.doubleProto = n),
				this.finishNode(f, "AssignmentExpression")
			);
		} else r && this.checkExpressionErrors(t, !0);
		return (
			s > -1 && (t.parenthesizedAssign = s),
			a > -1 && (t.trailingComma = a),
			h
		);
	};
	B.parseMaybeConditional = function (e, t) {
		var i = this.start,
			r = this.startLoc,
			s = this.parseExprOps(e, t);
		if (this.checkExpressionErrors(t)) return s;
		if (this.eat(c.question)) {
			var a = this.startNodeAt(i, r);
			return (
				(a.test = s),
				(a.consequent = this.parseMaybeAssign()),
				this.expect(c.colon),
				(a.alternate = this.parseMaybeAssign(e)),
				this.finishNode(a, "ConditionalExpression")
			);
		}
		return s;
	};
	B.parseExprOps = function (e, t) {
		var i = this.start,
			r = this.startLoc,
			s = this.parseMaybeUnary(t, !1, !1, e);
		return this.checkExpressionErrors(t) ||
			(s.start === i && s.type === "ArrowFunctionExpression")
			? s
			: this.parseExprOp(s, i, r, -1, e);
	};
	B.parseExprOp = function (e, t, i, r, s) {
		var a = this.type.binop;
		if (a != null && (!s || this.type !== c._in) && a > r) {
			var n = this.type === c.logicalOR || this.type === c.logicalAND,
				o = this.type === c.coalesce;
			o && (a = c.logicalAND.binop);
			var u = this.value;
			this.next();
			var h = this.start,
				f = this.startLoc,
				p = this.parseExprOp(
					this.parseMaybeUnary(null, !1, !1, s),
					h,
					f,
					a,
					s,
				),
				g = this.buildBinary(t, i, e, p, u, n || o);
			return (
				((n && this.type === c.coalesce) ||
					(o &&
						(this.type === c.logicalOR ||
							this.type === c.logicalAND))) &&
					this.raiseRecoverable(
						this.start,
						"Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses",
					),
				this.parseExprOp(g, t, i, r, s)
			);
		}
		return e;
	};
	B.buildBinary = function (e, t, i, r, s, a) {
		r.type === "PrivateIdentifier" &&
			this.raise(
				r.start,
				"Private identifier can only be left side of binary expression",
			);
		var n = this.startNodeAt(e, t);
		return (
			(n.left = i),
			(n.operator = s),
			(n.right = r),
			this.finishNode(n, a ? "LogicalExpression" : "BinaryExpression")
		);
	};
	B.parseMaybeUnary = function (e, t, i, r) {
		var s = this.start,
			a = this.startLoc,
			n;
		if (this.isContextual("await") && this.canAwait)
			(n = this.parseAwait(r)), (t = !0);
		else if (this.type.prefix) {
			var o = this.startNode(),
				u = this.type === c.incDec;
			(o.operator = this.value),
				(o.prefix = !0),
				this.next(),
				(o.argument = this.parseMaybeUnary(null, !0, u, r)),
				this.checkExpressionErrors(e, !0),
				u
					? this.checkLValSimple(o.argument)
					: this.strict &&
						  o.operator === "delete" &&
						  o.argument.type === "Identifier"
						? this.raiseRecoverable(
								o.start,
								"Deleting local variable in strict mode",
							)
						: o.operator === "delete" && kr(o.argument)
							? this.raiseRecoverable(
									o.start,
									"Private fields can not be deleted",
								)
							: (t = !0),
				(n = this.finishNode(
					o,
					u ? "UpdateExpression" : "UnaryExpression",
				));
		} else if (!t && this.type === c.privateId)
			(r || this.privateNameStack.length === 0) &&
				this.options.checkPrivateFields &&
				this.unexpected(),
				(n = this.parsePrivateIdent()),
				this.type !== c._in && this.unexpected();
		else {
			if (
				((n = this.parseExprSubscripts(e, r)),
				this.checkExpressionErrors(e))
			)
				return n;
			for (; this.type.postfix && !this.canInsertSemicolon(); ) {
				var h = this.startNodeAt(s, a);
				(h.operator = this.value),
					(h.prefix = !1),
					(h.argument = n),
					this.checkLValSimple(n),
					this.next(),
					(n = this.finishNode(h, "UpdateExpression"));
			}
		}
		if (!i && this.eat(c.starstar))
			if (t) this.unexpected(this.lastTokStart);
			else
				return this.buildBinary(
					s,
					a,
					n,
					this.parseMaybeUnary(null, !1, !1, r),
					"**",
					!1,
				);
		else return n;
	};
	function kr(e) {
		return (
			(e.type === "MemberExpression" &&
				e.property.type === "PrivateIdentifier") ||
			(e.type === "ChainExpression" && kr(e.expression))
		);
	}
	B.parseExprSubscripts = function (e, t) {
		var i = this.start,
			r = this.startLoc,
			s = this.parseExprAtom(e, t);
		if (
			s.type === "ArrowFunctionExpression" &&
			this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")"
		)
			return s;
		var a = this.parseSubscripts(s, i, r, !1, t);
		return (
			e &&
				a.type === "MemberExpression" &&
				(e.parenthesizedAssign >= a.start &&
					(e.parenthesizedAssign = -1),
				e.parenthesizedBind >= a.start && (e.parenthesizedBind = -1),
				e.trailingComma >= a.start && (e.trailingComma = -1)),
			a
		);
	};
	B.parseSubscripts = function (e, t, i, r, s) {
		for (
			var a =
					this.options.ecmaVersion >= 8 &&
					e.type === "Identifier" &&
					e.name === "async" &&
					this.lastTokEnd === e.end &&
					!this.canInsertSemicolon() &&
					e.end - e.start === 5 &&
					this.potentialArrowAt === e.start,
				n = !1;
			;

		) {
			var o = this.parseSubscript(e, t, i, r, a, n, s);
			if (
				(o.optional && (n = !0),
				o === e || o.type === "ArrowFunctionExpression")
			) {
				if (n) {
					var u = this.startNodeAt(t, i);
					(u.expression = o),
						(o = this.finishNode(u, "ChainExpression"));
				}
				return o;
			}
			e = o;
		}
	};
	B.shouldParseAsyncArrow = function () {
		return !this.canInsertSemicolon() && this.eat(c.arrow);
	};
	B.parseSubscriptAsyncArrow = function (e, t, i, r) {
		return this.parseArrowExpression(this.startNodeAt(e, t), i, !0, r);
	};
	B.parseSubscript = function (e, t, i, r, s, a, n) {
		var o = this.options.ecmaVersion >= 11,
			u = o && this.eat(c.questionDot);
		r &&
			u &&
			this.raise(
				this.lastTokStart,
				"Optional chaining cannot appear in the callee of new expressions",
			);
		var h = this.eat(c.bracketL);
		if (
			h ||
			(u && this.type !== c.parenL && this.type !== c.backQuote) ||
			this.eat(c.dot)
		) {
			var f = this.startNodeAt(t, i);
			(f.object = e),
				h
					? ((f.property = this.parseExpression()),
						this.expect(c.bracketR))
					: this.type === c.privateId && e.type !== "Super"
						? (f.property = this.parsePrivateIdent())
						: (f.property = this.parseIdent(
								this.options.allowReserved !== "never",
							)),
				(f.computed = !!h),
				o && (f.optional = u),
				(e = this.finishNode(f, "MemberExpression"));
		} else if (!r && this.eat(c.parenL)) {
			var p = new lt(),
				g = this.yieldPos,
				y = this.awaitPos,
				m = this.awaitIdentPos;
			(this.yieldPos = 0), (this.awaitPos = 0), (this.awaitIdentPos = 0);
			var T = this.parseExprList(
				c.parenR,
				this.options.ecmaVersion >= 8,
				!1,
				p,
			);
			if (s && !u && this.shouldParseAsyncArrow())
				return (
					this.checkPatternErrors(p, !1),
					this.checkYieldAwaitInDefaultParams(),
					this.awaitIdentPos > 0 &&
						this.raise(
							this.awaitIdentPos,
							"Cannot use 'await' as identifier inside an async function",
						),
					(this.yieldPos = g),
					(this.awaitPos = y),
					(this.awaitIdentPos = m),
					this.parseSubscriptAsyncArrow(t, i, T, n)
				);
			this.checkExpressionErrors(p, !0),
				(this.yieldPos = g || this.yieldPos),
				(this.awaitPos = y || this.awaitPos),
				(this.awaitIdentPos = m || this.awaitIdentPos);
			var I = this.startNodeAt(t, i);
			(I.callee = e),
				(I.arguments = T),
				o && (I.optional = u),
				(e = this.finishNode(I, "CallExpression"));
		} else if (this.type === c.backQuote) {
			(u || a) &&
				this.raise(
					this.start,
					"Optional chaining cannot appear in the tag of tagged template expressions",
				);
			var l = this.startNodeAt(t, i);
			(l.tag = e),
				(l.quasi = this.parseTemplate({ isTagged: !0 })),
				(e = this.finishNode(l, "TaggedTemplateExpression"));
		}
		return e;
	};
	B.parseExprAtom = function (e, t, i) {
		this.type === c.slash && this.readRegexp();
		var r,
			s = this.potentialArrowAt === this.start;
		switch (this.type) {
			case c._super:
				return (
					this.allowSuper ||
						this.raise(
							this.start,
							"'super' keyword outside a method",
						),
					(r = this.startNode()),
					this.next(),
					this.type === c.parenL &&
						!this.allowDirectSuper &&
						this.raise(
							r.start,
							"super() call outside constructor of a subclass",
						),
					this.type !== c.dot &&
						this.type !== c.bracketL &&
						this.type !== c.parenL &&
						this.unexpected(),
					this.finishNode(r, "Super")
				);
			case c._this:
				return (
					(r = this.startNode()),
					this.next(),
					this.finishNode(r, "ThisExpression")
				);
			case c.name:
				var a = this.start,
					n = this.startLoc,
					o = this.containsEsc,
					u = this.parseIdent(!1);
				if (
					this.options.ecmaVersion >= 8 &&
					!o &&
					u.name === "async" &&
					!this.canInsertSemicolon() &&
					this.eat(c._function)
				)
					return (
						this.overrideContext(W.f_expr),
						this.parseFunction(this.startNodeAt(a, n), 0, !1, !0, t)
					);
				if (s && !this.canInsertSemicolon()) {
					if (this.eat(c.arrow))
						return this.parseArrowExpression(
							this.startNodeAt(a, n),
							[u],
							!1,
							t,
						);
					if (
						this.options.ecmaVersion >= 8 &&
						u.name === "async" &&
						this.type === c.name &&
						!o &&
						(!this.potentialArrowInForAwait ||
							this.value !== "of" ||
							this.containsEsc)
					)
						return (
							(u = this.parseIdent(!1)),
							(this.canInsertSemicolon() || !this.eat(c.arrow)) &&
								this.unexpected(),
							this.parseArrowExpression(
								this.startNodeAt(a, n),
								[u],
								!0,
								t,
							)
						);
				}
				return u;
			case c.regexp:
				var h = this.value;
				return (
					(r = this.parseLiteral(h.value)),
					(r.regex = { pattern: h.pattern, flags: h.flags }),
					r
				);
			case c.num:
			case c.string:
				return this.parseLiteral(this.value);
			case c._null:
			case c._true:
			case c._false:
				return (
					(r = this.startNode()),
					(r.value =
						this.type === c._null ? null : this.type === c._true),
					(r.raw = this.type.keyword),
					this.next(),
					this.finishNode(r, "Literal")
				);
			case c.parenL:
				var f = this.start,
					p = this.parseParenAndDistinguishExpression(s, t);
				return (
					e &&
						(e.parenthesizedAssign < 0 &&
							!this.isSimpleAssignTarget(p) &&
							(e.parenthesizedAssign = f),
						e.parenthesizedBind < 0 && (e.parenthesizedBind = f)),
					p
				);
			case c.bracketL:
				return (
					(r = this.startNode()),
					this.next(),
					(r.elements = this.parseExprList(c.bracketR, !0, !0, e)),
					this.finishNode(r, "ArrayExpression")
				);
			case c.braceL:
				return this.overrideContext(W.b_expr), this.parseObj(!1, e);
			case c._function:
				return (
					(r = this.startNode()),
					this.next(),
					this.parseFunction(r, 0)
				);
			case c._class:
				return this.parseClass(this.startNode(), !1);
			case c._new:
				return this.parseNew();
			case c.backQuote:
				return this.parseTemplate();
			case c._import:
				return this.options.ecmaVersion >= 11
					? this.parseExprImport(i)
					: this.unexpected();
			default:
				return this.parseExprAtomDefault();
		}
	};
	B.parseExprAtomDefault = function () {
		this.unexpected();
	};
	B.parseExprImport = function (e) {
		var t = this.startNode();
		if (
			(this.containsEsc &&
				this.raiseRecoverable(
					this.start,
					"Escape sequence in keyword import",
				),
			this.next(),
			this.type === c.parenL && !e)
		)
			return this.parseDynamicImport(t);
		if (this.type === c.dot) {
			var i = this.startNodeAt(t.start, t.loc && t.loc.start);
			return (
				(i.name = "import"),
				(t.meta = this.finishNode(i, "Identifier")),
				this.parseImportMeta(t)
			);
		} else this.unexpected();
	};
	B.parseDynamicImport = function (e) {
		if (
			(this.next(),
			(e.source = this.parseMaybeAssign()),
			!this.eat(c.parenR))
		) {
			var t = this.start;
			this.eat(c.comma) && this.eat(c.parenR)
				? this.raiseRecoverable(
						t,
						"Trailing comma is not allowed in import()",
					)
				: this.unexpected(t);
		}
		return this.finishNode(e, "ImportExpression");
	};
	B.parseImportMeta = function (e) {
		this.next();
		var t = this.containsEsc;
		return (
			(e.property = this.parseIdent(!0)),
			e.property.name !== "meta" &&
				this.raiseRecoverable(
					e.property.start,
					"The only valid meta property for import is 'import.meta'",
				),
			t &&
				this.raiseRecoverable(
					e.start,
					"'import.meta' must not contain escaped characters",
				),
			this.options.sourceType !== "module" &&
				!this.options.allowImportExportEverywhere &&
				this.raiseRecoverable(
					e.start,
					"Cannot use 'import.meta' outside a module",
				),
			this.finishNode(e, "MetaProperty")
		);
	};
	B.parseLiteral = function (e) {
		var t = this.startNode();
		return (
			(t.value = e),
			(t.raw = this.input.slice(this.start, this.end)),
			t.raw.charCodeAt(t.raw.length - 1) === 110 &&
				(t.bigint = t.raw.slice(0, -1).replace(/_/g, "")),
			this.next(),
			this.finishNode(t, "Literal")
		);
	};
	B.parseParenExpression = function () {
		this.expect(c.parenL);
		var e = this.parseExpression();
		return this.expect(c.parenR), e;
	};
	B.shouldParseArrow = function (e) {
		return !this.canInsertSemicolon();
	};
	B.parseParenAndDistinguishExpression = function (e, t) {
		var i = this.start,
			r = this.startLoc,
			s,
			a = this.options.ecmaVersion >= 8;
		if (this.options.ecmaVersion >= 6) {
			this.next();
			var n = this.start,
				o = this.startLoc,
				u = [],
				h = !0,
				f = !1,
				p = new lt(),
				g = this.yieldPos,
				y = this.awaitPos,
				m;
			for (this.yieldPos = 0, this.awaitPos = 0; this.type !== c.parenR; )
				if (
					(h ? (h = !1) : this.expect(c.comma),
					a && this.afterTrailingComma(c.parenR, !0))
				) {
					f = !0;
					break;
				} else if (this.type === c.ellipsis) {
					(m = this.start),
						u.push(this.parseParenItem(this.parseRestBinding())),
						this.type === c.comma &&
							this.raiseRecoverable(
								this.start,
								"Comma is not permitted after the rest element",
							);
					break;
				} else
					u.push(this.parseMaybeAssign(!1, p, this.parseParenItem));
			var T = this.lastTokEnd,
				I = this.lastTokEndLoc;
			if (
				(this.expect(c.parenR),
				e && this.shouldParseArrow(u) && this.eat(c.arrow))
			)
				return (
					this.checkPatternErrors(p, !1),
					this.checkYieldAwaitInDefaultParams(),
					(this.yieldPos = g),
					(this.awaitPos = y),
					this.parseParenArrowList(i, r, u, t)
				);
			(!u.length || f) && this.unexpected(this.lastTokStart),
				m && this.unexpected(m),
				this.checkExpressionErrors(p, !0),
				(this.yieldPos = g || this.yieldPos),
				(this.awaitPos = y || this.awaitPos),
				u.length > 1
					? ((s = this.startNodeAt(n, o)),
						(s.expressions = u),
						this.finishNodeAt(s, "SequenceExpression", T, I))
					: (s = u[0]);
		} else s = this.parseParenExpression();
		if (this.options.preserveParens) {
			var l = this.startNodeAt(i, r);
			return (
				(l.expression = s),
				this.finishNode(l, "ParenthesizedExpression")
			);
		} else return s;
	};
	B.parseParenItem = function (e) {
		return e;
	};
	B.parseParenArrowList = function (e, t, i, r) {
		return this.parseArrowExpression(this.startNodeAt(e, t), i, !1, r);
	};
	var Ra = [];
	B.parseNew = function () {
		this.containsEsc &&
			this.raiseRecoverable(this.start, "Escape sequence in keyword new");
		var e = this.startNode();
		if (
			(this.next(), this.options.ecmaVersion >= 6 && this.type === c.dot)
		) {
			var t = this.startNodeAt(e.start, e.loc && e.loc.start);
			(t.name = "new"),
				(e.meta = this.finishNode(t, "Identifier")),
				this.next();
			var i = this.containsEsc;
			return (
				(e.property = this.parseIdent(!0)),
				e.property.name !== "target" &&
					this.raiseRecoverable(
						e.property.start,
						"The only valid meta property for new is 'new.target'",
					),
				i &&
					this.raiseRecoverable(
						e.start,
						"'new.target' must not contain escaped characters",
					),
				this.allowNewDotTarget ||
					this.raiseRecoverable(
						e.start,
						"'new.target' can only be used in functions and class static block",
					),
				this.finishNode(e, "MetaProperty")
			);
		}
		var r = this.start,
			s = this.startLoc;
		return (
			(e.callee = this.parseSubscripts(
				this.parseExprAtom(null, !1, !0),
				r,
				s,
				!0,
				!1,
			)),
			this.eat(c.parenL)
				? (e.arguments = this.parseExprList(
						c.parenR,
						this.options.ecmaVersion >= 8,
						!1,
					))
				: (e.arguments = Ra),
			this.finishNode(e, "NewExpression")
		);
	};
	B.parseTemplateElement = function (e) {
		var t = e.isTagged,
			i = this.startNode();
		return (
			this.type === c.invalidTemplate
				? (t ||
						this.raiseRecoverable(
							this.start,
							"Bad escape sequence in untagged template literal",
						),
					(i.value = { raw: this.value, cooked: null }))
				: (i.value = {
						raw: this.input.slice(this.start, this.end).replace(
							/\r\n?/g,
							`
`,
						),
						cooked: this.value,
					}),
			this.next(),
			(i.tail = this.type === c.backQuote),
			this.finishNode(i, "TemplateElement")
		);
	};
	B.parseTemplate = function (e) {
		e === void 0 && (e = {});
		var t = e.isTagged;
		t === void 0 && (t = !1);
		var i = this.startNode();
		this.next(), (i.expressions = []);
		var r = this.parseTemplateElement({ isTagged: t });
		for (i.quasis = [r]; !r.tail; )
			this.type === c.eof &&
				this.raise(this.pos, "Unterminated template literal"),
				this.expect(c.dollarBraceL),
				i.expressions.push(this.parseExpression()),
				this.expect(c.braceR),
				i.quasis.push((r = this.parseTemplateElement({ isTagged: t })));
		return this.next(), this.finishNode(i, "TemplateLiteral");
	};
	B.isAsyncProp = function (e) {
		return (
			!e.computed &&
			e.key.type === "Identifier" &&
			e.key.name === "async" &&
			(this.type === c.name ||
				this.type === c.num ||
				this.type === c.string ||
				this.type === c.bracketL ||
				this.type.keyword ||
				(this.options.ecmaVersion >= 9 && this.type === c.star)) &&
			!ue.test(this.input.slice(this.lastTokEnd, this.start))
		);
	};
	B.parseObj = function (e, t) {
		var i = this.startNode(),
			r = !0,
			s = {};
		for (i.properties = [], this.next(); !this.eat(c.braceR); ) {
			if (r) r = !1;
			else if (
				(this.expect(c.comma),
				this.options.ecmaVersion >= 5 &&
					this.afterTrailingComma(c.braceR))
			)
				break;
			var a = this.parseProperty(e, t);
			e || this.checkPropClash(a, s, t), i.properties.push(a);
		}
		return this.finishNode(i, e ? "ObjectPattern" : "ObjectExpression");
	};
	B.parseProperty = function (e, t) {
		var i = this.startNode(),
			r,
			s,
			a,
			n;
		if (this.options.ecmaVersion >= 9 && this.eat(c.ellipsis))
			return e
				? ((i.argument = this.parseIdent(!1)),
					this.type === c.comma &&
						this.raiseRecoverable(
							this.start,
							"Comma is not permitted after the rest element",
						),
					this.finishNode(i, "RestElement"))
				: ((i.argument = this.parseMaybeAssign(!1, t)),
					this.type === c.comma &&
						t &&
						t.trailingComma < 0 &&
						(t.trailingComma = this.start),
					this.finishNode(i, "SpreadElement"));
		this.options.ecmaVersion >= 6 &&
			((i.method = !1),
			(i.shorthand = !1),
			(e || t) && ((a = this.start), (n = this.startLoc)),
			e || (r = this.eat(c.star)));
		var o = this.containsEsc;
		return (
			this.parsePropertyName(i),
			!e &&
			!o &&
			this.options.ecmaVersion >= 8 &&
			!r &&
			this.isAsyncProp(i)
				? ((s = !0),
					(r = this.options.ecmaVersion >= 9 && this.eat(c.star)),
					this.parsePropertyName(i))
				: (s = !1),
			this.parsePropertyValue(i, e, r, s, a, n, t, o),
			this.finishNode(i, "Property")
		);
	};
	B.parseGetterSetter = function (e) {
		(e.kind = e.key.name),
			this.parsePropertyName(e),
			(e.value = this.parseMethod(!1));
		var t = e.kind === "get" ? 0 : 1;
		if (e.value.params.length !== t) {
			var i = e.value.start;
			e.kind === "get"
				? this.raiseRecoverable(i, "getter should have no params")
				: this.raiseRecoverable(
						i,
						"setter should have exactly one param",
					);
		} else
			e.kind === "set" &&
				e.value.params[0].type === "RestElement" &&
				this.raiseRecoverable(
					e.value.params[0].start,
					"Setter cannot use rest params",
				);
	};
	B.parsePropertyValue = function (e, t, i, r, s, a, n, o) {
		(i || r) && this.type === c.colon && this.unexpected(),
			this.eat(c.colon)
				? ((e.value = t
						? this.parseMaybeDefault(this.start, this.startLoc)
						: this.parseMaybeAssign(!1, n)),
					(e.kind = "init"))
				: this.options.ecmaVersion >= 6 && this.type === c.parenL
					? (t && this.unexpected(),
						(e.kind = "init"),
						(e.method = !0),
						(e.value = this.parseMethod(i, r)))
					: !t &&
						  !o &&
						  this.options.ecmaVersion >= 5 &&
						  !e.computed &&
						  e.key.type === "Identifier" &&
						  (e.key.name === "get" || e.key.name === "set") &&
						  this.type !== c.comma &&
						  this.type !== c.braceR &&
						  this.type !== c.eq
						? ((i || r) && this.unexpected(),
							this.parseGetterSetter(e))
						: this.options.ecmaVersion >= 6 &&
							  !e.computed &&
							  e.key.type === "Identifier"
							? ((i || r) && this.unexpected(),
								this.checkUnreserved(e.key),
								e.key.name === "await" &&
									!this.awaitIdentPos &&
									(this.awaitIdentPos = s),
								(e.kind = "init"),
								t
									? (e.value = this.parseMaybeDefault(
											s,
											a,
											this.copyNode(e.key),
										))
									: this.type === c.eq && n
										? (n.shorthandAssign < 0 &&
												(n.shorthandAssign =
													this.start),
											(e.value = this.parseMaybeDefault(
												s,
												a,
												this.copyNode(e.key),
											)))
										: (e.value = this.copyNode(e.key)),
								(e.shorthand = !0))
							: this.unexpected();
	};
	B.parsePropertyName = function (e) {
		if (this.options.ecmaVersion >= 6) {
			if (this.eat(c.bracketL))
				return (
					(e.computed = !0),
					(e.key = this.parseMaybeAssign()),
					this.expect(c.bracketR),
					e.key
				);
			e.computed = !1;
		}
		return (e.key =
			this.type === c.num || this.type === c.string
				? this.parseExprAtom()
				: this.parseIdent(this.options.allowReserved !== "never"));
	};
	B.initFunction = function (e) {
		(e.id = null),
			this.options.ecmaVersion >= 6 && (e.generator = e.expression = !1),
			this.options.ecmaVersion >= 8 && (e.async = !1);
	};
	B.parseMethod = function (e, t, i) {
		var r = this.startNode(),
			s = this.yieldPos,
			a = this.awaitPos,
			n = this.awaitIdentPos;
		return (
			this.initFunction(r),
			this.options.ecmaVersion >= 6 && (r.generator = e),
			this.options.ecmaVersion >= 8 && (r.async = !!t),
			(this.yieldPos = 0),
			(this.awaitPos = 0),
			(this.awaitIdentPos = 0),
			this.enterScope(qt(t, r.generator) | Wt | (i ? vr : 0)),
			this.expect(c.parenL),
			(r.params = this.parseBindingList(
				c.parenR,
				!1,
				this.options.ecmaVersion >= 8,
			)),
			this.checkYieldAwaitInDefaultParams(),
			this.parseFunctionBody(r, !1, !0, !1),
			(this.yieldPos = s),
			(this.awaitPos = a),
			(this.awaitIdentPos = n),
			this.finishNode(r, "FunctionExpression")
		);
	};
	B.parseArrowExpression = function (e, t, i, r) {
		var s = this.yieldPos,
			a = this.awaitPos,
			n = this.awaitIdentPos;
		return (
			this.enterScope(qt(i, !1) | xr),
			this.initFunction(e),
			this.options.ecmaVersion >= 8 && (e.async = !!i),
			(this.yieldPos = 0),
			(this.awaitPos = 0),
			(this.awaitIdentPos = 0),
			(e.params = this.toAssignableList(t, !0)),
			this.parseFunctionBody(e, !0, !1, r),
			(this.yieldPos = s),
			(this.awaitPos = a),
			(this.awaitIdentPos = n),
			this.finishNode(e, "ArrowFunctionExpression")
		);
	};
	B.parseFunctionBody = function (e, t, i, r) {
		var s = t && this.type !== c.braceL,
			a = this.strict,
			n = !1;
		if (s)
			(e.body = this.parseMaybeAssign(r)),
				(e.expression = !0),
				this.checkParams(e, !1);
		else {
			var o =
				this.options.ecmaVersion >= 7 &&
				!this.isSimpleParamList(e.params);
			(!a || o) &&
				((n = this.strictDirective(this.end)),
				n &&
					o &&
					this.raiseRecoverable(
						e.start,
						"Illegal 'use strict' directive in function with non-simple parameter list",
					));
			var u = this.labels;
			(this.labels = []),
				n && (this.strict = !0),
				this.checkParams(
					e,
					!a && !n && !t && !i && this.isSimpleParamList(e.params),
				),
				this.strict && e.id && this.checkLValSimple(e.id, _r),
				(e.body = this.parseBlock(!1, void 0, n && !a)),
				(e.expression = !1),
				this.adaptDirectivePrologue(e.body.body),
				(this.labels = u);
		}
		this.exitScope();
	};
	B.isSimpleParamList = function (e) {
		for (var t = 0, i = e; t < i.length; t += 1) {
			var r = i[t];
			if (r.type !== "Identifier") return !1;
		}
		return !0;
	};
	B.checkParams = function (e, t) {
		for (
			var i = Object.create(null), r = 0, s = e.params;
			r < s.length;
			r += 1
		) {
			var a = s[r];
			this.checkLValInnerPattern(a, Gt, t ? null : i);
		}
	};
	B.parseExprList = function (e, t, i, r) {
		for (var s = [], a = !0; !this.eat(e); ) {
			if (a) a = !1;
			else if ((this.expect(c.comma), t && this.afterTrailingComma(e)))
				break;
			var n = void 0;
			i && this.type === c.comma
				? (n = null)
				: this.type === c.ellipsis
					? ((n = this.parseSpread(r)),
						r &&
							this.type === c.comma &&
							r.trailingComma < 0 &&
							(r.trailingComma = this.start))
					: (n = this.parseMaybeAssign(!1, r)),
				s.push(n);
		}
		return s;
	};
	B.checkUnreserved = function (e) {
		var t = e.start,
			i = e.end,
			r = e.name;
		if (
			(this.inGenerator &&
				r === "yield" &&
				this.raiseRecoverable(
					t,
					"Cannot use 'yield' as identifier inside a generator",
				),
			this.inAsync &&
				r === "await" &&
				this.raiseRecoverable(
					t,
					"Cannot use 'await' as identifier inside an async function",
				),
			this.currentThisScope().inClassFieldInit &&
				r === "arguments" &&
				this.raiseRecoverable(
					t,
					"Cannot use 'arguments' in class field initializer",
				),
			this.inClassStaticBlock &&
				(r === "arguments" || r === "await") &&
				this.raise(
					t,
					"Cannot use " + r + " in class static initialization block",
				),
			this.keywords.test(r) &&
				this.raise(t, "Unexpected keyword '" + r + "'"),
			!(
				this.options.ecmaVersion < 6 &&
				this.input.slice(t, i).indexOf("\\") !== -1
			))
		) {
			var s = this.strict ? this.reservedWordsStrict : this.reservedWords;
			s.test(r) &&
				(!this.inAsync &&
					r === "await" &&
					this.raiseRecoverable(
						t,
						"Cannot use keyword 'await' outside an async function",
					),
				this.raiseRecoverable(
					t,
					"The keyword '" + r + "' is reserved",
				));
		}
	};
	B.parseIdent = function (e) {
		var t = this.parseIdentNode();
		return (
			this.next(!!e),
			this.finishNode(t, "Identifier"),
			e ||
				(this.checkUnreserved(t),
				t.name === "await" &&
					!this.awaitIdentPos &&
					(this.awaitIdentPos = t.start)),
			t
		);
	};
	B.parseIdentNode = function () {
		var e = this.startNode();
		return (
			this.type === c.name
				? (e.name = this.value)
				: this.type.keyword
					? ((e.name = this.type.keyword),
						(e.name === "class" || e.name === "function") &&
							(this.lastTokEnd !== this.lastTokStart + 1 ||
								this.input.charCodeAt(this.lastTokStart) !==
									46) &&
							this.context.pop(),
						(this.type = c.name))
					: this.unexpected(),
			e
		);
	};
	B.parsePrivateIdent = function () {
		var e = this.startNode();
		return (
			this.type === c.privateId
				? (e.name = this.value)
				: this.unexpected(),
			this.next(),
			this.finishNode(e, "PrivateIdentifier"),
			this.options.checkPrivateFields &&
				(this.privateNameStack.length === 0
					? this.raise(
							e.start,
							"Private field '#" +
								e.name +
								"' must be declared in an enclosing class",
						)
					: this.privateNameStack[
							this.privateNameStack.length - 1
						].used.push(e)),
			e
		);
	};
	B.parseYield = function (e) {
		this.yieldPos || (this.yieldPos = this.start);
		var t = this.startNode();
		return (
			this.next(),
			this.type === c.semi ||
			this.canInsertSemicolon() ||
			(this.type !== c.star && !this.type.startsExpr)
				? ((t.delegate = !1), (t.argument = null))
				: ((t.delegate = this.eat(c.star)),
					(t.argument = this.parseMaybeAssign(e))),
			this.finishNode(t, "YieldExpression")
		);
	};
	B.parseAwait = function (e) {
		this.awaitPos || (this.awaitPos = this.start);
		var t = this.startNode();
		return (
			this.next(),
			(t.argument = this.parseMaybeUnary(null, !0, !1, e)),
			this.finishNode(t, "AwaitExpression")
		);
	};
	var ct = q.prototype;
	ct.raise = function (e, t) {
		var i = mr(this.input, e);
		t += " (" + i.line + ":" + i.column + ")";
		var r = new SyntaxError(t);
		throw ((r.pos = e), (r.loc = i), (r.raisedAt = this.pos), r);
	};
	ct.raiseRecoverable = ct.raise;
	ct.curPosition = function () {
		if (this.options.locations)
			return new Me(this.curLine, this.pos - this.lineStart);
	};
	var Ce = q.prototype,
		Na = function (t) {
			(this.flags = t),
				(this.var = []),
				(this.lexical = []),
				(this.functions = []),
				(this.inClassFieldInit = !1);
		};
	Ce.enterScope = function (e) {
		this.scopeStack.push(new Na(e));
	};
	Ce.exitScope = function () {
		this.scopeStack.pop();
	};
	Ce.treatFunctionsAsVarInScope = function (e) {
		return e.flags & Ne || (!this.inModule && e.flags & Fe);
	};
	Ce.declareName = function (e, t, i) {
		var r = !1;
		if (t === ye) {
			var s = this.currentScope();
			(r =
				s.lexical.indexOf(e) > -1 ||
				s.functions.indexOf(e) > -1 ||
				s.var.indexOf(e) > -1),
				s.lexical.push(e),
				this.inModule &&
					s.flags & Fe &&
					delete this.undefinedExports[e];
		} else if (t === wr) {
			var a = this.currentScope();
			a.lexical.push(e);
		} else if (t === br) {
			var n = this.currentScope();
			this.treatFunctionsAsVar
				? (r = n.lexical.indexOf(e) > -1)
				: (r = n.lexical.indexOf(e) > -1 || n.var.indexOf(e) > -1),
				n.functions.push(e);
		} else
			for (var o = this.scopeStack.length - 1; o >= 0; --o) {
				var u = this.scopeStack[o];
				if (
					(u.lexical.indexOf(e) > -1 &&
						!(u.flags & yr && u.lexical[0] === e)) ||
					(!this.treatFunctionsAsVarInScope(u) &&
						u.functions.indexOf(e) > -1)
				) {
					r = !0;
					break;
				}
				if (
					(u.var.push(e),
					this.inModule &&
						u.flags & Fe &&
						delete this.undefinedExports[e],
					u.flags & zt)
				)
					break;
			}
		r &&
			this.raiseRecoverable(
				i,
				"Identifier '" + e + "' has already been declared",
			);
	};
	Ce.checkLocalExport = function (e) {
		this.scopeStack[0].lexical.indexOf(e.name) === -1 &&
			this.scopeStack[0].var.indexOf(e.name) === -1 &&
			(this.undefinedExports[e.name] = e);
	};
	Ce.currentScope = function () {
		return this.scopeStack[this.scopeStack.length - 1];
	};
	Ce.currentVarScope = function () {
		for (var e = this.scopeStack.length - 1; ; e--) {
			var t = this.scopeStack[e];
			if (t.flags & zt) return t;
		}
	};
	Ce.currentThisScope = function () {
		for (var e = this.scopeStack.length - 1; ; e--) {
			var t = this.scopeStack[e];
			if (t.flags & zt && !(t.flags & xr)) return t;
		}
	};
	var ht = function (t, i, r) {
			(this.type = ""),
				(this.start = i),
				(this.end = 0),
				t.options.locations && (this.loc = new ut(t, r)),
				t.options.directSourceFile &&
					(this.sourceFile = t.options.directSourceFile),
				t.options.ranges && (this.range = [i, 0]);
		},
		He = q.prototype;
	He.startNode = function () {
		return new ht(this, this.start, this.startLoc);
	};
	He.startNodeAt = function (e, t) {
		return new ht(this, e, t);
	};
	function Sr(e, t, i, r) {
		return (
			(e.type = t),
			(e.end = i),
			this.options.locations && (e.loc.end = r),
			this.options.ranges && (e.range[1] = i),
			e
		);
	}
	He.finishNode = function (e, t) {
		return Sr.call(this, e, t, this.lastTokEnd, this.lastTokEndLoc);
	};
	He.finishNodeAt = function (e, t, i, r) {
		return Sr.call(this, e, t, i, r);
	};
	He.copyNode = function (e) {
		var t = new ht(this, e.start, this.startLoc);
		for (var i in e) t[i] = e[i];
		return t;
	};
	var Er =
			"ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS",
		Ar = Er + " Extended_Pictographic",
		Ir = Ar,
		Pr = Ir + " EBase EComp EMod EPres ExtPict",
		Rr = Pr,
		La = Rr,
		Da = { 9: Er, 10: Ar, 11: Ir, 12: Pr, 13: Rr, 14: La },
		Ta =
			"Basic_Emoji Emoji_Keycap_Sequence RGI_Emoji_Modifier_Sequence RGI_Emoji_Flag_Sequence RGI_Emoji_Tag_Sequence RGI_Emoji_ZWJ_Sequence RGI_Emoji",
		Ba = { 9: "", 10: "", 11: "", 12: "", 13: "", 14: Ta },
		cr =
			"Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu",
		Nr =
			"Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb",
		Lr =
			Nr +
			" Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd",
		Dr =
			Lr +
			" Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho",
		Tr =
			Dr +
			" Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi",
		Br =
			Tr +
			" Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith",
		Oa =
			Br +
			" Hrkt Katakana_Or_Hiragana Kawi Nag_Mundari Nagm Unknown Zzzz",
		Va = { 9: Nr, 10: Lr, 11: Dr, 12: Tr, 13: Br, 14: Oa },
		Or = {};
	function Ma(e) {
		var t = (Or[e] = {
			binary: we(Da[e] + " " + cr),
			binaryOfStrings: we(Ba[e]),
			nonBinary: { General_Category: we(cr), Script: we(Va[e]) },
		});
		(t.nonBinary.Script_Extensions = t.nonBinary.Script),
			(t.nonBinary.gc = t.nonBinary.General_Category),
			(t.nonBinary.sc = t.nonBinary.Script),
			(t.nonBinary.scx = t.nonBinary.Script_Extensions);
	}
	for (at = 0, Mt = [9, 10, 11, 12, 13, 14]; at < Mt.length; at += 1)
		(ur = Mt[at]), Ma(ur);
	var ur,
		at,
		Mt,
		A = q.prototype,
		me = function (t) {
			(this.parser = t),
				(this.validFlags =
					"gim" +
					(t.options.ecmaVersion >= 6 ? "uy" : "") +
					(t.options.ecmaVersion >= 9 ? "s" : "") +
					(t.options.ecmaVersion >= 13 ? "d" : "") +
					(t.options.ecmaVersion >= 15 ? "v" : "")),
				(this.unicodeProperties =
					Or[
						t.options.ecmaVersion >= 14 ? 14 : t.options.ecmaVersion
					]),
				(this.source = ""),
				(this.flags = ""),
				(this.start = 0),
				(this.switchU = !1),
				(this.switchV = !1),
				(this.switchN = !1),
				(this.pos = 0),
				(this.lastIntValue = 0),
				(this.lastStringValue = ""),
				(this.lastAssertionIsQuantifiable = !1),
				(this.numCapturingParens = 0),
				(this.maxBackReference = 0),
				(this.groupNames = []),
				(this.backReferenceNames = []);
		};
	me.prototype.reset = function (t, i, r) {
		var s = r.indexOf("v") !== -1,
			a = r.indexOf("u") !== -1;
		(this.start = t | 0),
			(this.source = i + ""),
			(this.flags = r),
			s && this.parser.options.ecmaVersion >= 15
				? ((this.switchU = !0),
					(this.switchV = !0),
					(this.switchN = !0))
				: ((this.switchU = a && this.parser.options.ecmaVersion >= 6),
					(this.switchV = !1),
					(this.switchN = a && this.parser.options.ecmaVersion >= 9));
	};
	me.prototype.raise = function (t) {
		this.parser.raiseRecoverable(
			this.start,
			"Invalid regular expression: /" + this.source + "/: " + t,
		);
	};
	me.prototype.at = function (t, i) {
		i === void 0 && (i = !1);
		var r = this.source,
			s = r.length;
		if (t >= s) return -1;
		var a = r.charCodeAt(t);
		if (!(i || this.switchU) || a <= 55295 || a >= 57344 || t + 1 >= s)
			return a;
		var n = r.charCodeAt(t + 1);
		return n >= 56320 && n <= 57343 ? (a << 10) + n - 56613888 : a;
	};
	me.prototype.nextIndex = function (t, i) {
		i === void 0 && (i = !1);
		var r = this.source,
			s = r.length;
		if (t >= s) return s;
		var a = r.charCodeAt(t),
			n;
		return !(i || this.switchU) ||
			a <= 55295 ||
			a >= 57344 ||
			t + 1 >= s ||
			(n = r.charCodeAt(t + 1)) < 56320 ||
			n > 57343
			? t + 1
			: t + 2;
	};
	me.prototype.current = function (t) {
		return t === void 0 && (t = !1), this.at(this.pos, t);
	};
	me.prototype.lookahead = function (t) {
		return (
			t === void 0 && (t = !1), this.at(this.nextIndex(this.pos, t), t)
		);
	};
	me.prototype.advance = function (t) {
		t === void 0 && (t = !1), (this.pos = this.nextIndex(this.pos, t));
	};
	me.prototype.eat = function (t, i) {
		return (
			i === void 0 && (i = !1),
			this.current(i) === t ? (this.advance(i), !0) : !1
		);
	};
	me.prototype.eatChars = function (t, i) {
		i === void 0 && (i = !1);
		for (var r = this.pos, s = 0, a = t; s < a.length; s += 1) {
			var n = a[s],
				o = this.at(r, i);
			if (o === -1 || o !== n) return !1;
			r = this.nextIndex(r, i);
		}
		return (this.pos = r), !0;
	};
	A.validateRegExpFlags = function (e) {
		for (
			var t = e.validFlags, i = e.flags, r = !1, s = !1, a = 0;
			a < i.length;
			a++
		) {
			var n = i.charAt(a);
			t.indexOf(n) === -1 &&
				this.raise(e.start, "Invalid regular expression flag"),
				i.indexOf(n, a + 1) > -1 &&
					this.raise(e.start, "Duplicate regular expression flag"),
				n === "u" && (r = !0),
				n === "v" && (s = !0);
		}
		this.options.ecmaVersion >= 15 &&
			r &&
			s &&
			this.raise(e.start, "Invalid regular expression flag");
	};
	A.validateRegExpPattern = function (e) {
		this.regexp_pattern(e),
			!e.switchN &&
				this.options.ecmaVersion >= 9 &&
				e.groupNames.length > 0 &&
				((e.switchN = !0), this.regexp_pattern(e));
	};
	A.regexp_pattern = function (e) {
		(e.pos = 0),
			(e.lastIntValue = 0),
			(e.lastStringValue = ""),
			(e.lastAssertionIsQuantifiable = !1),
			(e.numCapturingParens = 0),
			(e.maxBackReference = 0),
			(e.groupNames.length = 0),
			(e.backReferenceNames.length = 0),
			this.regexp_disjunction(e),
			e.pos !== e.source.length &&
				(e.eat(41) && e.raise("Unmatched ')'"),
				(e.eat(93) || e.eat(125)) &&
					e.raise("Lone quantifier brackets")),
			e.maxBackReference > e.numCapturingParens &&
				e.raise("Invalid escape");
		for (var t = 0, i = e.backReferenceNames; t < i.length; t += 1) {
			var r = i[t];
			e.groupNames.indexOf(r) === -1 &&
				e.raise("Invalid named capture referenced");
		}
	};
	A.regexp_disjunction = function (e) {
		for (this.regexp_alternative(e); e.eat(124); )
			this.regexp_alternative(e);
		this.regexp_eatQuantifier(e, !0) && e.raise("Nothing to repeat"),
			e.eat(123) && e.raise("Lone quantifier brackets");
	};
	A.regexp_alternative = function (e) {
		for (; e.pos < e.source.length && this.regexp_eatTerm(e); );
	};
	A.regexp_eatTerm = function (e) {
		return this.regexp_eatAssertion(e)
			? (e.lastAssertionIsQuantifiable &&
					this.regexp_eatQuantifier(e) &&
					e.switchU &&
					e.raise("Invalid quantifier"),
				!0)
			: (
						e.switchU
							? this.regexp_eatAtom(e)
							: this.regexp_eatExtendedAtom(e)
				  )
				? (this.regexp_eatQuantifier(e), !0)
				: !1;
	};
	A.regexp_eatAssertion = function (e) {
		var t = e.pos;
		if (((e.lastAssertionIsQuantifiable = !1), e.eat(94) || e.eat(36)))
			return !0;
		if (e.eat(92)) {
			if (e.eat(66) || e.eat(98)) return !0;
			e.pos = t;
		}
		if (e.eat(40) && e.eat(63)) {
			var i = !1;
			if (
				(this.options.ecmaVersion >= 9 && (i = e.eat(60)),
				e.eat(61) || e.eat(33))
			)
				return (
					this.regexp_disjunction(e),
					e.eat(41) || e.raise("Unterminated group"),
					(e.lastAssertionIsQuantifiable = !i),
					!0
				);
		}
		return (e.pos = t), !1;
	};
	A.regexp_eatQuantifier = function (e, t) {
		return (
			t === void 0 && (t = !1),
			this.regexp_eatQuantifierPrefix(e, t) ? (e.eat(63), !0) : !1
		);
	};
	A.regexp_eatQuantifierPrefix = function (e, t) {
		return (
			e.eat(42) ||
			e.eat(43) ||
			e.eat(63) ||
			this.regexp_eatBracedQuantifier(e, t)
		);
	};
	A.regexp_eatBracedQuantifier = function (e, t) {
		var i = e.pos;
		if (e.eat(123)) {
			var r = 0,
				s = -1;
			if (
				this.regexp_eatDecimalDigits(e) &&
				((r = e.lastIntValue),
				e.eat(44) &&
					this.regexp_eatDecimalDigits(e) &&
					(s = e.lastIntValue),
				e.eat(125))
			)
				return (
					s !== -1 &&
						s < r &&
						!t &&
						e.raise("numbers out of order in {} quantifier"),
					!0
				);
			e.switchU && !t && e.raise("Incomplete quantifier"), (e.pos = i);
		}
		return !1;
	};
	A.regexp_eatAtom = function (e) {
		return (
			this.regexp_eatPatternCharacters(e) ||
			e.eat(46) ||
			this.regexp_eatReverseSolidusAtomEscape(e) ||
			this.regexp_eatCharacterClass(e) ||
			this.regexp_eatUncapturingGroup(e) ||
			this.regexp_eatCapturingGroup(e)
		);
	};
	A.regexp_eatReverseSolidusAtomEscape = function (e) {
		var t = e.pos;
		if (e.eat(92)) {
			if (this.regexp_eatAtomEscape(e)) return !0;
			e.pos = t;
		}
		return !1;
	};
	A.regexp_eatUncapturingGroup = function (e) {
		var t = e.pos;
		if (e.eat(40)) {
			if (e.eat(63) && e.eat(58)) {
				if ((this.regexp_disjunction(e), e.eat(41))) return !0;
				e.raise("Unterminated group");
			}
			e.pos = t;
		}
		return !1;
	};
	A.regexp_eatCapturingGroup = function (e) {
		if (e.eat(40)) {
			if (
				(this.options.ecmaVersion >= 9
					? this.regexp_groupSpecifier(e)
					: e.current() === 63 && e.raise("Invalid group"),
				this.regexp_disjunction(e),
				e.eat(41))
			)
				return (e.numCapturingParens += 1), !0;
			e.raise("Unterminated group");
		}
		return !1;
	};
	A.regexp_eatExtendedAtom = function (e) {
		return (
			e.eat(46) ||
			this.regexp_eatReverseSolidusAtomEscape(e) ||
			this.regexp_eatCharacterClass(e) ||
			this.regexp_eatUncapturingGroup(e) ||
			this.regexp_eatCapturingGroup(e) ||
			this.regexp_eatInvalidBracedQuantifier(e) ||
			this.regexp_eatExtendedPatternCharacter(e)
		);
	};
	A.regexp_eatInvalidBracedQuantifier = function (e) {
		return (
			this.regexp_eatBracedQuantifier(e, !0) &&
				e.raise("Nothing to repeat"),
			!1
		);
	};
	A.regexp_eatSyntaxCharacter = function (e) {
		var t = e.current();
		return Vr(t) ? ((e.lastIntValue = t), e.advance(), !0) : !1;
	};
	function Vr(e) {
		return (
			e === 36 ||
			(e >= 40 && e <= 43) ||
			e === 46 ||
			e === 63 ||
			(e >= 91 && e <= 94) ||
			(e >= 123 && e <= 125)
		);
	}
	A.regexp_eatPatternCharacters = function (e) {
		for (var t = e.pos, i = 0; (i = e.current()) !== -1 && !Vr(i); )
			e.advance();
		return e.pos !== t;
	};
	A.regexp_eatExtendedPatternCharacter = function (e) {
		var t = e.current();
		return t !== -1 &&
			t !== 36 &&
			!(t >= 40 && t <= 43) &&
			t !== 46 &&
			t !== 63 &&
			t !== 91 &&
			t !== 94 &&
			t !== 124
			? (e.advance(), !0)
			: !1;
	};
	A.regexp_groupSpecifier = function (e) {
		if (e.eat(63)) {
			if (this.regexp_eatGroupName(e)) {
				e.groupNames.indexOf(e.lastStringValue) !== -1 &&
					e.raise("Duplicate capture group name"),
					e.groupNames.push(e.lastStringValue);
				return;
			}
			e.raise("Invalid group");
		}
	};
	A.regexp_eatGroupName = function (e) {
		if (((e.lastStringValue = ""), e.eat(60))) {
			if (this.regexp_eatRegExpIdentifierName(e) && e.eat(62)) return !0;
			e.raise("Invalid capture group name");
		}
		return !1;
	};
	A.regexp_eatRegExpIdentifierName = function (e) {
		if (
			((e.lastStringValue = ""), this.regexp_eatRegExpIdentifierStart(e))
		) {
			for (
				e.lastStringValue += _e(e.lastIntValue);
				this.regexp_eatRegExpIdentifierPart(e);

			)
				e.lastStringValue += _e(e.lastIntValue);
			return !0;
		}
		return !1;
	};
	A.regexp_eatRegExpIdentifierStart = function (e) {
		var t = e.pos,
			i = this.options.ecmaVersion >= 11,
			r = e.current(i);
		return (
			e.advance(i),
			r === 92 &&
				this.regexp_eatRegExpUnicodeEscapeSequence(e, i) &&
				(r = e.lastIntValue),
			Fa(r) ? ((e.lastIntValue = r), !0) : ((e.pos = t), !1)
		);
	};
	function Fa(e) {
		return ge(e, !0) || e === 36 || e === 95;
	}
	A.regexp_eatRegExpIdentifierPart = function (e) {
		var t = e.pos,
			i = this.options.ecmaVersion >= 11,
			r = e.current(i);
		return (
			e.advance(i),
			r === 92 &&
				this.regexp_eatRegExpUnicodeEscapeSequence(e, i) &&
				(r = e.lastIntValue),
			ja(r) ? ((e.lastIntValue = r), !0) : ((e.pos = t), !1)
		);
	};
	function ja(e) {
		return Pe(e, !0) || e === 36 || e === 95 || e === 8204 || e === 8205;
	}
	A.regexp_eatAtomEscape = function (e) {
		return this.regexp_eatBackReference(e) ||
			this.regexp_eatCharacterClassEscape(e) ||
			this.regexp_eatCharacterEscape(e) ||
			(e.switchN && this.regexp_eatKGroupName(e))
			? !0
			: (e.switchU &&
					(e.current() === 99 && e.raise("Invalid unicode escape"),
					e.raise("Invalid escape")),
				!1);
	};
	A.regexp_eatBackReference = function (e) {
		var t = e.pos;
		if (this.regexp_eatDecimalEscape(e)) {
			var i = e.lastIntValue;
			if (e.switchU)
				return i > e.maxBackReference && (e.maxBackReference = i), !0;
			if (i <= e.numCapturingParens) return !0;
			e.pos = t;
		}
		return !1;
	};
	A.regexp_eatKGroupName = function (e) {
		if (e.eat(107)) {
			if (this.regexp_eatGroupName(e))
				return e.backReferenceNames.push(e.lastStringValue), !0;
			e.raise("Invalid named reference");
		}
		return !1;
	};
	A.regexp_eatCharacterEscape = function (e) {
		return (
			this.regexp_eatControlEscape(e) ||
			this.regexp_eatCControlLetter(e) ||
			this.regexp_eatZero(e) ||
			this.regexp_eatHexEscapeSequence(e) ||
			this.regexp_eatRegExpUnicodeEscapeSequence(e, !1) ||
			(!e.switchU && this.regexp_eatLegacyOctalEscapeSequence(e)) ||
			this.regexp_eatIdentityEscape(e)
		);
	};
	A.regexp_eatCControlLetter = function (e) {
		var t = e.pos;
		if (e.eat(99)) {
			if (this.regexp_eatControlLetter(e)) return !0;
			e.pos = t;
		}
		return !1;
	};
	A.regexp_eatZero = function (e) {
		return e.current() === 48 && !ft(e.lookahead())
			? ((e.lastIntValue = 0), e.advance(), !0)
			: !1;
	};
	A.regexp_eatControlEscape = function (e) {
		var t = e.current();
		return t === 116
			? ((e.lastIntValue = 9), e.advance(), !0)
			: t === 110
				? ((e.lastIntValue = 10), e.advance(), !0)
				: t === 118
					? ((e.lastIntValue = 11), e.advance(), !0)
					: t === 102
						? ((e.lastIntValue = 12), e.advance(), !0)
						: t === 114
							? ((e.lastIntValue = 13), e.advance(), !0)
							: !1;
	};
	A.regexp_eatControlLetter = function (e) {
		var t = e.current();
		return Mr(t) ? ((e.lastIntValue = t % 32), e.advance(), !0) : !1;
	};
	function Mr(e) {
		return (e >= 65 && e <= 90) || (e >= 97 && e <= 122);
	}
	A.regexp_eatRegExpUnicodeEscapeSequence = function (e, t) {
		t === void 0 && (t = !1);
		var i = e.pos,
			r = t || e.switchU;
		if (e.eat(117)) {
			if (this.regexp_eatFixedHexDigits(e, 4)) {
				var s = e.lastIntValue;
				if (r && s >= 55296 && s <= 56319) {
					var a = e.pos;
					if (
						e.eat(92) &&
						e.eat(117) &&
						this.regexp_eatFixedHexDigits(e, 4)
					) {
						var n = e.lastIntValue;
						if (n >= 56320 && n <= 57343)
							return (
								(e.lastIntValue =
									(s - 55296) * 1024 + (n - 56320) + 65536),
								!0
							);
					}
					(e.pos = a), (e.lastIntValue = s);
				}
				return !0;
			}
			if (
				r &&
				e.eat(123) &&
				this.regexp_eatHexDigits(e) &&
				e.eat(125) &&
				Ua(e.lastIntValue)
			)
				return !0;
			r && e.raise("Invalid unicode escape"), (e.pos = i);
		}
		return !1;
	};
	function Ua(e) {
		return e >= 0 && e <= 1114111;
	}
	A.regexp_eatIdentityEscape = function (e) {
		if (e.switchU)
			return this.regexp_eatSyntaxCharacter(e)
				? !0
				: e.eat(47)
					? ((e.lastIntValue = 47), !0)
					: !1;
		var t = e.current();
		return t !== 99 && (!e.switchN || t !== 107)
			? ((e.lastIntValue = t), e.advance(), !0)
			: !1;
	};
	A.regexp_eatDecimalEscape = function (e) {
		e.lastIntValue = 0;
		var t = e.current();
		if (t >= 49 && t <= 57) {
			do (e.lastIntValue = 10 * e.lastIntValue + (t - 48)), e.advance();
			while ((t = e.current()) >= 48 && t <= 57);
			return !0;
		}
		return !1;
	};
	var Fr = 0,
		xe = 1,
		ce = 2;
	A.regexp_eatCharacterClassEscape = function (e) {
		var t = e.current();
		if (Ha(t)) return (e.lastIntValue = -1), e.advance(), xe;
		var i = !1;
		if (
			e.switchU &&
			this.options.ecmaVersion >= 9 &&
			((i = t === 80) || t === 112)
		) {
			(e.lastIntValue = -1), e.advance();
			var r;
			if (
				e.eat(123) &&
				(r = this.regexp_eatUnicodePropertyValueExpression(e)) &&
				e.eat(125)
			)
				return i && r === ce && e.raise("Invalid property name"), r;
			e.raise("Invalid property name");
		}
		return Fr;
	};
	function Ha(e) {
		return (
			e === 100 ||
			e === 68 ||
			e === 115 ||
			e === 83 ||
			e === 119 ||
			e === 87
		);
	}
	A.regexp_eatUnicodePropertyValueExpression = function (e) {
		var t = e.pos;
		if (this.regexp_eatUnicodePropertyName(e) && e.eat(61)) {
			var i = e.lastStringValue;
			if (this.regexp_eatUnicodePropertyValue(e)) {
				var r = e.lastStringValue;
				return (
					this.regexp_validateUnicodePropertyNameAndValue(e, i, r), xe
				);
			}
		}
		if (((e.pos = t), this.regexp_eatLoneUnicodePropertyNameOrValue(e))) {
			var s = e.lastStringValue;
			return this.regexp_validateUnicodePropertyNameOrValue(e, s);
		}
		return Fr;
	};
	A.regexp_validateUnicodePropertyNameAndValue = function (e, t, i) {
		je(e.unicodeProperties.nonBinary, t) ||
			e.raise("Invalid property name"),
			e.unicodeProperties.nonBinary[t].test(i) ||
				e.raise("Invalid property value");
	};
	A.regexp_validateUnicodePropertyNameOrValue = function (e, t) {
		if (e.unicodeProperties.binary.test(t)) return xe;
		if (e.switchV && e.unicodeProperties.binaryOfStrings.test(t)) return ce;
		e.raise("Invalid property name");
	};
	A.regexp_eatUnicodePropertyName = function (e) {
		var t = 0;
		for (e.lastStringValue = ""; jr((t = e.current())); )
			(e.lastStringValue += _e(t)), e.advance();
		return e.lastStringValue !== "";
	};
	function jr(e) {
		return Mr(e) || e === 95;
	}
	A.regexp_eatUnicodePropertyValue = function (e) {
		var t = 0;
		for (e.lastStringValue = ""; $a((t = e.current())); )
			(e.lastStringValue += _e(t)), e.advance();
		return e.lastStringValue !== "";
	};
	function $a(e) {
		return jr(e) || ft(e);
	}
	A.regexp_eatLoneUnicodePropertyNameOrValue = function (e) {
		return this.regexp_eatUnicodePropertyValue(e);
	};
	A.regexp_eatCharacterClass = function (e) {
		if (e.eat(91)) {
			var t = e.eat(94),
				i = this.regexp_classContents(e);
			return (
				e.eat(93) || e.raise("Unterminated character class"),
				t &&
					i === ce &&
					e.raise("Negated character class may contain strings"),
				!0
			);
		}
		return !1;
	};
	A.regexp_classContents = function (e) {
		return e.current() === 93
			? xe
			: e.switchV
				? this.regexp_classSetExpression(e)
				: (this.regexp_nonEmptyClassRanges(e), xe);
	};
	A.regexp_nonEmptyClassRanges = function (e) {
		for (; this.regexp_eatClassAtom(e); ) {
			var t = e.lastIntValue;
			if (e.eat(45) && this.regexp_eatClassAtom(e)) {
				var i = e.lastIntValue;
				e.switchU &&
					(t === -1 || i === -1) &&
					e.raise("Invalid character class"),
					t !== -1 &&
						i !== -1 &&
						t > i &&
						e.raise("Range out of order in character class");
			}
		}
	};
	A.regexp_eatClassAtom = function (e) {
		var t = e.pos;
		if (e.eat(92)) {
			if (this.regexp_eatClassEscape(e)) return !0;
			if (e.switchU) {
				var i = e.current();
				(i === 99 || $r(i)) && e.raise("Invalid class escape"),
					e.raise("Invalid escape");
			}
			e.pos = t;
		}
		var r = e.current();
		return r !== 93 ? ((e.lastIntValue = r), e.advance(), !0) : !1;
	};
	A.regexp_eatClassEscape = function (e) {
		var t = e.pos;
		if (e.eat(98)) return (e.lastIntValue = 8), !0;
		if (e.switchU && e.eat(45)) return (e.lastIntValue = 45), !0;
		if (!e.switchU && e.eat(99)) {
			if (this.regexp_eatClassControlLetter(e)) return !0;
			e.pos = t;
		}
		return (
			this.regexp_eatCharacterClassEscape(e) ||
			this.regexp_eatCharacterEscape(e)
		);
	};
	A.regexp_classSetExpression = function (e) {
		var t = xe,
			i;
		if (!this.regexp_eatClassSetRange(e))
			if ((i = this.regexp_eatClassSetOperand(e))) {
				i === ce && (t = ce);
				for (var r = e.pos; e.eatChars([38, 38]); ) {
					if (
						e.current() !== 38 &&
						(i = this.regexp_eatClassSetOperand(e))
					) {
						i !== ce && (t = xe);
						continue;
					}
					e.raise("Invalid character in character class");
				}
				if (r !== e.pos) return t;
				for (; e.eatChars([45, 45]); )
					this.regexp_eatClassSetOperand(e) ||
						e.raise("Invalid character in character class");
				if (r !== e.pos) return t;
			} else e.raise("Invalid character in character class");
		for (;;)
			if (!this.regexp_eatClassSetRange(e)) {
				if (((i = this.regexp_eatClassSetOperand(e)), !i)) return t;
				i === ce && (t = ce);
			}
	};
	A.regexp_eatClassSetRange = function (e) {
		var t = e.pos;
		if (this.regexp_eatClassSetCharacter(e)) {
			var i = e.lastIntValue;
			if (e.eat(45) && this.regexp_eatClassSetCharacter(e)) {
				var r = e.lastIntValue;
				return (
					i !== -1 &&
						r !== -1 &&
						i > r &&
						e.raise("Range out of order in character class"),
					!0
				);
			}
			e.pos = t;
		}
		return !1;
	};
	A.regexp_eatClassSetOperand = function (e) {
		return this.regexp_eatClassSetCharacter(e)
			? xe
			: this.regexp_eatClassStringDisjunction(e) ||
					this.regexp_eatNestedClass(e);
	};
	A.regexp_eatNestedClass = function (e) {
		var t = e.pos;
		if (e.eat(91)) {
			var i = e.eat(94),
				r = this.regexp_classContents(e);
			if (e.eat(93))
				return (
					i &&
						r === ce &&
						e.raise("Negated character class may contain strings"),
					r
				);
			e.pos = t;
		}
		if (e.eat(92)) {
			var s = this.regexp_eatCharacterClassEscape(e);
			if (s) return s;
			e.pos = t;
		}
		return null;
	};
	A.regexp_eatClassStringDisjunction = function (e) {
		var t = e.pos;
		if (e.eatChars([92, 113])) {
			if (e.eat(123)) {
				var i = this.regexp_classStringDisjunctionContents(e);
				if (e.eat(125)) return i;
			} else e.raise("Invalid escape");
			e.pos = t;
		}
		return null;
	};
	A.regexp_classStringDisjunctionContents = function (e) {
		for (var t = this.regexp_classString(e); e.eat(124); )
			this.regexp_classString(e) === ce && (t = ce);
		return t;
	};
	A.regexp_classString = function (e) {
		for (var t = 0; this.regexp_eatClassSetCharacter(e); ) t++;
		return t === 1 ? xe : ce;
	};
	A.regexp_eatClassSetCharacter = function (e) {
		var t = e.pos;
		if (e.eat(92))
			return this.regexp_eatCharacterEscape(e) ||
				this.regexp_eatClassSetReservedPunctuator(e)
				? !0
				: e.eat(98)
					? ((e.lastIntValue = 8), !0)
					: ((e.pos = t), !1);
		var i = e.current();
		return i < 0 || (i === e.lookahead() && Wa(i)) || za(i)
			? !1
			: (e.advance(), (e.lastIntValue = i), !0);
	};
	function Wa(e) {
		return (
			e === 33 ||
			(e >= 35 && e <= 38) ||
			(e >= 42 && e <= 44) ||
			e === 46 ||
			(e >= 58 && e <= 64) ||
			e === 94 ||
			e === 96 ||
			e === 126
		);
	}
	function za(e) {
		return (
			e === 40 ||
			e === 41 ||
			e === 45 ||
			e === 47 ||
			(e >= 91 && e <= 93) ||
			(e >= 123 && e <= 125)
		);
	}
	A.regexp_eatClassSetReservedPunctuator = function (e) {
		var t = e.current();
		return qa(t) ? ((e.lastIntValue = t), e.advance(), !0) : !1;
	};
	function qa(e) {
		return (
			e === 33 ||
			e === 35 ||
			e === 37 ||
			e === 38 ||
			e === 44 ||
			e === 45 ||
			(e >= 58 && e <= 62) ||
			e === 64 ||
			e === 96 ||
			e === 126
		);
	}
	A.regexp_eatClassControlLetter = function (e) {
		var t = e.current();
		return ft(t) || t === 95
			? ((e.lastIntValue = t % 32), e.advance(), !0)
			: !1;
	};
	A.regexp_eatHexEscapeSequence = function (e) {
		var t = e.pos;
		if (e.eat(120)) {
			if (this.regexp_eatFixedHexDigits(e, 2)) return !0;
			e.switchU && e.raise("Invalid escape"), (e.pos = t);
		}
		return !1;
	};
	A.regexp_eatDecimalDigits = function (e) {
		var t = e.pos,
			i = 0;
		for (e.lastIntValue = 0; ft((i = e.current())); )
			(e.lastIntValue = 10 * e.lastIntValue + (i - 48)), e.advance();
		return e.pos !== t;
	};
	function ft(e) {
		return e >= 48 && e <= 57;
	}
	A.regexp_eatHexDigits = function (e) {
		var t = e.pos,
			i = 0;
		for (e.lastIntValue = 0; Ur((i = e.current())); )
			(e.lastIntValue = 16 * e.lastIntValue + Hr(i)), e.advance();
		return e.pos !== t;
	};
	function Ur(e) {
		return (
			(e >= 48 && e <= 57) ||
			(e >= 65 && e <= 70) ||
			(e >= 97 && e <= 102)
		);
	}
	function Hr(e) {
		return e >= 65 && e <= 70
			? 10 + (e - 65)
			: e >= 97 && e <= 102
				? 10 + (e - 97)
				: e - 48;
	}
	A.regexp_eatLegacyOctalEscapeSequence = function (e) {
		if (this.regexp_eatOctalDigit(e)) {
			var t = e.lastIntValue;
			if (this.regexp_eatOctalDigit(e)) {
				var i = e.lastIntValue;
				t <= 3 && this.regexp_eatOctalDigit(e)
					? (e.lastIntValue = t * 64 + i * 8 + e.lastIntValue)
					: (e.lastIntValue = t * 8 + i);
			} else e.lastIntValue = t;
			return !0;
		}
		return !1;
	};
	A.regexp_eatOctalDigit = function (e) {
		var t = e.current();
		return $r(t)
			? ((e.lastIntValue = t - 48), e.advance(), !0)
			: ((e.lastIntValue = 0), !1);
	};
	function $r(e) {
		return e >= 48 && e <= 55;
	}
	A.regexp_eatFixedHexDigits = function (e, t) {
		var i = e.pos;
		e.lastIntValue = 0;
		for (var r = 0; r < t; ++r) {
			var s = e.current();
			if (!Ur(s)) return (e.pos = i), !1;
			(e.lastIntValue = 16 * e.lastIntValue + Hr(s)), e.advance();
		}
		return !0;
	};
	var Qt = function (t) {
			(this.type = t.type),
				(this.value = t.value),
				(this.start = t.start),
				(this.end = t.end),
				t.options.locations &&
					(this.loc = new ut(t, t.startLoc, t.endLoc)),
				t.options.ranges && (this.range = [t.start, t.end]);
		},
		M = q.prototype;
	M.next = function (e) {
		!e &&
			this.type.keyword &&
			this.containsEsc &&
			this.raiseRecoverable(
				this.start,
				"Escape sequence in keyword " + this.type.keyword,
			),
			this.options.onToken && this.options.onToken(new Qt(this)),
			(this.lastTokEnd = this.end),
			(this.lastTokStart = this.start),
			(this.lastTokEndLoc = this.endLoc),
			(this.lastTokStartLoc = this.startLoc),
			this.nextToken();
	};
	M.getToken = function () {
		return this.next(), new Qt(this);
	};
	typeof Symbol < "u" &&
		(M[Symbol.iterator] = function () {
			var e = this;
			return {
				next: function () {
					var t = e.getToken();
					return { done: t.type === c.eof, value: t };
				},
			};
		});
	M.nextToken = function () {
		var e = this.curContext();
		if (
			((!e || !e.preserveSpace) && this.skipSpace(),
			(this.start = this.pos),
			this.options.locations && (this.startLoc = this.curPosition()),
			this.pos >= this.input.length)
		)
			return this.finishToken(c.eof);
		if (e.override) return e.override(this);
		this.readToken(this.fullCharCodeAtPos());
	};
	M.readToken = function (e) {
		return ge(e, this.options.ecmaVersion >= 6) || e === 92
			? this.readWord()
			: this.getTokenFromCode(e);
	};
	M.fullCharCodeAtPos = function () {
		var e = this.input.charCodeAt(this.pos);
		if (e <= 55295 || e >= 56320) return e;
		var t = this.input.charCodeAt(this.pos + 1);
		return t <= 56319 || t >= 57344 ? e : (e << 10) + t - 56613888;
	};
	M.skipBlockComment = function () {
		var e = this.options.onComment && this.curPosition(),
			t = this.pos,
			i = this.input.indexOf("*/", (this.pos += 2));
		if (
			(i === -1 && this.raise(this.pos - 2, "Unterminated comment"),
			(this.pos = i + 2),
			this.options.locations)
		)
			for (
				var r = void 0, s = t;
				(r = fr(this.input, s, this.pos)) > -1;

			)
				++this.curLine, (s = this.lineStart = r);
		this.options.onComment &&
			this.options.onComment(
				!0,
				this.input.slice(t + 2, i),
				t,
				this.pos,
				e,
				this.curPosition(),
			);
	};
	M.skipLineComment = function (e) {
		for (
			var t = this.pos,
				i = this.options.onComment && this.curPosition(),
				r = this.input.charCodeAt((this.pos += e));
			this.pos < this.input.length && !Re(r);

		)
			r = this.input.charCodeAt(++this.pos);
		this.options.onComment &&
			this.options.onComment(
				!1,
				this.input.slice(t + e, this.pos),
				t,
				this.pos,
				i,
				this.curPosition(),
			);
	};
	M.skipSpace = function () {
		e: for (; this.pos < this.input.length; ) {
			var e = this.input.charCodeAt(this.pos);
			switch (e) {
				case 32:
				case 160:
					++this.pos;
					break;
				case 13:
					this.input.charCodeAt(this.pos + 1) === 10 && ++this.pos;
				case 10:
				case 8232:
				case 8233:
					++this.pos,
						this.options.locations &&
							(++this.curLine, (this.lineStart = this.pos));
					break;
				case 47:
					switch (this.input.charCodeAt(this.pos + 1)) {
						case 42:
							this.skipBlockComment();
							break;
						case 47:
							this.skipLineComment(2);
							break;
						default:
							break e;
					}
					break;
				default:
					if (
						(e > 8 && e < 14) ||
						(e >= 5760 && pr.test(String.fromCharCode(e)))
					)
						++this.pos;
					else break e;
			}
		}
	};
	M.finishToken = function (e, t) {
		(this.end = this.pos),
			this.options.locations && (this.endLoc = this.curPosition());
		var i = this.type;
		(this.type = e), (this.value = t), this.updateContext(i);
	};
	M.readToken_dot = function () {
		var e = this.input.charCodeAt(this.pos + 1);
		if (e >= 48 && e <= 57) return this.readNumber(!0);
		var t = this.input.charCodeAt(this.pos + 2);
		return this.options.ecmaVersion >= 6 && e === 46 && t === 46
			? ((this.pos += 3), this.finishToken(c.ellipsis))
			: (++this.pos, this.finishToken(c.dot));
	};
	M.readToken_slash = function () {
		var e = this.input.charCodeAt(this.pos + 1);
		return this.exprAllowed
			? (++this.pos, this.readRegexp())
			: e === 61
				? this.finishOp(c.assign, 2)
				: this.finishOp(c.slash, 1);
	};
	M.readToken_mult_modulo_exp = function (e) {
		var t = this.input.charCodeAt(this.pos + 1),
			i = 1,
			r = e === 42 ? c.star : c.modulo;
		return (
			this.options.ecmaVersion >= 7 &&
				e === 42 &&
				t === 42 &&
				(++i,
				(r = c.starstar),
				(t = this.input.charCodeAt(this.pos + 2))),
			t === 61 ? this.finishOp(c.assign, i + 1) : this.finishOp(r, i)
		);
	};
	M.readToken_pipe_amp = function (e) {
		var t = this.input.charCodeAt(this.pos + 1);
		if (t === e) {
			if (this.options.ecmaVersion >= 12) {
				var i = this.input.charCodeAt(this.pos + 2);
				if (i === 61) return this.finishOp(c.assign, 3);
			}
			return this.finishOp(e === 124 ? c.logicalOR : c.logicalAND, 2);
		}
		return t === 61
			? this.finishOp(c.assign, 2)
			: this.finishOp(e === 124 ? c.bitwiseOR : c.bitwiseAND, 1);
	};
	M.readToken_caret = function () {
		var e = this.input.charCodeAt(this.pos + 1);
		return e === 61
			? this.finishOp(c.assign, 2)
			: this.finishOp(c.bitwiseXOR, 1);
	};
	M.readToken_plus_min = function (e) {
		var t = this.input.charCodeAt(this.pos + 1);
		return t === e
			? t === 45 &&
				!this.inModule &&
				this.input.charCodeAt(this.pos + 2) === 62 &&
				(this.lastTokEnd === 0 ||
					ue.test(this.input.slice(this.lastTokEnd, this.pos)))
				? (this.skipLineComment(3), this.skipSpace(), this.nextToken())
				: this.finishOp(c.incDec, 2)
			: t === 61
				? this.finishOp(c.assign, 2)
				: this.finishOp(c.plusMin, 1);
	};
	M.readToken_lt_gt = function (e) {
		var t = this.input.charCodeAt(this.pos + 1),
			i = 1;
		return t === e
			? ((i =
					e === 62 && this.input.charCodeAt(this.pos + 2) === 62
						? 3
						: 2),
				this.input.charCodeAt(this.pos + i) === 61
					? this.finishOp(c.assign, i + 1)
					: this.finishOp(c.bitShift, i))
			: t === 33 &&
				  e === 60 &&
				  !this.inModule &&
				  this.input.charCodeAt(this.pos + 2) === 45 &&
				  this.input.charCodeAt(this.pos + 3) === 45
				? (this.skipLineComment(4), this.skipSpace(), this.nextToken())
				: (t === 61 && (i = 2), this.finishOp(c.relational, i));
	};
	M.readToken_eq_excl = function (e) {
		var t = this.input.charCodeAt(this.pos + 1);
		return t === 61
			? this.finishOp(
					c.equality,
					this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2,
				)
			: e === 61 && t === 62 && this.options.ecmaVersion >= 6
				? ((this.pos += 2), this.finishToken(c.arrow))
				: this.finishOp(e === 61 ? c.eq : c.prefix, 1);
	};
	M.readToken_question = function () {
		var e = this.options.ecmaVersion;
		if (e >= 11) {
			var t = this.input.charCodeAt(this.pos + 1);
			if (t === 46) {
				var i = this.input.charCodeAt(this.pos + 2);
				if (i < 48 || i > 57) return this.finishOp(c.questionDot, 2);
			}
			if (t === 63) {
				if (e >= 12) {
					var r = this.input.charCodeAt(this.pos + 2);
					if (r === 61) return this.finishOp(c.assign, 3);
				}
				return this.finishOp(c.coalesce, 2);
			}
		}
		return this.finishOp(c.question, 1);
	};
	M.readToken_numberSign = function () {
		var e = this.options.ecmaVersion,
			t = 35;
		if (
			e >= 13 &&
			(++this.pos, (t = this.fullCharCodeAtPos()), ge(t, !0) || t === 92)
		)
			return this.finishToken(c.privateId, this.readWord1());
		this.raise(this.pos, "Unexpected character '" + _e(t) + "'");
	};
	M.getTokenFromCode = function (e) {
		switch (e) {
			case 46:
				return this.readToken_dot();
			case 40:
				return ++this.pos, this.finishToken(c.parenL);
			case 41:
				return ++this.pos, this.finishToken(c.parenR);
			case 59:
				return ++this.pos, this.finishToken(c.semi);
			case 44:
				return ++this.pos, this.finishToken(c.comma);
			case 91:
				return ++this.pos, this.finishToken(c.bracketL);
			case 93:
				return ++this.pos, this.finishToken(c.bracketR);
			case 123:
				return ++this.pos, this.finishToken(c.braceL);
			case 125:
				return ++this.pos, this.finishToken(c.braceR);
			case 58:
				return ++this.pos, this.finishToken(c.colon);
			case 96:
				if (this.options.ecmaVersion < 6) break;
				return ++this.pos, this.finishToken(c.backQuote);
			case 48:
				var t = this.input.charCodeAt(this.pos + 1);
				if (t === 120 || t === 88) return this.readRadixNumber(16);
				if (this.options.ecmaVersion >= 6) {
					if (t === 111 || t === 79) return this.readRadixNumber(8);
					if (t === 98 || t === 66) return this.readRadixNumber(2);
				}
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57:
				return this.readNumber(!1);
			case 34:
			case 39:
				return this.readString(e);
			case 47:
				return this.readToken_slash();
			case 37:
			case 42:
				return this.readToken_mult_modulo_exp(e);
			case 124:
			case 38:
				return this.readToken_pipe_amp(e);
			case 94:
				return this.readToken_caret();
			case 43:
			case 45:
				return this.readToken_plus_min(e);
			case 60:
			case 62:
				return this.readToken_lt_gt(e);
			case 61:
			case 33:
				return this.readToken_eq_excl(e);
			case 63:
				return this.readToken_question();
			case 126:
				return this.finishOp(c.prefix, 1);
			case 35:
				return this.readToken_numberSign();
		}
		this.raise(this.pos, "Unexpected character '" + _e(e) + "'");
	};
	M.finishOp = function (e, t) {
		var i = this.input.slice(this.pos, this.pos + t);
		return (this.pos += t), this.finishToken(e, i);
	};
	M.readRegexp = function () {
		for (var e, t, i = this.pos; ; ) {
			this.pos >= this.input.length &&
				this.raise(i, "Unterminated regular expression");
			var r = this.input.charAt(this.pos);
			if (
				(ue.test(r) && this.raise(i, "Unterminated regular expression"),
				e)
			)
				e = !1;
			else {
				if (r === "[") t = !0;
				else if (r === "]" && t) t = !1;
				else if (r === "/" && !t) break;
				e = r === "\\";
			}
			++this.pos;
		}
		var s = this.input.slice(i, this.pos);
		++this.pos;
		var a = this.pos,
			n = this.readWord1();
		this.containsEsc && this.unexpected(a);
		var o = this.regexpState || (this.regexpState = new me(this));
		o.reset(i, s, n),
			this.validateRegExpFlags(o),
			this.validateRegExpPattern(o);
		var u = null;
		try {
			u = new RegExp(s, n);
		} catch {}
		return this.finishToken(c.regexp, { pattern: s, flags: n, value: u });
	};
	M.readInt = function (e, t, i) {
		for (
			var r = this.options.ecmaVersion >= 12 && t === void 0,
				s = i && this.input.charCodeAt(this.pos) === 48,
				a = this.pos,
				n = 0,
				o = 0,
				u = 0,
				h = t ?? 1 / 0;
			u < h;
			++u, ++this.pos
		) {
			var f = this.input.charCodeAt(this.pos),
				p = void 0;
			if (r && f === 95) {
				s &&
					this.raiseRecoverable(
						this.pos,
						"Numeric separator is not allowed in legacy octal numeric literals",
					),
					o === 95 &&
						this.raiseRecoverable(
							this.pos,
							"Numeric separator must be exactly one underscore",
						),
					u === 0 &&
						this.raiseRecoverable(
							this.pos,
							"Numeric separator is not allowed at the first of digits",
						),
					(o = f);
				continue;
			}
			if (
				(f >= 97
					? (p = f - 97 + 10)
					: f >= 65
						? (p = f - 65 + 10)
						: f >= 48 && f <= 57
							? (p = f - 48)
							: (p = 1 / 0),
				p >= e)
			)
				break;
			(o = f), (n = n * e + p);
		}
		return (
			r &&
				o === 95 &&
				this.raiseRecoverable(
					this.pos - 1,
					"Numeric separator is not allowed at the last of digits",
				),
			this.pos === a || (t != null && this.pos - a !== t) ? null : n
		);
	};
	function Ga(e, t) {
		return t ? parseInt(e, 8) : parseFloat(e.replace(/_/g, ""));
	}
	function Wr(e) {
		return typeof BigInt != "function" ? null : BigInt(e.replace(/_/g, ""));
	}
	M.readRadixNumber = function (e) {
		var t = this.pos;
		this.pos += 2;
		var i = this.readInt(e);
		return (
			i == null &&
				this.raise(this.start + 2, "Expected number in radix " + e),
			this.options.ecmaVersion >= 11 &&
			this.input.charCodeAt(this.pos) === 110
				? ((i = Wr(this.input.slice(t, this.pos))), ++this.pos)
				: ge(this.fullCharCodeAtPos()) &&
					this.raise(this.pos, "Identifier directly after number"),
			this.finishToken(c.num, i)
		);
	};
	M.readNumber = function (e) {
		var t = this.pos;
		!e &&
			this.readInt(10, void 0, !0) === null &&
			this.raise(t, "Invalid number");
		var i = this.pos - t >= 2 && this.input.charCodeAt(t) === 48;
		i && this.strict && this.raise(t, "Invalid number");
		var r = this.input.charCodeAt(this.pos);
		if (!i && !e && this.options.ecmaVersion >= 11 && r === 110) {
			var s = Wr(this.input.slice(t, this.pos));
			return (
				++this.pos,
				ge(this.fullCharCodeAtPos()) &&
					this.raise(this.pos, "Identifier directly after number"),
				this.finishToken(c.num, s)
			);
		}
		i && /[89]/.test(this.input.slice(t, this.pos)) && (i = !1),
			r === 46 &&
				!i &&
				(++this.pos,
				this.readInt(10),
				(r = this.input.charCodeAt(this.pos))),
			(r === 69 || r === 101) &&
				!i &&
				((r = this.input.charCodeAt(++this.pos)),
				(r === 43 || r === 45) && ++this.pos,
				this.readInt(10) === null && this.raise(t, "Invalid number")),
			ge(this.fullCharCodeAtPos()) &&
				this.raise(this.pos, "Identifier directly after number");
		var a = Ga(this.input.slice(t, this.pos), i);
		return this.finishToken(c.num, a);
	};
	M.readCodePoint = function () {
		var e = this.input.charCodeAt(this.pos),
			t;
		if (e === 123) {
			this.options.ecmaVersion < 6 && this.unexpected();
			var i = ++this.pos;
			(t = this.readHexChar(
				this.input.indexOf("}", this.pos) - this.pos,
			)),
				++this.pos,
				t > 1114111 &&
					this.invalidStringToken(i, "Code point out of bounds");
		} else t = this.readHexChar(4);
		return t;
	};
	M.readString = function (e) {
		for (var t = "", i = ++this.pos; ; ) {
			this.pos >= this.input.length &&
				this.raise(this.start, "Unterminated string constant");
			var r = this.input.charCodeAt(this.pos);
			if (r === e) break;
			r === 92
				? ((t += this.input.slice(i, this.pos)),
					(t += this.readEscapedChar(!1)),
					(i = this.pos))
				: r === 8232 || r === 8233
					? (this.options.ecmaVersion < 10 &&
							this.raise(
								this.start,
								"Unterminated string constant",
							),
						++this.pos,
						this.options.locations &&
							(this.curLine++, (this.lineStart = this.pos)))
					: (Re(r) &&
							this.raise(
								this.start,
								"Unterminated string constant",
							),
						++this.pos);
		}
		return (
			(t += this.input.slice(i, this.pos++)),
			this.finishToken(c.string, t)
		);
	};
	var zr = {};
	M.tryReadTemplateToken = function () {
		this.inTemplateElement = !0;
		try {
			this.readTmplToken();
		} catch (e) {
			if (e === zr) this.readInvalidTemplateToken();
			else throw e;
		}
		this.inTemplateElement = !1;
	};
	M.invalidStringToken = function (e, t) {
		if (this.inTemplateElement && this.options.ecmaVersion >= 9) throw zr;
		this.raise(e, t);
	};
	M.readTmplToken = function () {
		for (var e = "", t = this.pos; ; ) {
			this.pos >= this.input.length &&
				this.raise(this.start, "Unterminated template");
			var i = this.input.charCodeAt(this.pos);
			if (
				i === 96 ||
				(i === 36 && this.input.charCodeAt(this.pos + 1) === 123)
			)
				return this.pos === this.start &&
					(this.type === c.template ||
						this.type === c.invalidTemplate)
					? i === 36
						? ((this.pos += 2), this.finishToken(c.dollarBraceL))
						: (++this.pos, this.finishToken(c.backQuote))
					: ((e += this.input.slice(t, this.pos)),
						this.finishToken(c.template, e));
			if (i === 92)
				(e += this.input.slice(t, this.pos)),
					(e += this.readEscapedChar(!0)),
					(t = this.pos);
			else if (Re(i)) {
				switch (((e += this.input.slice(t, this.pos)), ++this.pos, i)) {
					case 13:
						this.input.charCodeAt(this.pos) === 10 && ++this.pos;
					case 10:
						e += `
`;
						break;
					default:
						e += String.fromCharCode(i);
						break;
				}
				this.options.locations &&
					(++this.curLine, (this.lineStart = this.pos)),
					(t = this.pos);
			} else ++this.pos;
		}
	};
	M.readInvalidTemplateToken = function () {
		for (; this.pos < this.input.length; this.pos++)
			switch (this.input[this.pos]) {
				case "\\":
					++this.pos;
					break;
				case "$":
					if (this.input[this.pos + 1] !== "{") break;
				case "`":
					return this.finishToken(
						c.invalidTemplate,
						this.input.slice(this.start, this.pos),
					);
			}
		this.raise(this.start, "Unterminated template");
	};
	M.readEscapedChar = function (e) {
		var t = this.input.charCodeAt(++this.pos);
		switch ((++this.pos, t)) {
			case 110:
				return `
`;
			case 114:
				return "\r";
			case 120:
				return String.fromCharCode(this.readHexChar(2));
			case 117:
				return _e(this.readCodePoint());
			case 116:
				return "	";
			case 98:
				return "\b";
			case 118:
				return "\v";
			case 102:
				return "\f";
			case 13:
				this.input.charCodeAt(this.pos) === 10 && ++this.pos;
			case 10:
				return (
					this.options.locations &&
						((this.lineStart = this.pos), ++this.curLine),
					""
				);
			case 56:
			case 57:
				if (
					(this.strict &&
						this.invalidStringToken(
							this.pos - 1,
							"Invalid escape sequence",
						),
					e)
				) {
					var i = this.pos - 1;
					this.invalidStringToken(
						i,
						"Invalid escape sequence in template string",
					);
				}
			default:
				if (t >= 48 && t <= 55) {
					var r = this.input
							.substr(this.pos - 1, 3)
							.match(/^[0-7]+/)[0],
						s = parseInt(r, 8);
					return (
						s > 255 && ((r = r.slice(0, -1)), (s = parseInt(r, 8))),
						(this.pos += r.length - 1),
						(t = this.input.charCodeAt(this.pos)),
						(r !== "0" || t === 56 || t === 57) &&
							(this.strict || e) &&
							this.invalidStringToken(
								this.pos - 1 - r.length,
								e
									? "Octal literal in template string"
									: "Octal literal in strict mode",
							),
						String.fromCharCode(s)
					);
				}
				return Re(t) ? "" : String.fromCharCode(t);
		}
	};
	M.readHexChar = function (e) {
		var t = this.pos,
			i = this.readInt(16, e);
		return (
			i === null &&
				this.invalidStringToken(t, "Bad character escape sequence"),
			i
		);
	};
	M.readWord1 = function () {
		this.containsEsc = !1;
		for (
			var e = "", t = !0, i = this.pos, r = this.options.ecmaVersion >= 6;
			this.pos < this.input.length;

		) {
			var s = this.fullCharCodeAtPos();
			if (Pe(s, r)) this.pos += s <= 65535 ? 1 : 2;
			else if (s === 92) {
				(this.containsEsc = !0), (e += this.input.slice(i, this.pos));
				var a = this.pos;
				this.input.charCodeAt(++this.pos) !== 117 &&
					this.invalidStringToken(
						this.pos,
						"Expecting Unicode escape sequence \\uXXXX",
					),
					++this.pos;
				var n = this.readCodePoint();
				(t ? ge : Pe)(n, r) ||
					this.invalidStringToken(a, "Invalid Unicode escape"),
					(e += _e(n)),
					(i = this.pos);
			} else break;
			t = !1;
		}
		return e + this.input.slice(i, this.pos);
	};
	M.readWord = function () {
		var e = this.readWord1(),
			t = c.name;
		return this.keywords.test(e) && (t = Ht[e]), this.finishToken(t, e);
	};
	var Ka = "8.11.3";
	q.acorn = {
		Parser: q,
		version: Ka,
		defaultOptions: jt,
		Position: Me,
		SourceLocation: ut,
		getLineInfo: mr,
		Node: ht,
		TokenType: U,
		tokTypes: c,
		keywordTypes: Ht,
		TokContext: he,
		tokContexts: W,
		isIdentifierChar: Pe,
		isIdentifierStart: ge,
		Token: Qt,
		isNewLine: Re,
		lineBreak: ue,
		lineBreakG: ba,
		nonASCIIwhitespace: pr,
	};
	function qr(e, t) {
		return q.parse(e, t);
	}
	var Jt = globalThis.fetch,
		ke = globalThis.WebSocket,
		Qa = globalThis.Request,
		Gr = globalThis.Response,
		Ee = {
			prototype: { send: ke.prototype.send },
			CLOSED: ke.CLOSED,
			CLOSING: ke.CLOSING,
			CONNECTING: ke.CONNECTING,
			OPEN: ke.OPEN,
		},
		Ya = 20,
		Ja = [101, 204, 205, 304],
		Za = [301, 302, 303, 307, 308],
		dt = class extends Error {
			constructor(i, r) {
				super(r.message || r.code);
				re(this, "status");
				re(this, "body");
				(this.status = i), (this.body = r);
			}
		},
		Zt = class {
			constructor(t, i) {
				re(this, "base");
				this.base = new URL(`./v${t}/`, i);
			}
		};
	function Se(e, t) {
		let i = (e & 65535) + (t & 65535);
		return (((e >> 16) + (t >> 16) + (i >> 16)) << 16) | (i & 65535);
	}
	function Xa(e, t) {
		return (e << t) | (e >>> (32 - t));
	}
	function mt(e, t, i, r, s, a) {
		return Se(Xa(Se(Se(t, e), Se(r, a)), s), i);
	}
	function G(e, t, i, r, s, a, n) {
		return mt((t & i) | (~t & r), e, t, s, a, n);
	}
	function K(e, t, i, r, s, a, n) {
		return mt((t & r) | (i & ~r), e, t, s, a, n);
	}
	function Q(e, t, i, r, s, a, n) {
		return mt(t ^ i ^ r, e, t, s, a, n);
	}
	function Y(e, t, i, r, s, a, n) {
		return mt(i ^ (t | ~r), e, t, s, a, n);
	}
	function pt(e, t) {
		(e[t >> 5] |= 128 << t % 32), (e[(((t + 64) >>> 9) << 4) + 14] = t);
		let i = 1732584193,
			r = -271733879,
			s = -1732584194,
			a = 271733878;
		for (let n = 0; n < e.length; n += 16) {
			let o = i,
				u = r,
				h = s,
				f = a;
			(i = G(i, r, s, a, e[n], 7, -680876936)),
				(a = G(a, i, r, s, e[n + 1], 12, -389564586)),
				(s = G(s, a, i, r, e[n + 2], 17, 606105819)),
				(r = G(r, s, a, i, e[n + 3], 22, -1044525330)),
				(i = G(i, r, s, a, e[n + 4], 7, -176418897)),
				(a = G(a, i, r, s, e[n + 5], 12, 1200080426)),
				(s = G(s, a, i, r, e[n + 6], 17, -1473231341)),
				(r = G(r, s, a, i, e[n + 7], 22, -45705983)),
				(i = G(i, r, s, a, e[n + 8], 7, 1770035416)),
				(a = G(a, i, r, s, e[n + 9], 12, -1958414417)),
				(s = G(s, a, i, r, e[n + 10], 17, -42063)),
				(r = G(r, s, a, i, e[n + 11], 22, -1990404162)),
				(i = G(i, r, s, a, e[n + 12], 7, 1804603682)),
				(a = G(a, i, r, s, e[n + 13], 12, -40341101)),
				(s = G(s, a, i, r, e[n + 14], 17, -1502002290)),
				(r = G(r, s, a, i, e[n + 15], 22, 1236535329)),
				(i = K(i, r, s, a, e[n + 1], 5, -165796510)),
				(a = K(a, i, r, s, e[n + 6], 9, -1069501632)),
				(s = K(s, a, i, r, e[n + 11], 14, 643717713)),
				(r = K(r, s, a, i, e[n], 20, -373897302)),
				(i = K(i, r, s, a, e[n + 5], 5, -701558691)),
				(a = K(a, i, r, s, e[n + 10], 9, 38016083)),
				(s = K(s, a, i, r, e[n + 15], 14, -660478335)),
				(r = K(r, s, a, i, e[n + 4], 20, -405537848)),
				(i = K(i, r, s, a, e[n + 9], 5, 568446438)),
				(a = K(a, i, r, s, e[n + 14], 9, -1019803690)),
				(s = K(s, a, i, r, e[n + 3], 14, -187363961)),
				(r = K(r, s, a, i, e[n + 8], 20, 1163531501)),
				(i = K(i, r, s, a, e[n + 13], 5, -1444681467)),
				(a = K(a, i, r, s, e[n + 2], 9, -51403784)),
				(s = K(s, a, i, r, e[n + 7], 14, 1735328473)),
				(r = K(r, s, a, i, e[n + 12], 20, -1926607734)),
				(i = Q(i, r, s, a, e[n + 5], 4, -378558)),
				(a = Q(a, i, r, s, e[n + 8], 11, -2022574463)),
				(s = Q(s, a, i, r, e[n + 11], 16, 1839030562)),
				(r = Q(r, s, a, i, e[n + 14], 23, -35309556)),
				(i = Q(i, r, s, a, e[n + 1], 4, -1530992060)),
				(a = Q(a, i, r, s, e[n + 4], 11, 1272893353)),
				(s = Q(s, a, i, r, e[n + 7], 16, -155497632)),
				(r = Q(r, s, a, i, e[n + 10], 23, -1094730640)),
				(i = Q(i, r, s, a, e[n + 13], 4, 681279174)),
				(a = Q(a, i, r, s, e[n], 11, -358537222)),
				(s = Q(s, a, i, r, e[n + 3], 16, -722521979)),
				(r = Q(r, s, a, i, e[n + 6], 23, 76029189)),
				(i = Q(i, r, s, a, e[n + 9], 4, -640364487)),
				(a = Q(a, i, r, s, e[n + 12], 11, -421815835)),
				(s = Q(s, a, i, r, e[n + 15], 16, 530742520)),
				(r = Q(r, s, a, i, e[n + 2], 23, -995338651)),
				(i = Y(i, r, s, a, e[n], 6, -198630844)),
				(a = Y(a, i, r, s, e[n + 7], 10, 1126891415)),
				(s = Y(s, a, i, r, e[n + 14], 15, -1416354905)),
				(r = Y(r, s, a, i, e[n + 5], 21, -57434055)),
				(i = Y(i, r, s, a, e[n + 12], 6, 1700485571)),
				(a = Y(a, i, r, s, e[n + 3], 10, -1894986606)),
				(s = Y(s, a, i, r, e[n + 10], 15, -1051523)),
				(r = Y(r, s, a, i, e[n + 1], 21, -2054922799)),
				(i = Y(i, r, s, a, e[n + 8], 6, 1873313359)),
				(a = Y(a, i, r, s, e[n + 15], 10, -30611744)),
				(s = Y(s, a, i, r, e[n + 6], 15, -1560198380)),
				(r = Y(r, s, a, i, e[n + 13], 21, 1309151649)),
				(i = Y(i, r, s, a, e[n + 4], 6, -145523070)),
				(a = Y(a, i, r, s, e[n + 11], 10, -1120210379)),
				(s = Y(s, a, i, r, e[n + 2], 15, 718787259)),
				(r = Y(r, s, a, i, e[n + 9], 21, -343485551)),
				(i = Se(i, o)),
				(r = Se(r, u)),
				(s = Se(s, h)),
				(a = Se(a, f));
		}
		return [i, r, s, a];
	}
	function Kr(e) {
		let t = "",
			i = e.length * 32;
		for (let r = 0; r < i; r += 8)
			t += String.fromCharCode((e[r >> 5] >>> r % 32) & 255);
		return t;
	}
	function Xt(e) {
		let t = [],
			i = e.length >> 2;
		for (let s = 0; s < i; s += 1) t[s] = 0;
		let r = e.length * 8;
		for (let s = 0; s < r; s += 8)
			t[s >> 5] |= (e.charCodeAt(s / 8) & 255) << s % 32;
		return t;
	}
	function en(e) {
		return Kr(pt(Xt(e), e.length * 8));
	}
	function tn(e, t) {
		let i = Xt(e),
			r = [],
			s = [];
		i.length > 16 && (i = pt(i, e.length * 8));
		for (let n = 0; n < 16; n += 1)
			(r[n] = i[n] ^ 909522486), (s[n] = i[n] ^ 1549556828);
		let a = pt(r.concat(Xt(t)), 512 + t.length * 8);
		return Kr(pt(s.concat(a), 640));
	}
	function Qr(e) {
		let t = "0123456789abcdef",
			i = "";
		for (let r = 0; r < e.length; r += 1) {
			let s = e.charCodeAt(r);
			i += t.charAt((s >>> 4) & 15) + t.charAt(s & 15);
		}
		return i;
	}
	function ei(e) {
		return unescape(encodeURIComponent(e));
	}
	function Yr(e) {
		return en(ei(e));
	}
	function rn(e) {
		return Qr(Yr(e));
	}
	function Jr(e, t) {
		return tn(ei(e), ei(t));
	}
	function sn(e, t) {
		return Qr(Jr(e, t));
	}
	function an(e, t, i) {
		return t ? (i ? Jr(t, e) : sn(t, e)) : i ? Yr(e) : rn(e);
	}
	var Yt = 3072;
	function nn(e) {
		let t = new Headers(e);
		if (e.has("x-bare-headers")) {
			let i = e.get("x-bare-headers");
			if (i.length > Yt) {
				t.delete("x-bare-headers");
				let r = 0;
				for (let s = 0; s < i.length; s += Yt) {
					let a = i.slice(s, s + Yt),
						n = r++;
					t.set(`x-bare-headers-${n}`, `;${a}`);
				}
			}
		}
		return t;
	}
	function on(e) {
		let t = new Headers(e),
			i = "x-bare-headers";
		if (e.has(`${i}-0`)) {
			let r = [];
			for (let [s, a] of e) {
				if (!s.startsWith(i)) continue;
				if (!a.startsWith(";"))
					throw new dt(400, {
						code: "INVALID_BARE_HEADER",
						id: `request.headers.${s}`,
						message: "Value didn't begin with semi-colon.",
					});
				let n = parseInt(s.slice(i.length + 1));
				(r[n] = a.slice(1)), t.delete(s);
			}
			t.set(i, r.join(""));
		}
		return t;
	}
	var ti = class extends Zt {
			constructor(i) {
				super(3, i);
				re(this, "ws");
				re(this, "http");
				(this.ws = new URL(this.base)),
					(this.http = new URL(this.base)),
					this.ws.protocol === "https:"
						? (this.ws.protocol = "wss:")
						: (this.ws.protocol = "ws:");
			}
			connect(i, r, s, a, n) {
				let o = new ke(this.ws),
					u = () => {
						o.removeEventListener("close", h),
							o.removeEventListener("message", f);
					},
					h = () => {
						u();
					},
					f = (p) => {
						if ((u(), typeof p.data != "string"))
							throw new TypeError(
								"the first websocket message was not a text frame",
							);
						let g = JSON.parse(p.data);
						if (g.type !== "open")
							throw new TypeError("message was not of open type");
						p.stopImmediatePropagation(),
							a({
								protocol: g.protocol,
								setCookies: g.setCookies,
							}),
							n(Ee.OPEN),
							o.dispatchEvent(new Event("open"));
					};
				return (
					o.addEventListener("close", h),
					o.addEventListener("message", f),
					o.addEventListener(
						"open",
						(p) => {
							p.stopImmediatePropagation(),
								n(Ee.CONNECTING),
								s().then((g) =>
									Ee.prototype.send.call(
										o,
										JSON.stringify({
											type: "connect",
											remote: i.toString(),
											protocols: r,
											headers: g,
											forwardHeaders: [],
										}),
									),
								);
						},
						{ once: !0 },
					),
					o
				);
			}
			async request(i, r, s, a, n, o, u) {
				if (a.protocol.startsWith("blob:")) {
					let m = await Jt(a),
						T = new Gr(m.body, m);
					return (
						(T.rawHeaders = Object.fromEntries(m.headers)),
						(T.rawResponse = m),
						T
					);
				}
				let h = {};
				if (r instanceof Headers) for (let [m, T] of r) h[m] = T;
				else for (let m in r) h[m] = r[m];
				let f = { credentials: "omit", method: i, signal: u };
				n !== "only-if-cached" && (f.cache = n),
					s !== void 0 && (f.body = s),
					o !== void 0 && (f.duplex = o),
					(f.headers = this.createBareHeaders(a, h));
				let p = await Jt(this.http + "?cache=" + an(a.toString()), f),
					g = await this.readBareResponse(p),
					y = new Gr(Ja.includes(g.status) ? void 0 : p.body, {
						status: g.status,
						statusText: g.statusText ?? void 0,
						headers: new Headers(g.headers),
					});
				return (y.rawHeaders = g.headers), (y.rawResponse = p), y;
			}
			async readBareResponse(i) {
				if (!i.ok) throw new dt(i.status, await i.json());
				let r = on(i.headers),
					s = {},
					a = r.get("x-bare-status");
				a !== null && (s.status = parseInt(a));
				let n = r.get("x-bare-status-text");
				n !== null && (s.statusText = n);
				let o = r.get("x-bare-headers");
				return o !== null && (s.headers = JSON.parse(o)), s;
			}
			createBareHeaders(i, r, s = [], a = [], n = []) {
				let o = new Headers();
				o.set("x-bare-url", i.toString()),
					o.set("x-bare-headers", JSON.stringify(r));
				for (let u of s) o.append("x-bare-forward-headers", u);
				for (let u of a) o.append("x-bare-pass-headers", u);
				for (let u of n) o.append("x-bare-pass-status", u.toString());
				return nn(o), o;
			}
		},
		cn =
			"!#$%&'*+-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz|~";
	function un(e) {
		for (let t = 0; t < e.length; t++) {
			let i = e[t];
			if (!cn.includes(i)) return !1;
		}
		return !0;
	}
	var ln = [["v3", ti]];
	async function Zr(e, t) {
		let i = await Jt(e, { signal: t });
		if (!i.ok)
			throw new Error(
				`Unable to fetch Bare meta: ${i.status} ${await i.text()}`,
			);
		return await i.json();
	}
	var hn = Object.getOwnPropertyDescriptor(ke.prototype, "readyState").get,
		fn = ["ws:", "wss:"],
		$e = class {
			constructor(t, i) {
				re(this, "manifest");
				re(this, "client");
				re(this, "server");
				re(this, "working");
				re(this, "onDemand");
				re(this, "onDemandSignal");
				(this.server = new URL(t)),
					!i || i instanceof AbortSignal
						? ((this.onDemand = !0), (this.onDemandSignal = i))
						: ((this.onDemand = !1), this.loadManifest(i));
			}
			loadManifest(t) {
				return (
					(this.manifest = t),
					(this.client = this.getClient()),
					this.client
				);
			}
			demand() {
				return this.onDemand
					? (this.working ||
							(this.working = Zr(this.server, this.onDemandSignal)
								.then((t) => this.loadManifest(t))
								.catch((t) => {
									throw (delete this.working, t);
								})),
						this.working)
					: this.client;
			}
			getClient() {
				for (let [t, i] of ln)
					if (this.manifest.versions.includes(t))
						return new i(this.server);
				throw new Error(
					"Unable to find compatible client version. Starting from v2.0.0, @tomphttp/bare-client only supports Bare servers v3+. For more information, see https://github.com/tomphttp/bare-client/",
				);
			}
			createWebSocket(t, i = [], r) {
				if (!this.client)
					throw new TypeError(
						"You need to wait for the client to finish fetching the manifest before creating any WebSockets. Try caching the manifest data before making this request.",
					);
				try {
					t = new URL(t);
				} catch {
					throw new DOMException(
						`Faiiled to construct 'WebSocket': The URL '${t}' is invalid.`,
					);
				}
				if (!fn.includes(t.protocol))
					throw new DOMException(
						`Failed to construct 'WebSocket': The URL's scheme must be either 'ws' or 'wss'. '${t.protocol}' is not allowed.`,
					);
				Array.isArray(i) || (i = [i]), (i = i.map(String));
				for (let f of i)
					if (!un(f))
						throw new DOMException(
							`Failed to construct 'WebSocket': The subprotocol '${f}' is invalid.`,
						);
				let s = this.client.connect(
						t,
						i,
						async () => {
							let f =
									typeof r.headers == "function"
										? await r.headers()
										: r.headers || {},
								p =
									f instanceof Headers
										? Object.fromEntries(f)
										: f;
							return (
								(p.Host = t.host),
								(p.Pragma = "no-cache"),
								(p["Cache-Control"] = "no-cache"),
								(p.Upgrade = "websocket"),
								(p.Connection = "Upgrade"),
								p
							);
						},
						(f) => {
							(a = f.protocol),
								r.setCookiesCallback &&
									r.setCookiesCallback(f.setCookies);
						},
						(f) => {
							n = f;
						},
						r.webSocketImpl || ke,
					),
					a = "",
					n = Ee.CONNECTING,
					o = () => {
						let f = hn.call(s);
						return f === Ee.OPEN ? n : f;
					};
				r.readyStateHook
					? r.readyStateHook(s, o)
					: Object.defineProperty(s, "readyState", {
							get: o,
							configurable: !0,
							enumerable: !0,
						});
				let u = () => {
					if (o() === Ee.CONNECTING)
						return new DOMException(
							"Failed to execute 'send' on 'WebSocket': Still in CONNECTING state.",
						);
				};
				r.sendErrorHook
					? r.sendErrorHook(s, u)
					: (s.send = function (...f) {
							let p = u();
							if (p) throw p;
							Ee.prototype.send.call(this, ...f);
						}),
					r.urlHook
						? r.urlHook(s, t)
						: Object.defineProperty(s, "url", {
								get: () => t.toString(),
								configurable: !0,
								enumerable: !0,
							});
				let h = () => a;
				return (
					r.protocolHook
						? r.protocolHook(s, h)
						: Object.defineProperty(s, "protocol", {
								get: h,
								configurable: !0,
								enumerable: !0,
							}),
					s
				);
			}
			async fetch(t, i) {
				let r = pn(t) ? new Qa(t, i) : t,
					s = i?.headers || r.headers,
					a = s instanceof Headers ? Object.fromEntries(s) : s,
					n = i?.duplex,
					o = i?.body || r.body,
					u = new URL(r.url),
					h = await this.demand();
				for (let f = 0; ; f++) {
					"host" in a ? (a.host = u.host) : (a.Host = u.host);
					let p = await h.request(
						r.method,
						a,
						o,
						u,
						r.cache,
						n,
						r.signal,
					);
					p.finalURL = u.toString();
					let g = i?.redirect || r.redirect;
					if (Za.includes(p.status))
						switch (g) {
							case "follow": {
								let y = p.headers.get("location");
								if (Ya > f && y !== null) {
									u = new URL(y, u);
									continue;
								} else throw new TypeError("Failed to fetch");
							}
							case "error":
								throw new TypeError("Failed to fetch");
							case "manual":
								return p;
						}
					else return p;
				}
			}
		};
	function pn(e) {
		return typeof e == "string" || e instanceof URL;
	}
	async function Xr(e, t) {
		let i = await Zr(e, t);
		return new $e(e, i);
	}
	var Rn = Ae(es(), 1),
		hs = Ae(is(), 1);
	var { stringify: Cn } = JSON;
	if (!String.prototype.repeat)
		throw new Error(
			"String.prototype.repeat is undefined, see https://github.com/davidbonnet/astring#installation",
		);
	if (!String.prototype.endsWith)
		throw new Error(
			"String.prototype.endsWith is undefined, see https://github.com/davidbonnet/astring#installation",
		);
	var xt = {
			"||": 2,
			"??": 3,
			"&&": 4,
			"|": 5,
			"^": 6,
			"&": 7,
			"==": 8,
			"!=": 8,
			"===": 8,
			"!==": 8,
			"<": 9,
			">": 9,
			"<=": 9,
			">=": 9,
			in: 9,
			instanceof: 9,
			"<<": 10,
			">>": 10,
			">>>": 10,
			"+": 11,
			"-": 11,
			"*": 12,
			"%": 12,
			"/": 12,
			"**": 13,
		},
		fe = 17,
		kn = {
			ArrayExpression: 20,
			TaggedTemplateExpression: 20,
			ThisExpression: 20,
			Identifier: 20,
			PrivateIdentifier: 20,
			Literal: 18,
			TemplateLiteral: 20,
			Super: 20,
			SequenceExpression: 20,
			MemberExpression: 19,
			ChainExpression: 19,
			CallExpression: 19,
			NewExpression: 19,
			ArrowFunctionExpression: fe,
			ClassExpression: fe,
			FunctionExpression: fe,
			ObjectExpression: fe,
			UpdateExpression: 16,
			UnaryExpression: 15,
			AwaitExpression: 15,
			BinaryExpression: 14,
			LogicalExpression: 13,
			ConditionalExpression: 4,
			AssignmentExpression: 3,
			YieldExpression: 2,
			RestElement: 1,
		};
	function Te(e, t) {
		let { generator: i } = e;
		if ((e.write("("), t != null && t.length > 0)) {
			i[t[0].type](t[0], e);
			let { length: r } = t;
			for (let s = 1; s < r; s++) {
				let a = t[s];
				e.write(", "), i[a.type](a, e);
			}
		}
		e.write(")");
	}
	function us(e, t, i, r) {
		let s = e.expressionsPrecedence[t.type];
		if (s === fe) return !0;
		let a = e.expressionsPrecedence[i.type];
		return s !== a
			? (!r && s === 15 && a === 14 && i.operator === "**") || s < a
			: s !== 13 && s !== 14
				? !1
				: t.operator === "**" && i.operator === "**"
					? !r
					: s === 13 &&
						  a === 13 &&
						  (t.operator === "??" || i.operator === "??")
						? !0
						: r
							? xt[t.operator] <= xt[i.operator]
							: xt[t.operator] < xt[i.operator];
	}
	function yt(e, t, i, r) {
		let { generator: s } = e;
		us(e, t, i, r)
			? (e.write("("), s[t.type](t, e), e.write(")"))
			: s[t.type](t, e);
	}
	function Sn(e, t, i, r) {
		let s = t.split(`
`),
			a = s.length - 1;
		if ((e.write(s[0].trim()), a > 0)) {
			e.write(r);
			for (let n = 1; n < a; n++) e.write(i + s[n].trim() + r);
			e.write(i + s[a].trim());
		}
	}
	function X(e, t, i, r) {
		let { length: s } = t;
		for (let a = 0; a < s; a++) {
			let n = t[a];
			e.write(i),
				n.type[0] === "L"
					? e.write(
							"// " +
								n.value.trim() +
								`
`,
							n,
						)
					: (e.write("/*"), Sn(e, n.value, i, r), e.write("*/" + r));
		}
	}
	function En(e) {
		let t = e;
		for (; t != null; ) {
			let { type: i } = t;
			if (i[0] === "C" && i[1] === "a") return !0;
			if (i[0] === "M" && i[1] === "e" && i[2] === "m") t = t.object;
			else return !1;
		}
	}
	function ai(e, t) {
		let { generator: i } = e,
			{ declarations: r } = t;
		e.write(t.kind + " ");
		let { length: s } = r;
		if (s > 0) {
			i.VariableDeclarator(r[0], e);
			for (let a = 1; a < s; a++)
				e.write(", "), i.VariableDeclarator(r[a], e);
		}
	}
	var rs,
		ss,
		as,
		ns,
		os,
		cs,
		An = {
			Program(e, t) {
				let i = t.indent.repeat(t.indentLevel),
					{ lineEnd: r, writeComments: s } = t;
				s && e.comments != null && X(t, e.comments, i, r);
				let a = e.body,
					{ length: n } = a;
				for (let o = 0; o < n; o++) {
					let u = a[o];
					s && u.comments != null && X(t, u.comments, i, r),
						t.write(i),
						this[u.type](u, t),
						t.write(r);
				}
				s &&
					e.trailingComments != null &&
					X(t, e.trailingComments, i, r);
			},
			BlockStatement: (cs = function (e, t) {
				let i = t.indent.repeat(t.indentLevel++),
					{ lineEnd: r, writeComments: s } = t,
					a = i + t.indent;
				t.write("{");
				let n = e.body;
				if (n != null && n.length > 0) {
					t.write(r),
						s && e.comments != null && X(t, e.comments, a, r);
					let { length: o } = n;
					for (let u = 0; u < o; u++) {
						let h = n[u];
						s && h.comments != null && X(t, h.comments, a, r),
							t.write(a),
							this[h.type](h, t),
							t.write(r);
					}
					t.write(i);
				} else
					s &&
						e.comments != null &&
						(t.write(r), X(t, e.comments, a, r), t.write(i));
				s &&
					e.trailingComments != null &&
					X(t, e.trailingComments, a, r),
					t.write("}"),
					t.indentLevel--;
			}),
			ClassBody: cs,
			StaticBlock(e, t) {
				t.write("static "), this.BlockStatement(e, t);
			},
			EmptyStatement(e, t) {
				t.write(";");
			},
			ExpressionStatement(e, t) {
				let i = t.expressionsPrecedence[e.expression.type];
				i === fe || (i === 3 && e.expression.left.type[0] === "O")
					? (t.write("("),
						this[e.expression.type](e.expression, t),
						t.write(")"))
					: this[e.expression.type](e.expression, t),
					t.write(";");
			},
			IfStatement(e, t) {
				t.write("if ("),
					this[e.test.type](e.test, t),
					t.write(") "),
					this[e.consequent.type](e.consequent, t),
					e.alternate != null &&
						(t.write(" else "),
						this[e.alternate.type](e.alternate, t));
			},
			LabeledStatement(e, t) {
				this[e.label.type](e.label, t),
					t.write(": "),
					this[e.body.type](e.body, t);
			},
			BreakStatement(e, t) {
				t.write("break"),
					e.label != null &&
						(t.write(" "), this[e.label.type](e.label, t)),
					t.write(";");
			},
			ContinueStatement(e, t) {
				t.write("continue"),
					e.label != null &&
						(t.write(" "), this[e.label.type](e.label, t)),
					t.write(";");
			},
			WithStatement(e, t) {
				t.write("with ("),
					this[e.object.type](e.object, t),
					t.write(") "),
					this[e.body.type](e.body, t);
			},
			SwitchStatement(e, t) {
				let i = t.indent.repeat(t.indentLevel++),
					{ lineEnd: r, writeComments: s } = t;
				t.indentLevel++;
				let a = i + t.indent,
					n = a + t.indent;
				t.write("switch ("),
					this[e.discriminant.type](e.discriminant, t),
					t.write(") {" + r);
				let { cases: o } = e,
					{ length: u } = o;
				for (let h = 0; h < u; h++) {
					let f = o[h];
					s && f.comments != null && X(t, f.comments, a, r),
						f.test
							? (t.write(a + "case "),
								this[f.test.type](f.test, t),
								t.write(":" + r))
							: t.write(a + "default:" + r);
					let { consequent: p } = f,
						{ length: g } = p;
					for (let y = 0; y < g; y++) {
						let m = p[y];
						s && m.comments != null && X(t, m.comments, n, r),
							t.write(n),
							this[m.type](m, t),
							t.write(r);
					}
				}
				(t.indentLevel -= 2), t.write(i + "}");
			},
			ReturnStatement(e, t) {
				t.write("return"),
					e.argument &&
						(t.write(" "), this[e.argument.type](e.argument, t)),
					t.write(";");
			},
			ThrowStatement(e, t) {
				t.write("throw "),
					this[e.argument.type](e.argument, t),
					t.write(";");
			},
			TryStatement(e, t) {
				if (
					(t.write("try "), this[e.block.type](e.block, t), e.handler)
				) {
					let { handler: i } = e;
					i.param == null
						? t.write(" catch ")
						: (t.write(" catch ("),
							this[i.param.type](i.param, t),
							t.write(") ")),
						this[i.body.type](i.body, t);
				}
				e.finalizer &&
					(t.write(" finally "),
					this[e.finalizer.type](e.finalizer, t));
			},
			WhileStatement(e, t) {
				t.write("while ("),
					this[e.test.type](e.test, t),
					t.write(") "),
					this[e.body.type](e.body, t);
			},
			DoWhileStatement(e, t) {
				t.write("do "),
					this[e.body.type](e.body, t),
					t.write(" while ("),
					this[e.test.type](e.test, t),
					t.write(");");
			},
			ForStatement(e, t) {
				if ((t.write("for ("), e.init != null)) {
					let { init: i } = e;
					i.type[0] === "V" ? ai(t, i) : this[i.type](i, t);
				}
				t.write("; "),
					e.test && this[e.test.type](e.test, t),
					t.write("; "),
					e.update && this[e.update.type](e.update, t),
					t.write(") "),
					this[e.body.type](e.body, t);
			},
			ForInStatement: (rs = function (e, t) {
				t.write(`for ${e.await ? "await " : ""}(`);
				let { left: i } = e;
				i.type[0] === "V" ? ai(t, i) : this[i.type](i, t),
					t.write(e.type[3] === "I" ? " in " : " of "),
					this[e.right.type](e.right, t),
					t.write(") "),
					this[e.body.type](e.body, t);
			}),
			ForOfStatement: rs,
			DebuggerStatement(e, t) {
				t.write("debugger;", e);
			},
			FunctionDeclaration: (ss = function (e, t) {
				t.write(
					(e.async ? "async " : "") +
						(e.generator ? "function* " : "function ") +
						(e.id ? e.id.name : ""),
					e,
				),
					Te(t, e.params),
					t.write(" "),
					this[e.body.type](e.body, t);
			}),
			FunctionExpression: ss,
			VariableDeclaration(e, t) {
				ai(t, e), t.write(";");
			},
			VariableDeclarator(e, t) {
				this[e.id.type](e.id, t),
					e.init != null &&
						(t.write(" = "), this[e.init.type](e.init, t));
			},
			ClassDeclaration(e, t) {
				if (
					(t.write("class " + (e.id ? `${e.id.name} ` : ""), e),
					e.superClass)
				) {
					t.write("extends ");
					let { superClass: i } = e,
						{ type: r } = i,
						s = t.expressionsPrecedence[r];
					(r[0] !== "C" || r[1] !== "l" || r[5] !== "E") &&
					(s === fe || s < t.expressionsPrecedence.ClassExpression)
						? (t.write("("),
							this[e.superClass.type](i, t),
							t.write(")"))
						: this[i.type](i, t),
						t.write(" ");
				}
				this.ClassBody(e.body, t);
			},
			ImportDeclaration(e, t) {
				t.write("import ");
				let { specifiers: i } = e,
					{ length: r } = i,
					s = 0;
				if (r > 0) {
					for (; s < r; ) {
						s > 0 && t.write(", ");
						let a = i[s],
							n = a.type[6];
						if (n === "D") t.write(a.local.name, a), s++;
						else if (n === "N")
							t.write("* as " + a.local.name, a), s++;
						else break;
					}
					if (s < r) {
						for (t.write("{"); ; ) {
							let a = i[s],
								{ name: n } = a.imported;
							if (
								(t.write(n, a),
								n !== a.local.name &&
									t.write(" as " + a.local.name),
								++s < r)
							)
								t.write(", ");
							else break;
						}
						t.write("}");
					}
					t.write(" from ");
				}
				this.Literal(e.source, t), t.write(";");
			},
			ImportExpression(e, t) {
				t.write("import("),
					this[e.source.type](e.source, t),
					t.write(")");
			},
			ExportDefaultDeclaration(e, t) {
				t.write("export default "),
					this[e.declaration.type](e.declaration, t),
					t.expressionsPrecedence[e.declaration.type] != null &&
						e.declaration.type[0] !== "F" &&
						t.write(";");
			},
			ExportNamedDeclaration(e, t) {
				if ((t.write("export "), e.declaration))
					this[e.declaration.type](e.declaration, t);
				else {
					t.write("{");
					let { specifiers: i } = e,
						{ length: r } = i;
					if (r > 0)
						for (let s = 0; ; ) {
							let a = i[s],
								{ name: n } = a.local;
							if (
								(t.write(n, a),
								n !== a.exported.name &&
									t.write(" as " + a.exported.name),
								++s < r)
							)
								t.write(", ");
							else break;
						}
					t.write("}"),
						e.source &&
							(t.write(" from "), this.Literal(e.source, t)),
						t.write(";");
				}
			},
			ExportAllDeclaration(e, t) {
				e.exported != null
					? t.write("export * as " + e.exported.name + " from ")
					: t.write("export * from "),
					this.Literal(e.source, t),
					t.write(";");
			},
			MethodDefinition(e, t) {
				e.static && t.write("static ");
				let i = e.kind[0];
				(i === "g" || i === "s") && t.write(e.kind + " "),
					e.value.async && t.write("async "),
					e.value.generator && t.write("*"),
					e.computed
						? (t.write("["),
							this[e.key.type](e.key, t),
							t.write("]"))
						: this[e.key.type](e.key, t),
					Te(t, e.value.params),
					t.write(" "),
					this[e.value.body.type](e.value.body, t);
			},
			ClassExpression(e, t) {
				this.ClassDeclaration(e, t);
			},
			ArrowFunctionExpression(e, t) {
				t.write(e.async ? "async " : "", e);
				let { params: i } = e;
				i != null &&
					(i.length === 1 && i[0].type[0] === "I"
						? t.write(i[0].name, i[0])
						: Te(t, e.params)),
					t.write(" => "),
					e.body.type[0] === "O"
						? (t.write("("),
							this.ObjectExpression(e.body, t),
							t.write(")"))
						: this[e.body.type](e.body, t);
			},
			ThisExpression(e, t) {
				t.write("this", e);
			},
			Super(e, t) {
				t.write("super", e);
			},
			RestElement: (as = function (e, t) {
				t.write("..."), this[e.argument.type](e.argument, t);
			}),
			SpreadElement: as,
			YieldExpression(e, t) {
				t.write(e.delegate ? "yield*" : "yield"),
					e.argument &&
						(t.write(" "), this[e.argument.type](e.argument, t));
			},
			AwaitExpression(e, t) {
				t.write("await ", e), yt(t, e.argument, e);
			},
			TemplateLiteral(e, t) {
				let { quasis: i, expressions: r } = e;
				t.write("`");
				let { length: s } = r;
				for (let n = 0; n < s; n++) {
					let o = r[n],
						u = i[n];
					t.write(u.value.raw, u),
						t.write("${"),
						this[o.type](o, t),
						t.write("}");
				}
				let a = i[i.length - 1];
				t.write(a.value.raw, a), t.write("`");
			},
			TemplateElement(e, t) {
				t.write(e.value.raw, e);
			},
			TaggedTemplateExpression(e, t) {
				yt(t, e.tag, e), this[e.quasi.type](e.quasi, t);
			},
			ArrayExpression: (os = function (e, t) {
				if ((t.write("["), e.elements.length > 0)) {
					let { elements: i } = e,
						{ length: r } = i;
					for (let s = 0; ; ) {
						let a = i[s];
						if ((a != null && this[a.type](a, t), ++s < r))
							t.write(", ");
						else {
							a == null && t.write(", ");
							break;
						}
					}
				}
				t.write("]");
			}),
			ArrayPattern: os,
			ObjectExpression(e, t) {
				let i = t.indent.repeat(t.indentLevel++),
					{ lineEnd: r, writeComments: s } = t,
					a = i + t.indent;
				if ((t.write("{"), e.properties.length > 0)) {
					t.write(r),
						s && e.comments != null && X(t, e.comments, a, r);
					let n = "," + r,
						{ properties: o } = e,
						{ length: u } = o;
					for (let h = 0; ; ) {
						let f = o[h];
						if (
							(s && f.comments != null && X(t, f.comments, a, r),
							t.write(a),
							this[f.type](f, t),
							++h < u)
						)
							t.write(n);
						else break;
					}
					t.write(r),
						s &&
							e.trailingComments != null &&
							X(t, e.trailingComments, a, r),
						t.write(i + "}");
				} else
					s
						? e.comments != null
							? (t.write(r),
								X(t, e.comments, a, r),
								e.trailingComments != null &&
									X(t, e.trailingComments, a, r),
								t.write(i + "}"))
							: e.trailingComments != null
								? (t.write(r),
									X(t, e.trailingComments, a, r),
									t.write(i + "}"))
								: t.write("}")
						: t.write("}");
				t.indentLevel--;
			},
			Property(e, t) {
				e.method || e.kind[0] !== "i"
					? this.MethodDefinition(e, t)
					: (e.shorthand ||
							(e.computed
								? (t.write("["),
									this[e.key.type](e.key, t),
									t.write("]"))
								: this[e.key.type](e.key, t),
							t.write(": ")),
						this[e.value.type](e.value, t));
			},
			PropertyDefinition(e, t) {
				if (
					(e.static && t.write("static "),
					e.computed && t.write("["),
					this[e.key.type](e.key, t),
					e.computed && t.write("]"),
					e.value == null)
				) {
					e.key.type[0] !== "F" && t.write(";");
					return;
				}
				t.write(" = "), this[e.value.type](e.value, t), t.write(";");
			},
			ObjectPattern(e, t) {
				if ((t.write("{"), e.properties.length > 0)) {
					let { properties: i } = e,
						{ length: r } = i;
					for (let s = 0; this[i[s].type](i[s], t), ++s < r; )
						t.write(", ");
				}
				t.write("}");
			},
			SequenceExpression(e, t) {
				Te(t, e.expressions);
			},
			UnaryExpression(e, t) {
				if (e.prefix) {
					let {
						operator: i,
						argument: r,
						argument: { type: s },
					} = e;
					t.write(i);
					let a = us(t, r, e);
					!a &&
						(i.length > 1 ||
							(s[0] === "U" &&
								(s[1] === "n" || s[1] === "p") &&
								r.prefix &&
								r.operator[0] === i &&
								(i === "+" || i === "-"))) &&
						t.write(" "),
						a
							? (t.write(i.length > 1 ? " (" : "("),
								this[s](r, t),
								t.write(")"))
							: this[s](r, t);
				} else
					this[e.argument.type](e.argument, t), t.write(e.operator);
			},
			UpdateExpression(e, t) {
				e.prefix
					? (t.write(e.operator),
						this[e.argument.type](e.argument, t))
					: (this[e.argument.type](e.argument, t),
						t.write(e.operator));
			},
			AssignmentExpression(e, t) {
				this[e.left.type](e.left, t),
					t.write(" " + e.operator + " "),
					this[e.right.type](e.right, t);
			},
			AssignmentPattern(e, t) {
				this[e.left.type](e.left, t),
					t.write(" = "),
					this[e.right.type](e.right, t);
			},
			BinaryExpression: (ns = function (e, t) {
				let i = e.operator === "in";
				i && t.write("("),
					yt(t, e.left, e, !1),
					t.write(" " + e.operator + " "),
					yt(t, e.right, e, !0),
					i && t.write(")");
			}),
			LogicalExpression: ns,
			ConditionalExpression(e, t) {
				let { test: i } = e,
					r = t.expressionsPrecedence[i.type];
				r === fe || r <= t.expressionsPrecedence.ConditionalExpression
					? (t.write("("), this[i.type](i, t), t.write(")"))
					: this[i.type](i, t),
					t.write(" ? "),
					this[e.consequent.type](e.consequent, t),
					t.write(" : "),
					this[e.alternate.type](e.alternate, t);
			},
			NewExpression(e, t) {
				t.write("new ");
				let i = t.expressionsPrecedence[e.callee.type];
				i === fe ||
				i < t.expressionsPrecedence.CallExpression ||
				En(e.callee)
					? (t.write("("),
						this[e.callee.type](e.callee, t),
						t.write(")"))
					: this[e.callee.type](e.callee, t),
					Te(t, e.arguments);
			},
			CallExpression(e, t) {
				let i = t.expressionsPrecedence[e.callee.type];
				i === fe || i < t.expressionsPrecedence.CallExpression
					? (t.write("("),
						this[e.callee.type](e.callee, t),
						t.write(")"))
					: this[e.callee.type](e.callee, t),
					e.optional && t.write("?."),
					Te(t, e.arguments);
			},
			ChainExpression(e, t) {
				this[e.expression.type](e.expression, t);
			},
			MemberExpression(e, t) {
				let i = t.expressionsPrecedence[e.object.type];
				i === fe || i < t.expressionsPrecedence.MemberExpression
					? (t.write("("),
						this[e.object.type](e.object, t),
						t.write(")"))
					: this[e.object.type](e.object, t),
					e.computed
						? (e.optional && t.write("?."),
							t.write("["),
							this[e.property.type](e.property, t),
							t.write("]"))
						: (e.optional ? t.write("?.") : t.write("."),
							this[e.property.type](e.property, t));
			},
			MetaProperty(e, t) {
				t.write(e.meta.name + "." + e.property.name, e);
			},
			Identifier(e, t) {
				t.write(e.name, e);
			},
			PrivateIdentifier(e, t) {
				t.write(`#${e.name}`, e);
			},
			Literal(e, t) {
				e.raw != null
					? t.write(e.raw, e)
					: e.regex != null
						? this.RegExpLiteral(e, t)
						: e.bigint != null
							? t.write(e.bigint + "n", e)
							: t.write(Cn(e.value), e);
			},
			RegExpLiteral(e, t) {
				let { regex: i } = e;
				t.write(`/${i.pattern}/${i.flags}`, e);
			},
		},
		In = {};
	var ni = class {
		constructor(t) {
			let i = t ?? In;
			(this.output = ""),
				i.output != null
					? ((this.output = i.output),
						(this.write = this.writeToStream))
					: (this.output = ""),
				(this.generator = i.generator != null ? i.generator : An),
				(this.expressionsPrecedence =
					i.expressionsPrecedence != null
						? i.expressionsPrecedence
						: kn),
				(this.indent = i.indent != null ? i.indent : "  "),
				(this.lineEnd =
					i.lineEnd != null
						? i.lineEnd
						: `
`),
				(this.indentLevel =
					i.startingIndentLevel != null ? i.startingIndentLevel : 0),
				(this.writeComments = i.comments ? i.comments : !1),
				i.sourceMap != null &&
					((this.write =
						i.output == null
							? this.writeAndMap
							: this.writeToStreamAndMap),
					(this.sourceMap = i.sourceMap),
					(this.line = 1),
					(this.column = 0),
					(this.lineEndSize =
						this.lineEnd.split(`
`).length - 1),
					(this.mapping = {
						original: null,
						generated: this,
						name: void 0,
						source: i.sourceMap.file || i.sourceMap._file,
					}));
		}
		write(t) {
			this.output += t;
		}
		writeToStream(t) {
			this.output.write(t);
		}
		writeAndMap(t, i) {
			(this.output += t), this.map(t, i);
		}
		writeToStreamAndMap(t, i) {
			this.output.write(t), this.map(t, i);
		}
		map(t, i) {
			if (i != null) {
				let { type: a } = i;
				if (a[0] === "L" && a[2] === "n") {
					(this.column = 0), this.line++;
					return;
				}
				if (i.loc != null) {
					let { mapping: n } = this;
					(n.original = i.loc.start),
						(n.name = i.name),
						this.sourceMap.addMapping(n);
				}
				if (
					(a[0] === "T" && a[8] === "E") ||
					(a[0] === "L" && a[1] === "i" && typeof i.value == "string")
				) {
					let { length: n } = t,
						{ column: o, line: u } = this;
					for (let h = 0; h < n; h++)
						t[h] ===
						`
`
							? ((o = 0), u++)
							: o++;
					(this.column = o), (this.line = u);
					return;
				}
			}
			let { length: r } = t,
				{ lineEnd: s } = this;
			r > 0 &&
				(this.lineEndSize > 0 &&
				(s.length === 1 ? t[r - 1] === s : t.endsWith(s))
					? ((this.line += this.lineEndSize), (this.column = 0))
					: (this.column += r));
		}
		toString() {
			return this.output;
		}
	};
	function ls(e, t) {
		let i = new ni(t);
		return i.generator[e.type](e, i), i.output;
	}
	var oi = class {
			constructor(t) {
				this.mime = Zi;
				this.idb = st;
				this.path = Pn;
				this.acorn = { parse: qr };
				this.bare = { createBareClient: Xr, BareClient: $e };
				this.base64 = { encode: btoa, decode: atob };
				this.estree = { generate: ls };
				this.cookie = Rn;
				this.setCookieParser = hs.parse;
				this.ctx = t;
			}
		},
		fs = oi;
	function ci(e, t, i, r, s = "", a = !1, n = "") {
		if (self.__dynamic$config)
			var o = self.__dynamic$config.mode == "development";
		else var o = !1;
		if (a) {
			var u = [
				{
					nodeName: "script",
					tagName: "script",
					namespaceURI: "http://www.w3.org/1999/xhtml",
					childNodes: [],
					attrs: [
						{
							name: "src",
							value:
								e +
								(o
									? "?" +
										Math.floor(Math.random() * 89999 + 1e4)
									: ""),
						},
					],
				},
				{
					nodeName: "script",
					tagName: "script",
					namespaceURI: "http://www.w3.org/1999/xhtml",
					childNodes: [],
					attrs: [
						{
							name: "src",
							value:
								t +
								(o
									? "?" +
										Math.floor(Math.random() * 89999 + 1e4)
									: ""),
						},
					],
				},
			];
			return (
				this.ctx.config.assets.files.inject &&
					u.unshift({
						nodeName: "script",
						tagName: "script",
						namespaceURI: "http://www.w3.org/1999/xhtml",
						childNodes: [],
						attrs: [
							{
								name: "src",
								value:
									this.ctx.config.assets.files.inject +
									(o
										? "?" +
											Math.floor(
												Math.random() * 89999 + 1e4,
											)
										: ""),
							},
						],
					}),
				r &&
					u.unshift({
						nodeName: "script",
						tagName: "script",
						namespaceURI: "http://www.w3.org/1999/xhtml",
						childNodes: [],
						attrs: [
							{
								name: "src",
								value:
									"data:application/javascript;base64," +
									btoa(
										`self.__dynamic$cookies = atob("${btoa(r)}");document.currentScript?.remove();`,
									),
							},
						],
					}),
				s &&
					u.unshift({
						nodeName: "script",
						tagName: "script",
						namespaceURI: "http://www.w3.org/1999/xhtml",
						childNodes: [],
						attrs: [
							{
								name: "src",
								value:
									"data:application/javascript;base64," +
									btoa(
										s +
											";document.currentScript?.remove();",
									),
							},
						],
					}),
				n &&
					u.unshift({
						nodeName: "script",
						tagName: "script",
						namespaceURI: "http://www.w3.org/1999/xhtml",
						childNodes: [],
						attrs: [
							{
								name: "src",
								value:
									"data:application/javascript;base64," +
									btoa(
										n +
											";document.currentScript?.remove();",
									),
							},
						],
					}),
				u
			);
		} else {
			var h = [
				`<script src="${t + (o ? "?" + Math.floor(Math.random() * 89999 + 1e4) : "")}"><\/script>`,
				`<script src="${e + (o ? "?" + Math.floor(Math.random() * 89999 + 1e4) : "")}"><\/script>`,
			];
			return (
				this.ctx.config.assets.files.inject &&
					h.unshift(
						`<script src="${this.ctx.config.assets.files.inject + (o ? "?" + Math.floor(Math.random() * 89999 + 1e4) : "")}"><\/script>`,
					),
				r &&
					h.unshift(
						`<script src="${"data:application/javascript;base64," + btoa(`self.__dynamic$cookies = atob("${btoa(r)}");document.currentScript?.remove();`)}"><\/script>`,
					),
				s &&
					h.unshift(
						`<script src="${"data:application/javascript;base64," + btoa(s + ";document.currentScript?.remove();")}"><\/script>`,
					),
				n &&
					h.unshift(
						`<script src="${"data:application/javascript;base64," + btoa(n + ";document.currentScript?.remove();")}"><\/script>`,
					),
				h
			);
		}
	}
	var ze = class {
		constructor(t) {
			this.generateHead = ci;
			this.config = [
				{ elements: "all", tags: ["style"], action: "css" },
				{
					elements: [
						"script",
						"iframe",
						"embed",
						"input",
						"track",
						"media",
						"source",
						"img",
						"a",
						"link",
						"area",
						"form",
						"object",
					],
					tags: ["src", "href", "action", "data"],
					action: "url",
				},
				{
					elements: ["source", "img"],
					tags: ["srcset"],
					action: "srcset",
				},
				{
					elements: ["script", "link"],
					tags: ["integrity"],
					action: "rewrite",
					new: "nointegrity",
				},
				{
					elements: ["script", "link"],
					tags: ["nonce"],
					action: "rewrite",
					new: "nononce",
				},
				{
					elements: ["meta"],
					tags: ["http-equiv"],
					action: "http-equiv",
				},
				{ elements: ["iframe"], tags: ["srcdoc"], action: "html" },
				{ elements: ["link"], tags: ["imagesrcset"], action: "srcset" },
				{ elements: "all", tags: ["onclick"], action: "js" },
			];
			this.ctx = t.ctx;
		}
		generateRedirect(t) {
			return `
<HTML><HEAD><meta http-equiv="content-type" content="text/html;charset=utf-8">
<TITLE>301 Moved</TITLE></HEAD><BODY>
<H1>301 Moved</H1>
The document has moved
<A HREF="${t}">here</A>.
</BODY></HTML>
    `;
		}
		iterate(t, i) {
			function r(s = t) {
				for (var a = 0; a < s.childNodes.length; a++)
					i(s.childNodes[a]),
						s.childNodes[a].childNodes &&
							s.childNodes[a].childNodes.length &&
							r(s.childNodes[a]);
			}
			r(t);
		}
		rewrite(t, i, r = []) {
			return (
				Array.isArray(t) && (t = t[0]),
				t &&
					((t = t.toString()),
					t.match(/<\!DOCTYPE[^>]*>/gi) ||
						(t = "<!DOCTYPE html>" + t),
					t
						.replace(
							/(<!DOCTYPE html>|<html(.*?)>)/im,
							`$1${r.join("")}
`,
						)
						.replace(/<(script|link)\b[^>]*>/g, (s, a) =>
							s
								.replace(/\snonce\s*=\s*"[^"]*"/, (n) =>
									n.replace("nonce", "nononce"),
								)
								.replace(/\sintegrity\s*=\s*"[^"]*"/, (n) =>
									n.replace("integrity", "nointegrity"),
								),
						))
			);
		}
	};
	var qe = class {
		constructor(t) {
			this.ctx = t.ctx;
		}
		rewrite(t, i, r = {}) {
			return (
				t &&
				t
					.toString()
					.replace(
						/(?:@import\s?|url\(?)['"]?(.*?)['")]/gim,
						(...s) => {
							try {
								return s[0].replace(
									s[3],
									this.ctx.url.encode(s[3], i),
								);
							} catch {
								return s[0];
							}
						},
					)
			);
		}
	};
	function ui(e, t) {
		if (typeof e != "object" || !t) return;
		i(e, null, t);
		function i(r, s, a) {
			if (!(typeof r != "object" || !a)) {
				(r.parent = s), a(r, s, a);
				for (let n in r)
					n !== "parent" &&
						(Array.isArray(r[n])
							? r[n].forEach((o) => {
									o && i(o, r, a);
								})
							: r[n] && i(r[n], r, a));
				typeof r.iterateEnd == "function" && r.iterateEnd();
			}
		}
	}
	function li(e, t = {}, i, r) {
		var s = this.ctx.modules.acorn.parse(e.toString(), {
			sourceType: t.module ? "module" : "script",
			allowImportExportEverywhere: !0,
			allowAwaitOutsideFunction: !0,
			allowReturnOutsideFunction: !0,
			ecmaVersion: "latest",
			preserveParens: !1,
			loose: !0,
			allowReserved: !0,
		});
		return (
			this.iterate(s, (a, n = null) => {
				this.emit(a, a.type, n, i, r, t);
			}),
			(e = this.ctx.modules.estree.generate(s)),
			e
		);
	}
	function hi(e, t = {}) {
		if (typeof e.name != "string") return !1;
		if (e.__dynamic !== !0) {
			if (
				![
					"parent",
					"top",
					"postMessage",
					"opener",
					"window",
					"self",
					"globalThis",
					"parent",
					"location",
				].includes(e.name)
			)
				return !1;
			if (
				!(t.type == "CallExpression" && t.callee == e) &&
				!(
					t.type == "MemberExpression" &&
					t.object !== e &&
					!["document", "window", "self", "globalThis"].includes(
						t.object.name,
					)
				) &&
				t.type != "FunctionDeclaration" &&
				t.type != "VariableDeclaration" &&
				!(t.type == "VariableDeclarator" && t.id == e) &&
				t.type != "LabeledStatement" &&
				!(t.type == "Property" && t.key == e) &&
				!(
					t.type == "ArrowFunctionExpression" && t.params.includes(e)
				) &&
				!(t.type == "FunctionExpression" && t.params.includes(e)) &&
				!(t.type == "FunctionExpression" && t.id == e) &&
				!(t.type == "CatchClause" && t.param == e) &&
				t.type != "ContinueStatement" &&
				t.type != "BreakStatement" &&
				!(t.type == "AssignmentExpression" && t.left == e) &&
				t.type != "UpdateExpression" &&
				t.type != "UpdateExpression" &&
				!(t.type == "ForInStatement" && t.left == e) &&
				!(t.type == "MethodDefinition" && t.key == e) &&
				!(t.type == "AssignmentPattern" && t.left == e) &&
				t.type != "NewExpression" &&
				t?.parent?.type != "NewExpression" &&
				!(t.type == "UnaryExpression" && t.argument == e) &&
				!(t.type == "Property" && t.shorthand == !0 && t.value == e)
			) {
				if (e.name == "__dynamic") return (e.name = "undefined");
				if (e.name == "eval" && t.right !== e)
					return (e.name = "__dynamic$eval");
				e.name = `dg$(${e.name})`;
			}
		}
	}
	function Be(e, t = {}) {
		Object.entries({
			type: "CallExpression",
			callee: {
				type: "MemberExpression",
				object: { type: "Identifier", name: "self" },
				property: { type: "Identifier", name: "__dynamic$message" },
			},
			arguments: [
				e.object || e,
				{ type: "Identifier", name: "self", __dynamic: !0 },
			],
		}).forEach(([i, r]) => (e[i] = r));
	}
	function fi(e, t = {}, i = {}) {
		if (
			((e.object.name += ""),
			t.type !== "AssignmentExpression" && t.left !== e)
		) {
			if (
				e.property.value == "postMessage" &&
				t.type == "CallExpression" &&
				t.callee == e
			)
				return Be(e, t);
			if (
				e.object.value == "postMessage" &&
				t.type == "CallExpression" &&
				t.callee == e
			)
				return Be(e, t);
			if (
				(e.property.name == "postMessage" ||
					e.object.name == "postMessage") &&
				e.object.type !== "Super"
			) {
				var r = e.object?.name;
				(e.type = "CallExpression"),
					(e.callee = {
						type: "Identifier",
						name: "__dynamic$message",
					}),
					(e.arguments = [
						{ type: "Identifier", name: r },
						{ type: "Identifier", name: "self", __dynamic: !0 },
					]),
					t.type == "CallExpression" && (t.arguments = t.arguments);
				return;
			}
		}
		if (
			(e.property.name == "eval" && (e.property.name = "__dynamic$eval"),
			e.object.name == "eval" && (e.object.name = "__dynamic$eval"),
			i.destination !== "worker" &&
				(e.property.name == "window" &&
					e.object.name != "top" &&
					(e.object.name == "self" ||
						e.object.name == "globalThis") &&
					t.type !== "NewExpression" &&
					(t.type !== "CallExpression" ||
						(t.type == "CallExpression" && e !== t.callee)) &&
					(e.property.name = "__dynamic$window"),
				e.object.name == "top" &&
					t.type !== "NewExpression" &&
					(t.type !== "CallExpression" ||
						(t.type == "CallExpression" && e !== t.callee)) &&
					(e.object.name = "top.__dynamic$window"),
				e.property.name == "top" &&
					(e.object.name == "self" ||
						e.object.name == "globalThis") &&
					t.type !== "NewExpression" &&
					(t.type !== "CallExpression" ||
						(t.type == "CallExpression" && e !== t.callee)) &&
					(e.property.name = "top.__dynamic$window"),
				t.type !== "NewExpression" &&
					(t.type !== "CallExpression" ||
						(t.type == "CallExpression" && e !== t.callee)) &&
					(e.object.name == "window" &&
						(e.object = {
							type: "CallExpression",
							callee: { type: "Identifier", name: "dg$" },
							arguments: [e.object],
							__dynamic: !0,
						}),
					e.object.name == "parent" &&
						(e.object = {
							type: "CallExpression",
							callee: { type: "Identifier", name: "dg$" },
							arguments: [e.object],
							__dynamic: !0,
						}),
					e.property.name == "__dynamic" &&
						(e.property.name = "undefined"),
					e.object.name == "self" &&
						(e.object = {
							type: "CallExpression",
							callee: { type: "Identifier", name: "dg$" },
							arguments: [e.object],
							__dynamic: !0,
						}),
					e.object.name == "document" &&
						(e.object = {
							type: "CallExpression",
							callee: { type: "Identifier", name: "dg$" },
							arguments: [e.object],
							__dynamic: !0,
						}),
					e.object.name == "globalThis" &&
						(e.object = {
							type: "CallExpression",
							callee: { type: "Identifier", name: "dg$" },
							arguments: [e.object],
							__dynamic: !0,
						})),
				e.object.name == "location" &&
					(e.object = {
						type: "CallExpression",
						callee: { type: "Identifier", name: "dg$" },
						arguments: [e.object],
						__dynamic: !0,
					}),
				e.property.name == "location" &&
					t.type !== "BinaryExpression" &&
					t.type !== "AssignmentExpression"))
		) {
			(e.property.__dynamic = !0), (e.__dynamic = !0);
			let s = Object.assign({}, e);
			(e.type = "CallExpression"),
				(e.callee = { type: "Identifier", name: "dg$", __dynamic: !0 }),
				(e.arguments = [s]),
				(e.__dynamic = !0);
		}
		e.computed &&
			i.destination !== "worker" &&
			(e.property = {
				type: "CallExpression",
				callee: { type: "Identifier", name: "dp$" },
				arguments: [e.property],
				__dynamic: !0,
			});
	}
	function pi(e, t = {}) {
		if (
			!(e.value instanceof String) ||
			(e.value == "__dynamic" && (e.value = "undefined"),
			!["location", "parent", "top", "postMessage"].includes(e.value))
		)
			return !1;
		e.value == "postMessage" &&
			t.type != "AssignmentExpression" &&
			t.left != e &&
			Be(e, t),
			e.value == "location" && (e.value = "__dynamic$location"),
			e.value == "__dynamic" && (e.value = "undefined"),
			e.value == "eval" && (e.value = "__dynamic$eval");
	}
	function vt(e, t = {}) {
		e.__dynamic ||
			(e.arguments.length &&
				((e.arguments = [
					{
						type: "CallExpression",
						callee: {
							type: "Identifier",
							name: "__dynamic$wrapEval",
							__dynamic: !0,
						},
						arguments: e.arguments,
						__dynamic: !0,
					},
				]),
				(e.__dynamic = !0)));
	}
	function di(e, t = {}) {
		if (!(t.type == "AssignmentExpression" && t.left == e)) {
			if (e.callee.type == "Identifier") {
				if (e.callee.name == "postMessage") {
					let i = "undefined";
					(e.callee.type = "CallExpression"),
						(e.callee.callee = {
							type: "Identifier",
							name: "__dynamic$message",
						}),
						(e.callee.arguments = [
							{ type: "Identifier", name: i },
							{ type: "Identifier", name: "self", __dynamic: !0 },
						]);
					return;
				}
				e.callee.name == "eval" && vt(e);
			}
			if (e.callee.type == "MemberExpression") {
				if (
					e.callee.property.name == "postMessage" &&
					e.callee.object.type !== "Super"
				) {
					let i = e.callee.object;
					(e.callee.type = "CallExpression"),
						(e.callee.callee = {
							type: "Identifier",
							name: "__dynamic$message",
						}),
						(e.callee.arguments = [
							i,
							{ type: "Identifier", name: "self", __dynamic: !0 },
						]);
					return;
				}
				e.callee.object.name == "eval" && vt(e);
			}
			e.arguments.length > 0 && e.arguments.length < 4;
			try {
			} catch {}
		}
	}
	function mi(e, t = {}) {
		if (e.left.type == "Identifier") {
			if (e.left.__dynamic === !0) return;
			if (e.left.name == "location") {
				var i = structuredClone(e.left),
					r = structuredClone(e.right);
				(e.right.type = "CallExpression"),
					(e.right.callee = { type: "Identifier", name: "ds$" }),
					(e.right.arguments = [i, r]);
			}
		}
	}
	function gi(e, t = {}) {
		e.parent.type != "ObjectPattern" &&
			e.parent?.parent?.type != "AssignmentExpression" &&
			(e.shorthand = !1);
	}
	function xi(e, t = {}, i = {}, r = {}) {
		if (
			e.type == "Literal" &&
			(t.type == "ImportDeclaration" ||
				t.type == "ExportNamedDeclaration" ||
				t.type == "ExportAllDeclaration")
		) {
			var s = e.value + "";
			(e.value = i.url.encode(e.value, r.meta)),
				(e.raw = e.raw.replace(s, e.value)),
				(e.__dynamic = !0);
		}
		e.type == "ImportExpression" &&
			((e.source = {
				type: "CallExpression",
				callee: { type: "Identifier", name: "__dynamic$import" },
				arguments: [
					e.source,
					{ type: "Literal", __dynamic: !0, value: i.meta.href },
				],
			}),
			(e.__dynamic = !0));
	}
	function yi(e, t = {}) {
		if (e.id.type !== "Identifier") return !1;
		e.id.__dynamic !== !0 && e.id.name != "location";
	}
	function Nn(e, t, i = {}, r = {}, s = {}, a = {}) {
		if (!e.__dynamic) {
			switch (t) {
				case "Identifier":
					hi(e, i);
					break;
				case "MemberExpression":
					fi(e, i, a);
					break;
				case "Literal":
					pi(e, i);
					break;
				case "CallExpression":
					di(e, i);
					break;
				case "AssignmentExpression":
					mi(e, i);
					break;
				case "ThisExpression":
					break;
				case "Property":
					gi(e, i);
					break;
				case "VariableDeclarator":
					yi(e, i);
					break;
				case "CatchClause":
					break;
				default:
					break;
			}
			xi(e, i, r, s);
		}
	}
	var ps = Nn;
	var Ge = class {
		constructor(t) {
			this.iterate = ui;
			this.process = li;
			this.emit = ps;
			this.ctx = t.ctx;
		}
		rewrite(t, i = {}, r = !0, s = {}) {
			if (
				!t ||
				t instanceof Object ||
				((t = t.toString()), t.includes("/* dynamic.js */"))
			)
				return t;
			t = `/* dynamic.js */ 

${t}`;
			try {
				try {
					t = this.process(t, i, { module: !0, ...this.ctx }, s);
				} catch {
					t = this.process(t, i, { module: !1, ...this.ctx }, s);
				}
			} catch {}
			return (
				r &&
					(t = `
      if (typeof self !== undefined && typeof self.importScripts == 'function' && typeof self.__dynamic == 'undefined') importScripts('/dynamic/dynamic.config.js', '/dynamic/dynamic.handler.js?'+Math.floor(Math.random()*(99999-10000)+10000));

      ${t}`),
				t
			);
		}
	};
	var Ke = class {
		constructor(t) {
			this.config = {
				rewrite: [
					["icons", "urlit"],
					["name", " - Dynamic"],
					["start_url", "url"],
					["scope", "url"],
					["short_name", " - Dynamic"],
					["shortcuts", "urlev"],
				],
				delete: ["serviceworker"],
			};
			this.ctx = t.ctx;
		}
		rewrite(t, i) {
			let r = JSON.parse(t);
			for (let o in this.config)
				if (o == "rewrite")
					for (var [s, a] of this.config[o]) {
						if (a == "urlit" && r[s]) {
							for (var n = 0; n < r[s].length; n++)
								r[s][n].src = this.ctx.url.encode(
									r[s][n].src,
									i,
								);
							continue;
						}
						if (a == "urlev" && r[s]) {
							for (var n = 0; n < r[s].length; n++)
								r[s][n].url = this.ctx.url.encode(
									r[s][n].url,
									i,
								);
							continue;
						}
						if (a == "url" && r[s]) {
							r[s] = this.ctx.url.encode(r[s], i);
							continue;
						}
						a == "url" ||
							a == "urlit" ||
							a == "urlev" ||
							(r[s] = r[s] + a);
					}
				else if (o == "delete")
					for (var s of this.config[o]) r[s] && delete r[s];
			return JSON.stringify(r);
		}
	};
	var ds = {
		encode(e, t) {
			return !e || !e.toString()
				? e
				: e
						.split(", ")
						.map((i) =>
							i
								.split(" ")
								.map((r, s) =>
									s == 0
										? t.url.encode(r, t.baseURL || t.meta)
										: r,
								)
								.join(" "),
						)
						.join(", ");
		},
		decode(e) {
			return e;
		},
	};
	var vi = class {
			constructor(t) {
				(this.ctx = t),
					(this.html = new ze(this)),
					(this.srcset = ds),
					(this.js = new Ge(this)),
					(this.css = new qe(this)),
					(this.man = new Ke(this));
			}
		},
		ms = vi;
	async function gs(e) {
		var t;
		if (e.method === "GET") {
			var i = new URL(e.url);
			t = i.searchParams.get("url");
		} else if (e.method === "POST") {
			if (((t = (await e.formData()).get("url")), t === null)) {
				var i = new URL(e.url);
				t = i.searchParams.get("url");
			}
			if (!t)
				return new Response("Error: Invalid or Unfound url", {
					status: 400,
				});
		} else return new Response("Error: Invalid method", { status: 405 });
		return new Response("", {
			status: 301,
			headers: {
				location:
					location.origin +
					this.ctx.config.prefix +
					this.ctx.encoding.encode(t),
			},
		});
	}
	function xs({ url: e }) {
		return !e
			.toString()
			.substr(
				location.origin.length,
				(this.ctx.config.prefix + "route").length,
			)
			.startsWith(this.ctx.config.prefix + "route");
	}
	function bi({ url: e }) {
		return !e
			.toString()
			.substr(location.origin.length, this.ctx.config.prefix.length)
			.startsWith(this.ctx.config.prefix);
	}
	async function wi(e, t, i) {
		for (let s in e) {
			if (
				(this.ctx.headers.csp.indexOf(s.toLowerCase()) !== -1 &&
					delete e[s],
				s.toLowerCase() == "location")
			) {
				e[s] = this.ctx.url.encode(e[s], t);
				continue;
			}
			if (s.toLowerCase() === "set-cookie") {
				Array.isArray(e[s])
					? (e[s] = e[s].map(
							(a) =>
								this.ctx.modules.setCookieParser(a, {
									decodeValues: !1,
								})[0],
						))
					: (e[s] = this.ctx.modules.setCookieParser(e[s], {
							decodeValues: !1,
						}));
				for await (var r of e[s])
					await i.set(
						t.host,
						this.ctx.modules.cookie.serialize(r.name, r.value, {
							...r,
							encode: (a) => a,
						}),
					);
				delete e[s];
				continue;
			}
		}
		return new Headers(e);
	}
	function _i(e, t, i, r) {
		let { referrer: s } = i;
		if (
			(["origin", "Origin", "host", "Host", "referer", "Referer"].forEach(
				(a) => {
					e[a] && delete e[a];
				},
			),
			(e.Origin = `${t.protocol}//${t.host}${t.port ? ":" + t.port : ""}`),
			(e.Host = t.host + (t.port ? ":" + t.port : "")),
			(e.Referer = t.href),
			i.referrerPolicy == "strict-origin-when-cross-origin" &&
				(e.Referer = `${t.protocol}//${t.host}/`),
			i.referrerPolicy == "origin" && t.origin && (s = t.origin + "/"),
			r)
		) {
			switch (i.credentials) {
				case "omit":
					break;
				case "same-origin":
					i.client &&
						t.origin == i.client.__dynamic$location.origin &&
						(e.Cookie = r),
						i.client || (e.Cookie = r);
					break;
				case "include":
					e.Cookie = r;
					break;
				default:
					break;
			}
			e.Cookie = r;
		}
		if (s && s != location.origin + "/")
			try {
				(e.Referer = this.ctx.url.decode(s)),
					i.referrerPolicy == "strict-origin-when-cross-origin" &&
						(e.Referer = new URL(this.ctx.url.decode(s)).origin),
					(e.Origin = new URL(this.ctx.url.decode(s)).origin);
			} catch {}
		return (
			i.client &&
				((e.Origin = i.client.__dynamic$location.origin),
				(e.Referer = i.client.__dynamic$location.href),
				i.referrerPolicy == "strict-origin-when-cross-origin" &&
					(e.Referer = i.client.__dynamic$location.origin)),
			this.ctx.config.tab &&
				this.ctx.config.tab.ua &&
				(delete e["user-agent"],
				delete e["User-Agent"],
				(e["user-agent"] = this.ctx.config.tab.ua)),
			(e["sec-fetch-dest"] = i.destination || "empty"),
			(e["sec-fetch-mode"] = i.mode || "cors"),
			(e["sec-fetch-site"] = i.client
				? i.client.__dynamic$location.origin == t.origin
					? i.client.__dynamic$location.port == t.port
						? "same-origin"
						: "same-site"
					: "cross-origin"
				: "none"),
			i.mode == "navigate" && (e["sec-fetch-site"] = "same-origin"),
			(e["sec-fetch-user"] = "?1"),
			new Headers(e)
		);
	}
	function Ci(e) {
		var t = Object.assign(Object.create(Object.getPrototypeOf(e)), e);
		return t;
	}
	function ki(e) {
		try {
			if (
				(new new Proxy(e, { construct: () => ({}) })(),
				!Object.getOwnPropertyNames(e).includes("arguments"))
			)
				throw new Error("");
			return !0;
		} catch {
			return !1;
		}
	}
	function Si(e) {
		return e.url
			.toString()
			.substr(location.origin.length, e.url.toString().length)
			.startsWith(self.__dynamic$config.assets.prefix);
	}
	async function Ei(e) {
		let t;
		if (self.__dynamic$config.mode !== "development") {
			var i = await caches.open("__dynamic$files");
			i
				? (t = (await i.match(e.url)) || (await fetch(e)))
				: (t = await fetch(e));
		} else t = await fetch(e);
		let r = await t.blob();
		return (
			(e.url.startsWith(location.origin + "/dynamic/dynamic.config.js") ||
				e.url.startsWith(
					location.origin + "/dynamic/dynamic.client.js",
				)) &&
				(r = new Blob(
					[
						`${await r.text()}
self.document?.currentScript?.remove();`,
					],
					{ type: "application/javascript" },
				)),
			new Response(r, {
				headers: t.headers,
				status: t.status,
				statusText: t.statusText,
			})
		);
	}
	async function Ai(e, t) {}
	var Qe = class {
		constructor(t) {
			this.rawHeaders = {};
			this.headers = new Headers({});
			this.status = 200;
			this.statusText = "OK";
			this.body = t;
		}
		async blob() {
			return this.body;
		}
		async text() {
			return await this.body.text();
		}
	};
	function Ii(e) {
		var t = this.ctx.encoding;
		return (
			typeof this.ctx.config.encoding == "object"
				? (t = { ...t, ...this.ctx.encoding })
				: (t = { ...this.ctx.encoding[this.ctx.config.encoding] }),
			(this.ctx.encoding = { ...this.ctx.encoding, ...t }),
			this.ctx.encoding
		);
	}
	function Pi(e, t, i) {
		if (!e.url.startsWith("http")) return e.url;
		let r = e.url.toString();
		return (
			e.url.startsWith(location.origin) &&
				(r = r.substr(self.location.origin.length)),
			(r = new URL(r, new URL(t.__dynamic$location.href)).href),
			this.ctx.url.encode(r, i)
		);
	}
	var Ri = class {
			constructor(t) {
				this.route = gs;
				this.routePath = xs;
				this.path = bi;
				this.resHeader = wi;
				this.reqHeader = _i;
				this.clone = Ci;
				this.class = ki;
				this.file = Si;
				this.edit = Ei;
				this.error = Ai;
				this.encode = Ii;
				this.rewritePath = Pi;
				this.about = Qe;
				this.ctx = t;
			}
		},
		ys = Ri;
	function Ni(e, t) {
		if (!e) return e;
		if (((e = new String(e).toString()), e.startsWith("about:blank")))
			return location.origin + this.ctx.config.prefix + e;
		if (
			(!e.match(this.ctx.regex.ProtocolRegex) &&
				e.match(/^([a-zA-Z0-9\-]+)\:\/\//g)) ||
			e.startsWith("chrome-extension://")
		)
			return e;
		if (
			e.startsWith("javascript:") &&
			!e.startsWith("javascript:__dynamic$eval")
		) {
			let u = new URL(e);
			return `javascript:__dynamic$eval(${JSON.stringify(u.pathname)})`;
		}
		if (e.match(this.ctx.regex.WeirdRegex)) {
			var i = this.ctx.regex.WeirdRegex.exec(e);
			i && (e = i[2]);
		}
		if (
			e.startsWith(location.origin + this.ctx.config.prefix) ||
			e.startsWith(this.ctx.config.prefix) ||
			e.startsWith(
				location.origin + this.ctx.config.assets.prefix + "dynamic.",
			) ||
			e.match(this.ctx.regex.BypassRegex)
		)
			return e;
		if (e.match(this.ctx.regex.DataRegex)) {
			try {
				var i = this.ctx.regex.DataRegex.exec(e);
				if (i) {
					var [r, s, a, n, o] = i;
					n == "base64"
						? (o = this.ctx.modules.base64.atob(
								decodeURIComponent(o),
							))
						: (o = decodeURIComponent(o)),
						s &&
							(s == "text/html"
								? (o = this.ctx.rewrite.html.rewrite(
										o,
										t,
										this.ctx.rewrite.html.generateHead(
											location.origin +
												"/dynamic/dynamic.client.js",
											location.origin +
												"/dynamic/dynamic.config.js",
											"",
											`window.__dynamic$url = "${t.href}"; window.__dynamic$parentURL = "${location.href}";`,
										),
									))
								: s == "text/css"
									? (o = this.ctx.rewrite.css.rewrite(o, t))
									: (s == "text/javascript" ||
											s == "application/javascript") &&
										(o = this.ctx.rewrite.js.rewrite(
											o,
											t,
										))),
						n == "base64"
							? (o = this.ctx.modules.base64.btoa(o))
							: (o = encodeURIComponent(o)),
						a
							? n
								? (e = `data:${s};${a};${n},${o}`)
								: (e = `data:${s};${a},${o}`)
							: n
								? (e = `data:${s};${n},${o}`)
								: (e = `data:${s},${o}`);
				}
			} catch {}
			return e;
		}
		return (
			(e = new String(e).toString()),
			t.href.match(this.ctx.regex.BypassRegex) &&
				(e = new URL(
					e,
					new URL((this.ctx.parent.__dynamic || this.ctx).meta.href),
				).href),
			(e = new URL(e, t.href)),
			(this.ctx._location?.origin ||
				(location.origin == "null"
					? location.ancestorOrigins[0]
					: location.origin)) +
				this.ctx.config.prefix +
				(this.ctx.encoding.encode(e.origin + e.pathname) +
					e.search +
					e.hash)
		);
	}
	function Li(e) {
		if (
			!e ||
			((e = new String(e).toString()),
			e.match(this.ctx.regex.BypassRegex))
		)
			return e;
		var t = e.indexOf(this.ctx.config.prefix);
		if (t == -1) return e;
		try {
			if (
				((e = new URL(e, new URL(self.location.origin)).href),
				(t = e.indexOf(this.ctx.config.prefix)),
				e.slice(t + this.ctx.config.prefix.length).trim() ==
					"about:blank")
			)
				return "about:blank";
			var i = new URL(e).search + new URL(e).hash || "",
				r = new URL(
					this.ctx.encoding.decode(
						e
							.slice(t + this.ctx.config.prefix.length)
							.replace("https://", "https:/")
							.replace("https:/", "https://")
							.split("?")[0],
					),
				);
		} catch {
			return e;
		}
		return (
			(e =
				r.origin +
				r.pathname +
				i +
				(new URL(e).search ? r.search.replace("?", "&") : r.search)),
			e
		);
	}
	var Di = class {
			constructor(t) {
				this.encode = Ni;
				this.decode = Li;
				this.ctx = t;
			}
		},
		vs = Di;
	function Ti(e) {
		e = new URL(e.href);
		for (var t in e) this.ctx.meta[t] = e[t];
		return !0;
	}
	var Ye = class {
		constructor() {}
	};
	var Bi = class extends Ye {
			constructor(i) {
				super();
				this.load = Ti;
				this.ctx = i;
			}
		},
		bs = Bi;
	var Je = class {
		constructor(t = "", i = new Request("")) {
			this.headers = new Headers({});
			this.redirect = "manual";
			this.body = null;
			this.method = "GET";
			i.headers && (this.headers = i.headers),
				i.redirect && (this.redirect = i.redirect),
				i.body && (this.body = i.body),
				(this.method = i.method || "GET"),
				(this.url = new String(t));
		}
		get init() {
			return {
				headers: this.headers || new Headers({}),
				redirect: this.redirect || "manual",
				body: this.body || null,
				method: this.method || "GET",
			};
		}
	};
	var Ze = class extends Response {
		constructor(i = "", r = new Response("")) {
			super(i, r);
			this.status = 200;
			this.statusText = "OK";
			this.headers = new Headers({});
			(this.body = i),
				r.status && (this.status = r.status),
				r.statusText && (this.statusText = r.statusText),
				r.headers && (this.headers = r.headers);
		}
		get init() {
			return {
				headers: this.headers || new Headers({}),
				statusText: this.statusText || 200,
				body: this.body || new Blob([]),
				status: this.statusText || "OK",
			};
		}
	};
	var Oi = class {
			constructor(t) {
				this.Request = Je;
				this.Response = Ze;
				this.ctx = t;
			}
		},
		ws = Oi;
	var Ln = /^(#|about:|mailto:|blob:|javascript:)/g,
		Dn =
			/^data:([a-z\/A-Z0-9\-\+]+);?(charset\=[\-A-Za-z0-9]+)?;?(base64)?[;,]*(.*)/g,
		Tn = /^([\/A-Za-z0-9\-%]+)(http[s]?:\/\/.*)/g,
		Xe = class {
			constructor(t) {
				this.BypassRegex = Ln;
				this.DataRegex = Dn;
				this.WeirdRegex = Tn;
				this.ctx = t;
			}
		};
	var Vi = class {
			constructor(t) {
				this.ctx = t;
			}
		},
		_s = Vi;
	function Mi(e, t = "") {
		return (
			(
				this.ctx.modules.mime.contentType(t || e.pathname) || "text/css"
			).split(";")[0] === "text/css"
		);
	}
	function Fi(e, t = "", i = "") {
		let r;
		return !t && this.ctx.modules.mime.contentType(e.pathname) == e.pathname
			? i.trim().match(/<(html|script|body)[^>]*>/g) &&
					((r = i
						.trim()
						.indexOf(
							(i.trim().match(/<(html|script|body)[^>]*>/g) ||
								[])[0],
						)),
					r > -1 && r < 100)
			: (
					this.ctx.modules.mime.contentType(t || e.pathname) ||
					"text/html"
				).split(";")[0] === "text/html" ||
					i.trim().match(/\<\!(doctype|DOCTYPE) html\>/g);
	}
	function ji(e, t = "") {
		if (e.pathname.endsWith(".js") && t == "text/plain") return !0;
		var i = (
			this.ctx.modules.mime.contentType(t || e.pathname) ||
			"application/javascript"
		).split(";")[0];
		return (
			i == "text/javascript" ||
			i == "application/javascript" ||
			i == "application/x-javascript"
		);
	}
	var Ui = class {
			constructor(t) {
				this.html = Fi;
				this.js = ji;
				this.css = Mi;
				this.ctx = t;
			}
		},
		Cs = Ui;
	function Bn(e, t) {
		return (
			e || (e = []),
			e.find((i) => i.name == t.name)
				? (e[e.findIndex((i) => i.name == t.name)] = {
						name: t.name,
						value: t.value,
						expires: t.expires,
					})
				: e.push({ name: t.name, value: t.value, expires: t.expires }),
			e
		);
	}
	var ve = {
		open: async () =>
			Bt("__dynamic$cookies", 1, {
				async upgrade(e) {
					await e.createObjectStore("__dynamic$cookies");
				},
			}),
		set: async (e, t, i) => {
			if (
				(t.domain && (e = t.domain),
				e.startsWith(".") && (e = e.slice(1)),
				t.expires)
			) {
				var r = new Date(t.expires);
				if (r < new Date()) return ve.remove(e, t, i);
			}
			return (
				await (
					await i
				).put(
					"__dynamic$cookies",
					Bn(await (await i).get("__dynamic$cookies", e), t),
					e,
				),
				!0
			);
		},
		get: async (e, t) => {
			var i = e.replace(/^(.*\.)?([^.]*\..*)$/g, "$2"),
				r = (await (await t).get("__dynamic$cookies", e)) || [];
			if (e !== i && e !== "." + i) {
				var s = await (await t).get("__dynamic$cookies", i);
				if (s)
					for (var { name: a, value: n, expires: o } of s) {
						if (o) {
							var u = new Date(o);
							if (u <= new Date()) {
								ve.remove(
									e,
									s.find(
										(h) =>
											h.name == a &&
											h.value == n &&
											h.expires == o,
									),
									t,
								);
								continue;
							}
						}
						r.find((h) => h.name == a && h.value == n) ||
							r.push({
								name: a,
								value: n,
								expires: o || new Date(1e13),
							});
					}
			}
			return r;
		},
		remove: async (e, t, i) => {
			t.domain && (e = t.domain), e.startsWith(".") && (e = e.slice(1));
			var r = await (await i).get("__dynamic$cookies", e);
			return r
				? ((r = r.filter((s) => s.name !== t.name)),
					await (await i).put("__dynamic$cookies", r, e),
					!0)
				: !1;
		},
		update: async (e, t) => {
			var i = e.replace(/^(.*\.)?([^.]*\..*)$/g, "$2"),
				r = await (await t).get("__dynamic$cookies", i);
			if (r) {
				for (var { name: s, value: a, expires: n } of r)
					if (n) {
						var o = new Date(n);
						if (o <= new Date()) {
							ve.remove(e, { name: s, value: a, expires: n }, t);
							continue;
						}
					}
			}
			return r;
		},
	};
	var ks = (e = []) => e.map((t) => `${t.name}=${t.value}`).join("; ");
	var et = class {
		constructor(t) {
			this.db = ve;
			this.ctx = t;
		}
		async get(t) {
			this._db || (this._db = this.db.open());
			let i = await ve.get(t, this._db);
			return ks(i);
		}
		async set(t, i = "") {
			return (
				(i = this.ctx.modules.setCookieParser.parse(i, {
					decodeValues: !1,
				})[0]),
				this._db || (this._db = this.db.open()),
				await ve.set(t, i, this._db)
			);
		}
		async open() {
			await ve.open();
		}
		async update(t) {
			return (
				this._db || (this._db = this.db.open()),
				await ve.update(t, this._db)
			);
		}
	};
	var Ss = {
		csp: [
			"cross-origin-embedder-policy",
			"cross-origin-opener-policy",
			"cross-origin-resource-policy",
			"content-security-policy",
			"content-security-policy-report-only",
			"expect-ct",
			"feature-policy",
			"origin-isolation",
			"strict-transport-security",
			"upgrade-insecure-requests",
			"x-content-type-options",
			"x-frame-options",
			"x-permitted-cross-domain-policies",
			"x-xss-protection",
		],
		status: { empty: [204, 101, 205, 304] },
		method: { body: ["GET", "HEAD"] },
	};
	var Wi = {};
	qi(Wi, {
		aes: () => Mn,
		base64: () => jn,
		none: () => Fn,
		plain: () => Vn,
		xor: () => On,
	});
	var $i = Ae(js(), 1),
		Ws = Ae(Hs(), 1),
		$s = location.origin + navigator.userAgent,
		On = {
			encode: (e, t = 2) =>
				e &&
				encodeURIComponent(
					e
						.split("")
						.map((i, r) =>
							r % t
								? String.fromCharCode(i.charCodeAt(0) ^ t)
								: i,
						)
						.join(""),
				),
			decode: (e, t = 2) =>
				e &&
				decodeURIComponent(e)
					.split("")
					.map((i, r) =>
						r % t ? String.fromCharCode(i.charCodeAt(0) ^ t) : i,
					)
					.join(""),
		},
		Vn = {
			encode: (e) => e && encodeURIComponent(e),
			decode: (e) => e && decodeURIComponent(e),
		},
		Mn = {
			encode: (e) =>
				e && $i.default.encrypt(e, $s).toString().substring(10),
			decode: (e) =>
				e &&
				$i.default.decrypt("U2FsdGVkX1" + e, $s).toString(Ws.default),
		},
		Fn = { encode: (e) => e, decode: (e) => e },
		jn = {
			encode: (e) => e && decodeURIComponent(btoa(e)),
			decode: (e) => e && atob(e),
		};
	var tt = class {
		constructor(t) {
			this.listeners = [];
			this.modules = new fs(this);
			this.util = new ys(this);
			this.http = new ws(this);
			this.meta = new bs(this);
			this.rewrite = new ms(this);
			this.url = new vs(this);
			this.is = new Cs(this);
			this.cookies = new et(this);
			this.regex = new Xe(this);
			this.headers = Ss;
			this.encoding = Wi;
			this.middleware = new _s(this);
			t && !this.config && (this.config = t), t && this.util.encode(self);
		}
		on(t, i) {
			this.listeners.push({ event: t, cb: i });
		}
		fire(t, i) {
			for (let r of this.listeners)
				if (r.event === t) return (i = r.cb(...i)), i;
			return null;
		}
	};
	(function (e) {
		e.skipWaiting(),
			e.addEventListener("install", async (r, s) => {
				let a = e.__dynamic$config.logLevel || 0;
				if (
					(a > 1 &&
						console[
							e.__dynamic$config.mode == "development"
								? "group"
								: "groupCollapsed"
						]("Dynamic Install Sequence:"),
					typeof e.ORIGINS == "object")
				)
					if (e.ORIGINS.length)
						if (e.ORIGINS[0] == "*")
							console.log("Wildcard Origin Accepted");
						else if (e.ORIGINS.includes(location.origin))
							a > 1 &&
								console.log(
									"Origin Verified: " + location.origin,
								);
						else
							return (
								console.error(
									"Illegal Origin: " + location.origin,
								),
								console.log("Status: Aborting Install"),
								console.groupEnd(),
								await e.registration.unregister()
							);
					else console.warn("Warning: No Origins Specified");
				else
					typeof e.ORIGINS == "string"
						? e.ORIGINS == "*" &&
							a > 1 &&
							console.log("Wildcard Origin Accepted")
						: a > 0 &&
							console.warn("Warning: No Origins Specified");
				a > 1 && console.log("ServiceWorker Installed:", r),
					a > 1 &&
						console.log(
							"Configuration Loaded:",
							e.__dynamic$config,
						),
					await e.skipWaiting(),
					a > 1 && console.groupCollapsed("Loading Dynamic Modules:");
				for await (var n of [["html", "dynamic.html.js"]]) {
					var [o, u] = n;
					(u = new URL(
						u,
						new URL(
							location.origin +
								e.__dynamic$config.assets.prefix +
								"dynamic.worker.js",
						),
					).href),
						(e[o] = fetch(u)
							.then(
								(f) => (
									a > 1 &&
										console.log(
											"Loaded Dynamic Module: " + o,
											f,
										),
									(e[o] = f.text())
								),
							)
							.then((f) => (0, eval)(f))),
						a > 1 && console.log("Loading: " + o, u);
				}
				if (
					(console.groupEnd(),
					e.__dynamic$config.mode == "development")
				)
					return console.groupEnd();
				let h = await caches.open("__dynamic$files");
				a > 1 && console.groupCollapsed("Dynamic File Cache:");
				for await (var n of Object.values(
					e.__dynamic$config.assets.files,
				)) {
					if (!n) continue;
					var u = n;
					u = new URL(
						u,
						new URL(
							location.origin +
								e.__dynamic$config.assets.prefix +
								"dynamic.worker.js",
						),
					).href;
					let g = await fetch(u);
					await h.put(u, g),
						a > 1 &&
							console.log(
								"Cache Installed: " + u.split("/").pop(),
								g,
							);
				}
				console.groupEnd(), console.groupEnd();
			}),
			e.addEventListener("activate", (r) => {
				e.skipWaiting(), r.waitUntil(e.clients.claim());
			}),
			e.addEventListener("message", async (r) => {
				let { data: s } = r;
				if (s.type == "createBlobHandler") {
					var a = new Response(s.blob, {
							headers: {
								"Content-Type": "text/html",
								"Content-Length": s.blob.size,
								"x-dynamic-location": s.location,
							},
						}),
						n = await caches.open("__dynamic$blob"),
						o = t.config.prefix + "caches/" + s.url;
					await n.put(o, a),
						e.clients.matchAll().then((u) => {
							u.forEach((h) => {
								h.postMessage({ url: o });
							});
						});
				}
			}),
			e.__dynamic$config || importScripts("/dynamic/dynamic.config.js");
		let t = new tt(e.__dynamic$config),
			i = e.__dynamic$config.block || [];
		return (
			(t.config = e.__dynamic$config),
			(t.config.bare.path =
				typeof t.config.bare.path == "string"
					? [new URL(t.config.bare.path, e.location)][0]
					: t.config.bare.path.map((r) => new URL(r, e.location))),
			(t.encoding = {
				...t.encoding,
				...t.encoding[t.config.encoding || "none"],
			}),
			(e.__dynamic = t),
			e.Object.defineProperty(
				e.WindowClient.prototype,
				"__dynamic$location",
				{
					get() {
						return new URL(t.url.decode(this.url));
					},
				},
			),
			(e.Dynamic = class {
				constructor(r = e.__dynamic$config) {
					this.listeners = [];
					this.middleware = t.middleware;
					this.on = e.__dynamic.on;
					this.fire = e.__dynamic.fire;
					(t.bare = t.modules.bare.createBareClient(
						t.config.bare.path,
					)),
						(e.__dynamic$config = r);
				}
				async route(r) {
					let { request: s } = r;
					if (s.url.startsWith(t.config.bare.path.toString()))
						return !1;
					if (
						s.url.startsWith(
							location.origin + e.__dynamic$config.prefix,
						)
					)
						return !0;
					if (
						(s.mode !== "navigate" &&
							(s.client = (await e.clients.matchAll()).find(
								(a) => a.id == r.clientId,
							)),
						!s.url.startsWith(
							location.origin + e.__dynamic$config.prefix,
						))
					)
						return s.client
							? !!s.client.url.startsWith(
									location.origin + e.__dynamic$config.prefix,
								)
							: !1;
				}
				async fetch(r) {
					let { request: s } = r;
					try {
						if (
							(s.mode !== "navigate" &&
								(s.client = (await e.clients.matchAll()).find(
									(b) => b.id == r.clientId,
								)),
							t.util.file(s))
						)
							return await t.util.edit(s);
						if (
							s.url.startsWith(
								e.__dynamic$config.bare.path.toString(),
							)
						)
							return await fetch(s);
						if (t.util.path(s)) {
							if (!s.client || !s.url.startsWith("http"))
								return await fetch(s);
							Object.defineProperty(s, "url", {
								value: t.util.rewritePath(
									s,
									s.client,
									new URL(
										e.__dynamic.url.decode(new URL(s.url)),
									),
								),
							});
						}
						if (!t.util.routePath(s)) return await t.util.route(s);
						await t.bare.working;
						let u = new tt(t.config);
						(u.encoding = {
							...u.encoding,
							...u.encoding[t.config.encoding || "none"],
						}),
							(u.on = (b, v) => e.__dynamic.on(b, v)),
							(u.fire = (b, ...v) => e.__dynamic.fire(b, v));
						let h = u.fire("request", [s]);
						if (h) return h;
						if (
							s.url.startsWith(
								location.origin + t.config.prefix + "caches/",
							)
						) {
							let v = await (
								await caches.open("__dynamic")
							).match(new URL(s.url).pathname);
							if (!v) return new Response(null, { status: 201 });
							var a;
							let L = await v.blob(),
								D = await L.text(),
								O = u.rewrite.html.generateHead(
									location.origin +
										e.__dynamic$config.assets.prefix +
										e.__dynamic$config.assets.files.client,
									location.origin +
										e.__dynamic$config.assets.prefix +
										e.__dynamic$config.assets.files.config,
									location.origin +
										e.__dynamic$config.assets.prefix +
										e.__dynamic$config.assets.files.config,
									"",
									`window.__dynamic$url = "${v.headers.get("x-dynamic-location")}"`,
								);
							return (
								u.meta.load(
									new URL(
										v.headers.get("x-dynamic-location"),
									),
								),
								u.is.html(
									u.meta,
									v.headers.get("content-type"),
									D,
								)
									? (a = new Blob([
											u.rewrite.html.rewrite(
												D,
												u.meta,
												O,
											),
										]))
									: (a = L),
								new Response(a, {
									status: v.status,
									statusText: v.statusText,
									headers: v.headers,
								})
							);
						}
						if (
							(u.meta.load(new URL(u.url.decode(new URL(s.url)))),
							i.indexOf(u.meta.host) !== -1 ||
								i.find(
									(b) =>
										b instanceof RegExp &&
										b.test(u.meta.host),
								))
						)
							return (
								this.fire("blocked", [u.meta, s]) ||
								new Response(null, {
									status: 403,
									statusText: "Forbidden",
								})
							);
						let f = u.cookies;
						await f.open(), await f.update(u.meta.host);
						let p = Object.fromEntries(s.headers.entries()),
							g = t.util.reqHeader(
								p,
								u.meta,
								s,
								await f.get(
									s.client
										? s.client.__dynamic$location.host
										: u.meta.host,
								),
							),
							y = new t.http.Request(u.meta.href, {
								headers: g,
								redirect: s.redirect || "manual",
								method: s.method,
								credentials: s.credentials,
								body: null,
								cache: s.cache,
							}),
							m;
						t.headers.method.body.indexOf(s.method.toUpperCase()) ==
							-1 && (y.body = await s.blob()),
							u.meta.protocol !== "about:"
								? (m = await (
										await t.bare
									).fetch(u.meta.href, y.init))
								: (m = new t.util.about(
										new Blob([
											"<html><head></head><body></body></html>",
										]),
									));
						let T = this.fire("fetched", [u.meta, m, s]);
						if (T) return T;
						let I = await u.util.resHeader(m.rawHeaders, u.meta, f);
						var n = await e.clients.matchAll();
						for await (var o of n)
							o.postMessage({
								type: "cookies",
								host: u.meta.host,
								cookies: await f.get(u.meta.host),
							});
						let l = !1;
						switch (s.destination) {
							case "document":
								let b = await m.blob(),
									v = await b.text(),
									L = u.rewrite.html.generateHead(
										location.origin +
											e.__dynamic$config.assets.prefix +
											e.__dynamic$config.assets.files
												.client,
										location.origin +
											e.__dynamic$config.assets.prefix +
											e.__dynamic$config.assets.files
												.config,
										location.origin +
											e.__dynamic$config.assets.prefix +
											e.__dynamic$config.assets.files
												.client,
										await f.get(u.meta.host),
										"",
										!1,
										"self.__dynamic$bare = JSON.parse('" +
											JSON.stringify(
												(await t.bare).manifest,
											) +
											"');",
									);
								u.is.html(
									u.meta,
									m.headers.get("content-type"),
									v,
								)
									? (l = new Blob(
											[
												u.rewrite.html.rewrite(
													v,
													u.meta,
													L,
												),
											],
											{
												type:
													m.headers.get(
														"content-type",
													) ||
													"text/html; charset=utf-8",
											},
										))
									: (l = b);
								break;
							case "iframe": {
								let D = await m.blob(),
									O = await D.text();
								if (
									u.is.html(
										u.meta,
										m.headers.get("content-type"),
										O,
									)
								) {
									try {
										let N = u.rewrite.html.generateHead(
											location.origin +
												e.__dynamic$config.assets
													.prefix +
												e.__dynamic$config.assets.files
													.client,
											location.origin +
												e.__dynamic$config.assets
													.prefix +
												e.__dynamic$config.assets.files
													.config,
											location.origin +
												e.__dynamic$config.assets
													.prefix +
												e.__dynamic$config.assets.files
													.client,
											await f.get(u.meta.host),
											"",
											!0,
											"self.__dynamic$bare = JSON.parse('" +
												JSON.stringify(
													(await t.bare).manifest,
												) +
												"');",
										);
										l = new Blob(
											[
												new (await e.html)({
													ctx: u,
												}).rewrite(O, u.meta, N),
											],
											{
												type:
													m.headers.get(
														"content-type",
													) ||
													"text/html; charset=utf-8",
											},
										);
									} catch {
										l = D;
									}
									break;
								}
								l = D;
								break;
							}
							case "worker":
							case "script":
								u.is.js(
									u.meta,
									m.headers.get("content-type"),
								) &&
									(l = new Blob(
										[
											u.rewrite.js.rewrite(
												await m.text(),
												s,
												!0,
												u,
											),
										],
										{
											type:
												m.headers.get("content-type") ||
												"application/javascript",
										},
									));
								break;
							case "style":
								u.is.css(
									u.meta,
									m.headers.get("content-type"),
								) &&
									(l = new Blob(
										[
											u.rewrite.css.rewrite(
												await m.text(),
												u.meta,
											),
										],
										{
											type:
												m.headers.get("content-type") ||
												"text/css",
										},
									));
								break;
							case "manifest":
								l = new Blob(
									[
										u.rewrite.man.rewrite(
											await m.text(),
											u.meta,
										),
									],
									{
										type:
											m.headers.get("content-type") ||
											"application/json",
									},
								);
								break;
							default: {
								let D = await m.blob(),
									O = await D.text();
								if (
									u.is.html(
										u.meta,
										m.headers.get("content-type"),
										O,
									)
								) {
									try {
										l = new Blob(
											[
												new (await e.html)({
													ctx: u,
												}).rewrite(O, u.meta, []),
											],
											{
												type:
													m.headers.get(
														"content-type",
													) ||
													"text/html; charset=utf-8",
											},
										);
									} catch {
										l = D;
									}
									break;
								}
								l = D;
								break;
							}
						}
						l == !1 && (l = await m.blob()),
							t.headers.status.empty.indexOf(m.status) !== -1 &&
								(l = null),
							g.get("accept") === "text/event-stream" &&
								I.set("content-type", "text/event-stream"),
							l && I.set("content-length", l.size);
						let d = this.fire("response", [u.meta, m, s, I, l]);
						return (
							d ||
							new Response(l, {
								status: m.status,
								statusText: m.statusText,
								headers: I,
							})
						);
					} catch (u) {
						return (
							e.__dynamic$config.logLevel >= 1 &&
								console.error(u),
							new Response(u, {
								status: 500,
								statusText: "error",
								headers: new Headers({}),
							})
						);
					}
				}
			})
		);
	})(self);
})();
/*! Bundled license information:

cookie/index.js:
  (*!
   * cookie
   * Copyright(c) 2012-2014 Roman Shtylman
   * Copyright(c) 2015 Douglas Christopher Wilson
   * MIT Licensed
   *)
*/
//# sourceMappingURL=dynamic.worker.js.map
