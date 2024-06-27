const fs = require("node:fs");
const path = require("node:path");

// Test suite for environment installation
describe("Installation", () => {
  // Test: Check if the .env file exists
  test("You have created /server/.env", async () => {
    expect(fs.existsSync(path.join(__dirname, "..", ".env"))).toBe(true);
  });

  // Test: Check if the .env.sample file exists
  test("You have retained /server/.env.sample", async () => {
    expect(fs.existsSync(path.join(__dirname, "..", ".env.sample"))).toBe(true);
  });
});
