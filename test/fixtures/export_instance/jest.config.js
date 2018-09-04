const {rsJestScriptPath} = require("../utils")

module.exports = {
	testEnvironment: "node",
	globals: {
		"rs-jest": {
			export: "instance"
		}
	},
	transform: {
		"^.+\\.rs$": rsJestScriptPath
	}
}
