import globals from "globals";
import pluginJs from "@eslint/js";
import pluginPrettier from "eslint-plugin-prettier";

export default [
	{
		languageOptions: {
			globals: globals.browser,
			parserOptions: {
				ecmaVersion: "latest",
				sourceType: "module",
			},
		},
		ignores: [
			"node_modules/",
			"dist/",
			"public/",
			"**/*.min.js",
			"coverage/",
			"**/*.test.js",
			"index.js",
			"ripper/*.js",
		],
	},
	pluginJs.configs.recommended,
	{
		plugins: {
			prettier: pluginPrettier,
		},
		rules: {
			"prettier/prettier": ["error"],
		},
	},
];
