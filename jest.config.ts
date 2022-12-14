/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */

module.exports = {
	preset: "ts-jest",
	testEnvironment: "node",
	coveragePathIgnorePatterns: [
		"node_modules",
		"test-config",
		"interfaces",
		"repositories",
		"jestGlobalMocks.ts",
		"<rootDir>/src/server.ts",
		"<rootDir>/src/database.ts",
		"<rootDir>/src/utils",
		"<rootDir>/src/config",
		"<rootDir>/tests/factory.ts",
		"<rootDir>/src/dbStrategy",
	],
	testTimeout: 300000,
};
