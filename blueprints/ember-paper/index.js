'use strict';

module.exports = {
  normalizeEntityName: function() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall: function() {
    return this.addPackagesToProject([
      { name: 'ember-cli-sass', target: 'latest' }
    ]);
  }
};
