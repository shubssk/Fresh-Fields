/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  coveragePathIgnorePatterns: ["dist/", "node_modules/"],
  testPathIgnorePatterns: ["dist/", "node_modules/"],
};
