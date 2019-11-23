// using experimental mode for ES6 features instead of babel
require = require("esm")(module/*, options*/); 
module.exports = require("./src/app");