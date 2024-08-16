module.exports = {
	globDirectory: 'public/',
	globPatterns: [
		'**/*.{html,css,js,json}'
	],
	swDest: 'public/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};