const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "http://localhost:4100",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
