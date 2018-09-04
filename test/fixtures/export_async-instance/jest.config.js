const {rsJestScriptPath} = require("../utils")

module.exports = {
	testEnvironment: "node",
	globals: {
		"rs-jest": {
			export: "async-instance"
		}
	},
	transform: {
		"^.+\\.rs$": rsJestScriptPath
	}
}
