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
	testPathIgnorePatterns: [
		"<rootDir>/test/fixtures",
		"<rootDir>/examples",
		"<rootDir>/node_modules/"
	],
	coveragePathIgnorePatterns: [".*\\.d\\.ts", "<rootDir>/node_modules/"],
	testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$",
	moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
	setupTestFrameworkScriptFile: "./jest.setup.js"
}
