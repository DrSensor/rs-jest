const {rsJestScriptPath} = require("../utils")

module.exports = {
	testEnvironment: "node",
	globals: {
		"rs-jest": {
			export: "async"
		}
	},
	transform: {
		"^.+\\.rs$": rsJestScriptPath
	}
}
