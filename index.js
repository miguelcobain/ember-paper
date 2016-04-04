/* jshint node: true */
'use strict';

var path = require('path');
var autoprefixer = require('broccoli-autoprefixer');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
var AngularScssFilter = require('./lib/angular-scss-filter');

module.exports = {
  name: 'ember-paper',

  included: function(app) {
    this._super.included(app);

    app.import(app.bowerDirectory + '/hammerjs/hammer.js');
    app.import(app.bowerDirectory + '/matchMedia/matchMedia.js');
    app.import('vendor/propagating.js');
  },

  contentFor: function(type) {
    if (type === 'head') {
      return '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">';
    }
  },

  treeForStyles: function(tree) {
    var scssFiles = [
      //core styles
      'core/style/typography.scss',
      'core/style/mixins.scss',
      'core/style/variables.scss',
      'core/style/structure.scss',
      'core/services/layout/layout.attributes.scss',
      'core/services/layout/layout.scss',
      //component styles
      'components/content/content.scss',
      'components/content/content-theme.scss',

      'components/card/card.scss',
      'components/card/card-theme.scss',

      'components/button/button.scss',
      'components/button/button-theme.scss',

      'components/checkbox/checkbox.scss',
      'components/checkbox/checkbox-theme.scss',

      'components/radioButton/radio-button.scss',
      'components/radioButton/radio-button-theme.scss',

      'components/switch/switch.scss',
      'components/switch/switch-theme.scss',

      'components/input/input.scss',
      'components/input/input-theme.scss',

      'components/list/list.scss',
      'components/list/list-theme.scss',

      'components/divider/divider.scss',
      'components/divider/divider-theme.scss',

      'components/whiteframe/whiteframe.scss',

      'components/toolbar/toolbar.scss',
      'components/toolbar/toolbar-theme.scss',

      'components/icon/icon.scss',
      'components/icon/icon-theme.scss',

      'components/slider/slider.scss',
      'components/slider/slider-theme.scss',

      'components/subheader/subheader.scss',
      'components/subheader/subheader-theme.scss',

      'components/autocomplete/autocomplete.scss',
      'components/autocomplete/autocomplete-theme.scss',

      'components/progressLinear/progress-linear.scss',
      'components/progressLinear/progress-linear-theme.scss',

      'components/progressCircular/progress-circular.scss',
      'components/progressCircular/progress-circular-theme.scss',

      'components/menu/menu.scss',
      'components/menu/menu-theme.scss',

      'components/select/select.scss',
      'components/select/select-theme.scss',

      'components/gridList/grid-list.scss',

      'components/sidenav/sidenav.scss',
      'components/sidenav/sidenav-theme.scss',

      'components/backdrop/backdrop.scss',
      'components/backdrop/backdrop-theme.scss',

      'components/tabs/tabs.scss',
      'components/tabs/tabs-theme.scss',

      'components/dialog/dialog.scss',
      'components/dialog/dialog-theme.scss'
    ];

    var pathBase = this.project.addonPackages['ember-paper'].path;
    var angularMaterialPath =  'node_modules/angular-material-source/src';

    var angularScssFiles = new Funnel(path.join(pathBase,angularMaterialPath), {
      files: scssFiles,
      destDir: 'angular-material',
      annotation: 'AngularScssFunnel'
    });

    angularScssFiles = new AngularScssFilter(angularScssFiles, {
      annotation: 'AngularScssFilter'
    });

    return this._super.treeForStyles(mergeTrees([angularScssFiles, tree], { overwrite: true }));
  },

  postprocessTree: function(type, tree) {
    if (type === 'all' || type === 'styles') {
      tree = autoprefixer(tree, { browsers: ['last 2 versions'] });
    }
    return tree;
  }
};
