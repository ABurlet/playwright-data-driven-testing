const { defineConfig } = require("@playwright/test");

module.exports = defineConfig({
  testDir: "./tests",
  use: {
    baseURL: "https://animated-gingersnap-8cf7f2.netlify.app",
    trace: "on-first-retry",
  },
});