'use strict';
var name = require('../package.json').name;

module.exports = function(environment) {
  environment = environment || 'development';

  var defaultEnv = {
    environment: environment,
    addonPrefix: name,
    shimName: name + '-shim',
    sassIncludePath: 'addon/styles/scss/',
    sassMain: 'addon/styles/scss/main.scss'
  };

  var ENV = {
    development: defaultEnv,
    test: defaultEnv,
    production: defaultEnv
  };
  return ENV[environment];
};
