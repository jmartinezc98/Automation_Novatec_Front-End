const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    baseUrl:"https://www.dubaistore.com/",
    chromeWebSecurity: false,
    testIsolation: false,
    viewportHeight:900,
    viewportWidth:1500,
    defaultCommandTimeout:15000,
  },
});
