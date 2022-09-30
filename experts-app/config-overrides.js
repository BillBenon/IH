const path = require('path');
module.exports = function (config) {
    let exclusiveDate = new Date().getTime()
    config.output = {
        filename: `[name].${exclusiveDate}.[hash].js`,
        path: path.resolve(__dirname, 'build'),
    }
    return config
};