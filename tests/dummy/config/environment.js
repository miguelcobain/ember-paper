// app/config/environment.js

module.exports = function(environment) {
  // jshint node: true
  // jscs:disable requireEnhancedObjectLiterals, validateQuoteMarks, disallowEmptyBlocks, disallowVar

  var ENV = {
    modulePrefix: 'dummy',
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
      rootElement: 'body'
    },
    contentSecurityPolicy: {
      'default-src': "'none'",
      'script-src': "'self' 'unsafe-inline' 'unsafe-eval' https://buttons.github.io https://api.github.com",
      'font-src': "'self' https://fonts.gstatic.com",
      'style-src': "'self' 'unsafe-inline' https://buttons.github.io https://fonts.googleapis.com",
      'connect-src': "'self'",
      'img-src': "'self' data:",
      'media-src': "'self'",
      'child-src': "'self' https://buttons.github.io"
    }
  };

  switch (environment) {
    case 'development': {
      // ENV.APP.LOG_RESOLVER = true;
      // ENV.APP.LOG_ACTIVE_GENERATION = true;
      // ENV.APP.LOG_TRANSITIONS = true;
      // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
      // ENV.APP.LOG_VIEW_LOOKUPS = true;
      break;
    }
    case 'test': {
      // Testem prefers this...
      ENV.baseURL = '/';
      ENV.locationType = 'none';

      // keep test console output quieter
      ENV.APP.LOG_ACTIVE_GENERATION = false;
      ENV.APP.LOG_VIEW_LOOKUPS = false;

      ENV.APP.rootElement = '#ember-testing';
      break;
    }
    case 'production': {
      ENV.baseURL = '/ember-paper';
      break;
    }
  }

  return ENV;
};
