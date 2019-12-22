const nconf = require("nconf");

nconf.argv().env();
nconf.file("defaults", {
  file: process.cwd() + "/src/appConfig.json" //Configurations of Applications
});

module.exports = nconf;
