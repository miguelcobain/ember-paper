'use strict';

const EmberAddon = require('ember-cli/lib/broccoli/ember-addon');

module.exports = function(defaults) {
  const app = new EmberAddon(defaults, {
    snippetPaths: ['tests/dummy/snippets'],
    snippetSearchPaths: ['tests/dummy/app']
  });

  return app.toTree();
};
