module.exports = {
	testEnvironment: "node",
	globals: {
		"rs-jest": {
			export: "buffer"
		}
	},
	transform: {
		"^.+\\.rs$": "<rootDir>../../../dist/index.js"
	}
}
