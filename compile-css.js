/* global require, module */
var sass = require('node-sass');
var path = require('path');

module.exports = function (env) {
  env = env || 'development';
  var configPath = path.resolve(__dirname, 'config/environment');
  var config = require(configPath)(env);
  var cssFile = 'vendor/' + config.addonPrefix + '.css';
  var vendorFile = path.resolve(__dirname, cssFile);

  sass.renderFile({
    file: path.resolve(__dirname, config.sassMain),
    success: function(/*css*/) {
      console.log('node-sass compiled', vendorFile.split(__dirname)[1]);
    },
    error: function(error) {
      console.error(error);
    },
    includePaths: [ path.resolve(__dirname, config.sassIncludePath) ],
    outputStyle: (env === 'development') ? 'nested' : 'compressed',
    outFile: vendorFile,
    precision: 5,
    sourceMap: (env === 'development')
  });
};
