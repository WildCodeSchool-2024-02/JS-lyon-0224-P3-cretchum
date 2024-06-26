// Use les modules ES

/** @type {import('jest').Config} */
const config = {
  // The test environment that will be used for testing
  testEnvironment: "jsdom",
// The glob patterns Jest uses to detect test files
testMatch: ["<rootDir>/tests/**/*.test.js", "<rootDir>/tests/**/*.spec.js"],

// Indicates whether the coverage information should be collected while executing the test
collectCoverage: true,

// An array of glob patterns indicating a set of files for which coverage information should be collected
collectCoverageFrom: ["<rootDir>/src/**/*.{js,jsx}", "<rootDir>/tests/**/*.js"],

// An array of regexp pattern strings used to skip coverage collection
coveragePathIgnorePatterns: ["/node_modules/"],

// An array of regexp pattern strings, matched against all module paths before considered 'visible' to the module loader
modulePathIgnorePatterns: ["/node_modules/"],

// A list of paths to directories that Jest should use to search for files in
roots: ["<rootDir>"],

// An array of regexp pattern strings that are matched against all source file paths, matched files will skip transformation
transformIgnorePatterns: ["/node_modules/"],
};

export default config;