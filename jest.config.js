/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  displayName: "Quiz App tests",
  setupFilesAfterEnv: ["./src/utils/test.setup.ts"],
};
