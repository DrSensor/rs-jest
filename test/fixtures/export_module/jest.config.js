const {rsJestScriptPath} = require("../utils")

module.exports = {
	testEnvironment: "node",
	globals: {
		"rs-jest": {
			export: "module"
		}
	},
	transform: {
		"^.+\\.rs$": rsJestScriptPath
	}
}
