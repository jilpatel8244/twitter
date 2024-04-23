const developmentLogger = require('./developmentLogger');
const productionLogger = require('./productionLogger');
require('dotenv').config();
let logger = null;

if (process.env.STATUS === 'production') {
    logger = productionLogger();
}

if (process.env.STATUS === 'development') {
    logger = developmentLogger();
}

module.exports = logger;