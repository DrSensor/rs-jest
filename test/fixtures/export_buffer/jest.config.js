const {rsJestScriptPath} = require("../utils")

module.exports = {
	testEnvironment: "node",
	globals: {
		"rs-jest": {
			export: "buffer"
		}
	},
	transform: {
		"^.+\\.rs$": rsJestScriptPath
	}
}
