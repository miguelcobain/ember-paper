/* jshint node: true */
'use strict';

var path = require('path');
var autoprefixer = require('broccoli-autoprefixer');

module.exports = {
  name: 'ember-paper',
  blueprintsPath: function blueprintsPath() {
    return path.join(__dirname, 'blueprints');
  },
  included: function(app){
    this._super.included(app);
    app.import('vendor/material-icons/styles.css', { destDir: '/' });
    app.import('vendor/material-icons/fonts/material-icon-font.eot', { destDir: 'assets/fonts' });
    app.import('vendor/material-icons/fonts/material-icon-font.svg', { destDir: 'assets/fonts' });
    app.import('vendor/material-icons/fonts/material-icon-font.ttf', { destDir: 'assets/fonts' });
    app.import('vendor/material-icons/fonts/material-icon-font.woff', { destDir: 'assets/fonts' });

    app.import(app.bowerDirectory + '/hammerjs/hammer.js');
  },
  postprocessTree: function(type, tree){
    if (type === 'all' || type === 'styles') {
      tree = autoprefixer(tree, { browsers: ['last 2 versions'] });
    }

    return tree;
  }
};
