/* jshint node: true */
'use strict';

var fs = require('fs');
var path = require('path');
var resolve = require('resolve');
var autoprefixer = require('broccoli-autoprefixer');
var mergeTrees = require('broccoli-merge-trees');
var Funnel = require('broccoli-funnel');
var AngularScssFilter = require('./lib/angular-scss-filter');
var fastbootTransform = require('fastboot-transform');

module.exports = {
  name: 'ember-paper',

  included: function() {
    this._super.included.apply(this, arguments);

    var app;

    // If the addon has the _findHost() method (in ember-cli >= 2.7.0), we'll just
    // use that.
    if (typeof this._findHost === 'function') {
      app = this._findHost();
    } else {
      // Otherwise, we'll use this implementation borrowed from the _findHost()
      // method in ember-cli.
      var current = this;
      do {
        app = current.app || app;
      } while (current.parent.parent && (current = current.parent));
    }

    app.import('vendor/hammerjs/hammer.js');
    app.import('vendor/matchmedia-polyfill/matchMedia.js');
    app.import('vendor/propagating-hammerjs/propagating.js');
  },

  config(env, baseConfig) {
    return { 'ember-paper': { insertFontLinks: true } };
  },

  contentFor: function(type, config) {
    if (type === 'head') {
      if (config['ember-paper'].insertFontLinks) {
        return '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">' +
          '<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">';
      }
    } else if (type === 'body-footer') {
      var response = null;
      var emberPowerSelect = this.addons.filter(function(addon) {
        return addon.name === 'ember-power-select';
      })[0];
      response = emberPowerSelect.contentFor(type, config);
      if (config.environment !== 'test' &&  !config._emberPaperContentForInvoked) {
        config._emberPaperContentForInvoked = true;
        response = `
          ${response || ''}
          <div id="paper-wormhole"></div>
          <div id="paper-toast-fab-wormhole"></div>
        `;
      }
      return response;
    }
  },

  treeForVendor: function(tree) {
    var trees = [];

    var hammerJs = fastbootTransform(new Funnel(this.pathBase('hammerjs'), {
      files: [ 'hammer.js' ],
      destDir: 'hammerjs'
    }));
    var matchMediaPolyfill = fastbootTransform(new Funnel(this.pathBase('matchmedia-polyfill'), {
      files: [ 'matchMedia.js' ],
      destDir: 'matchmedia-polyfill'
    }));
    var propagatingHammerJs = fastbootTransform(new Funnel(this.pathBase('propagating-hammerjs'), {
      files: [ 'propagating.js' ],
      destDir: 'propagating-hammerjs'
    }));
    trees = trees.concat([hammerJs, matchMediaPolyfill, propagatingHammerJs]);

    if (tree) {
      trees.push(tree);
    }

    return mergeTrees(trees);
  },

  treeForStyles: function(tree) {
    var scssFiles = [
      //core styles
      'core/style/typography.scss',
      'core/style/mixins.scss',
      'core/style/variables.scss',
      'core/style/structure.scss',
      'core/style/layout.scss',
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

      'components/dialog/dialog.scss',
      'components/dialog/dialog-theme.scss',

      'components/virtualRepeat/virtual-repeater.scss',

      'components/chips/chips.scss',
      'components/chips/chips-theme.scss',

      'components/panel/panel.scss',
      'components/panel/panel-theme.scss',

      'components/tooltip/tooltip.scss',
      'components/tooltip/tooltip-theme.scss',

      'components/toast/toast.scss',
      'components/toast/toast-theme.scss',

      'components/tabs/tabs.scss',
      'components/tabs/tabs-theme.scss',

      'components/fabSpeedDial/fabSpeedDial.scss'
    ];

    var angularScssFiles = new Funnel(this.pathBase('angular-material-source'), {
      files: scssFiles,
      srcDir: '/src',
      destDir: 'angular-material',
      annotation: 'AngularScssFunnel'
    });

    angularScssFiles = new AngularScssFilter(angularScssFiles, {
      annotation: 'AngularScssFilter'
    });

    return this._super.treeForStyles(mergeTrees([angularScssFiles, tree], { overwrite: true }));
  },

  /*
    Rely on the `resolve` package to mimic node's resolve algorithm.
    It finds the angular-material-source module in a manner that works for npm 2.x,
    3.x, and yarn in both the addon itself and projects that depend on this addon.

    This is an edge case b/c angular-material-source does not have a main
    module we can require.resolve through node itself and similarily ember-cli
    does not have such a hack for the same reason.

    tl;dr - We want the non built scss files, and b/c this dep is only provided via
    bower, we use this hack. Please change it if you read this and know a better way.
  */
  pathBase: function(packageName) {
    return path.dirname(resolve.sync(packageName + '/package.json', { basedir: __dirname }));
  },

  postprocessTree: function(type, tree) {
    if (type === 'all' || type === 'styles') {
      tree = autoprefixer(tree,
          this.app.options.autoprefixer || { browsers: ['last 2 versions'] });
    }
    return tree;
  }
};
