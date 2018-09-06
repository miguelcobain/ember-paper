'use strict';

module.exports = {
  description: 'Installs ember-cli-sass',

  normalizeEntityName() {
    // this prevents an error when the entityName is
    // not specified (since that doesn't actually matter
    // to us
  },

  afterInstall() {
    return this.addAddonsToProject([
      { name: 'ember-cli-sass', target: '^7.2.0' }
    ]);
  }
};
