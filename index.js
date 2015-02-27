'use strict';

var path = require('path');

var autoprefixer = require('broccoli-autoprefixer');

function AutoprefixerPreprocessor(options) {
  this.name = 'ember-cli-autoprefixer';
  this.ext = 'css';
  this.options = options || {};
}

AutoprefixerPreprocessor.prototype.toTree = function(tree) {
  return autoprefixer(tree, { browsers: ['last 2 versions'] });
};

module.exports = {
  name: 'ember-paper',
  blueprintsPath: function blueprintsPath() {
    return path.join(__dirname, 'blueprints');
  },
  included: function(app){
    app.import('vendor/material-icons/styles.css', { destDir: '/' });
    app.import('vendor/material-icons/fonts/material-icon-font.eot', { destDir: 'assets/fonts' });
    app.import('vendor/material-icons/fonts/material-icon-font.svg', { destDir: 'assets/fonts' });
    app.import('vendor/material-icons/fonts/material-icon-font.ttf', { destDir: 'assets/fonts' });
    app.import('vendor/material-icons/fonts/material-icon-font.woff', { destDir: 'assets/fonts' });

    app.import(app.bowerDirectory+'/hammerjs/hammer.js');
  },
  setupPreprocessorRegistry: function(type, registry){
    registry.add('css', new AutoprefixerPreprocessor());
    if (registry.remove) registry.remove('css', 'broccoli-autoprefixer');
  }
};
