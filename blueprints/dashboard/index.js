'use strict';

module.exports = {
  normalizeEntityName: function() {
    // no-op
  },

  afterInstall: function() {
    return this.addPackagesToProject([
      { name: 'ember-href-to', target: 'latest' },
      { name: 'ember-composable-helpers', target: 'latest' },
      { name: 'ember-truth-helpers', target: 'latest' },
    ]);
  },
};
