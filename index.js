/* jshint node: true */
'use strict';

var path = require('path');
var autoprefixer = require('broccoli-autoprefixer');

module.exports = {
  name: 'ember-paper',
  blueprintsPath: function blueprintsPath() {
    return path.join(__dirname, 'blueprints');
  },
  included: function(app) {
    this._super.included(app);

    if (!process.env.EMBER_CLI_FASTBOOT) {
      app.import(app.bowerDirectory + '/hammer.js/hammer.js')
      app.import(app.bowerDirectory + '/matchMedia/matchMedia.js');
    };

    app.import('vendor/propagating.js');
  },
  contentFor: function(type) {
    if (type === 'body') {
      return "<div id='paper-wormhole'></div>";
    }
  },
  postprocessTree: function(type, tree) {
    if (type === 'all' || type === 'styles') {
      tree = autoprefixer(tree, { browsers: ['last 2 versions'] });
    }
    return tree;
  }
};
