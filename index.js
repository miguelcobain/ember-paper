'use strict';

var path = require('path');

module.exports = {
  name: 'ember-paper',
  blueprintsPath: function blueprintsPath() {
    return path.join(__dirname, 'blueprints');
  },
  included:function(app){
    app.import('vendor/material-icons/styles.css', { destDir: '/' });
    app.import('vendor/material-icons/fonts/material-icon-font.eot', { destDir: 'assets/fonts' });
    app.import('vendor/material-icons/fonts/material-icon-font.svg', { destDir: 'assets/fonts' });
    app.import('vendor/material-icons/fonts/material-icon-font.ttf', { destDir: 'assets/fonts' });
    app.import('vendor/material-icons/fonts/material-icon-font.woff', { destDir: 'assets/fonts' });

    app.import(app.bowerDirectory+'/hammerjs/hammer.js');

  }
};
