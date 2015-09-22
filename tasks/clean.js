var config = require('../config');
var del    = require('del');

/**
 * Task: Clean dist/ folder
 */
module.exports = function() {
    del.sync(config.paths.clean.dirDest);
};
