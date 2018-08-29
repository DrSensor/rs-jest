module.exports = {
	testEnvironment: "node",
	globals: {
		"ts-jest": {
			useBabelrc: true
		}
	},
	transform: {
		"^.+\\.tsx?$": "ts-jest"
	},
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	setupTestFrameworkScriptFile: "./jest.setup.js"
}
