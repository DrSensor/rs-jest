import {dirname} from "path"
import pkg from "./package.json"
import prc from "./.prettierrc.json"

import commonjs from "rollup-plugin-commonjs"
import resolve from "rollup-plugin-node-resolve"
import autoExternal from "rollup-plugin-auto-external"
import babel from "rollup-plugin-babel"
import prettier from "rollup-plugin-prettier"

// #region helper
let {overrides, ...options} = prc
const prettierrc = {
	options: options,
	files: files => overrides.find(p => p.files === files).options
}
// #endregion

// Rollup Configuration
export default [
	{
		input: {
			index: "src/main.js",
			cargo: "node_modules/rust-native-wasm-loader/dist/cargo.js"
		},
		output: {
			dir: dirname(pkg.main),
			format: "cjs",
			exports: "named"
		},
		experimentalCodeSplitting: true,
		plugins: [
			resolve(),
			babel(),
			commonjs(),
			autoExternal(),
			prettier(prettierrc.files("*.js"))
		]
	}
]
