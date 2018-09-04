const {rsJestScriptPath} = require("../utils")

module.exports = {
	testEnvironment: "node",
	globals: {
		"rs-jest": {
			export: "async-module"
		}
	},
	transform: {
		"^.+\\.rs$": rsJestScriptPath
	}
}
