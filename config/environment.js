/*jshint node:true*/
'use strict';

module.exports = function(environment/*, appConfig */) {

  var ENV = {
    APP: {
      rootElement: 'body'
    }
  };

  if (environment === 'test') {
    ENV.baseURL = '/';
    ENV.locationType = 'none';
    ENV.APP.rootElement = '#ember-testing';
  }

  return ENV;
};
