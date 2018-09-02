module.exports = {
	testEnvironment: "node",
	transform: {
		"^.+\\.rs$": "<rootDir>../../../dist/index.js"
	}
}
