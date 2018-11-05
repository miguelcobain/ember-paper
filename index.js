'use strict';

const path = require('path');
const resolve = require('resolve');
const version = require('./package.json').version;
const BroccoliMergeTrees = require('broccoli-merge-trees');
const writeFile = require('broccoli-file-creator');
const Funnel = require('broccoli-funnel');
const AngularScssFilter = require('./lib/angular-scss-filter');
const fastbootTransform = require('fastboot-transform');


/** 
 * Component dependencies, extracted from ember-bootstrap 
 * https://github.com/kaliber5/ember-bootstrap/blob/master/index.js 
*/
const componentDependencies = {

  'paper-autocomplete': [
    'paper-autocomplete-trigger', 
    'paper-autocomplete-options', 
    'paper-autocomplete-highlight', 
    'paper-autocomplete-content'
  ],
  'paper-autocomplete-content': [
    'paper-virtual-repeat'
  ],
  'paper-autocomplete-trigger': [
    'paper-progress-linear',
    'paper-input',
    'paper-reset-button',
    'paper-icon'
  ],
  'paper-card': [
    'paper-card-title', 
    'paper-card-content', 
    'paper-card-actions', 
    'paper-card-header', 
    'paper-card-image', 
    'paper-card-media',
  ],
  'paper-card-actions': [
    'paper-card-icon-actions'
  ],
  'paper-card-title': [
    'paper-card-title-text',
    'paper-card-title-media'
  ],
  'paper-card-title-text': [
    'paper-card-header-headline',
    'paper-card-header-subhead'
  ],
  'paper-card-header': [
    'paper-card-header-text',
    'paper-card-avatar'
  ],
  'paper-card-header-text': [
    'paper-card-header-title',
    'paper-card-header-subhead',
  ],
  'paper-chips': ['paper-autocomplete', 'paper-icon'],
  'papar-contact-chips': ['paper-autocomplete', 'paper-icon'],
  'paper-dialog': [
    'paper-dialog-actions',
    'paper-backdrop', 
    'paper-dialog-container',
    'paper-dialog-content', 
    'paper-dialog-inner',
  ],
  'paper-form': [
    'paper-input',
    'paper-select',
    'paper-autocomplete',
    'paper-button'
  ],
  'paper-grid-list': [
    'paper-grid-tile'
  ],
  'paper-grid-tile': [
    'paper-grid-tile-footer'
  ],
  'paper-item': [
    'paper-checkbox',
    'paper-button',
    'paper-switch',
    'paper-radio-proxiable'
  ],
  'paper-radio-proxiable': [
    'paper-radio-base'
  ],
  'paper-menu': [
    'paper-menu-content'
  ],
  'paper-menu-content': [
    'paper-menu-content-inner',
    'paper-backdrop',
  ],
  'paper-menu-content-inner': [
    'paper-menu-item'
  ],
  'paper-menu-item': [
    'paper-button'
  ],
  'paper-radio-group': [
    'paper-radio'
  ],
  'paper-select': [
    'paper-select-menu',
    'paper-select-options',
    'paper-select-trigger',
    'paper-select-search'
  ],
  'paper-select-menu': [
    'paper-select-menu-trigger',
    'paper-select-content'
  ],
  'paper-select-content': [
    'paper-backdrop',
    'paper-select-menu-inner'
  ],
  'paper-sidenav': [
    'paper-backdrop',
    'paper-sidenav-inner'
  ],
  'paper-speed-dial': [
    'paper-speed-dial-trigger',
    'paper-speed-dial-actions'
  ],
  'paper-speed-dial-actions': [
    'paper-speed-dial-actions-action'
  ],
  'paper-tabs': [
    'paper-tab',
    'paper-ink-bar',
    'paper-icon'
  ],
  'paper-toast': [
    'paper-toast-inner',
    'paper-toast-text'
  ],
  'paper-toaster': [
    'paper-toast',
    'paper-button'
  ],
  'paper-toolbar': [
    'paper-toolbar-tools'
  ],
  'paper-tooltip': [
    'paper-tooltip-inner'
  ],
  'paper-virtual-repeat': [
    'paper-virtual-repeat-scroller'
  ]
};

module.exports = {
  name: 'ember-paper',

  included() {
    this._super.included.apply(this, arguments);
    let app;

    // If the addon has the _findHost() method (in ember-cli >= 2.7.0), we'll just
    // use that.
    if (typeof this._findHost === 'function') {
      app = this._findHost();
    } else {
      // Otherwise, we'll use this implementation borrowed from the _findHost()
      // method in ember-cli.
      let current = this;
      do {
        app = current.app || app;
      } while (current.parent.parent && (current = current.parent));
    }

    this.emberPaperOptions = Object.assign({}, app.options['ember-paper']);
    
    app.import('vendor/ember-paper/register-version.js');
    app.import('vendor/hammerjs/hammer.js');
    app.import('vendor/matchmedia-polyfill/matchMedia.js');
    app.import('vendor/propagating-hammerjs/propagating.js');
  },

  config() {
    return {
      'ember-paper': {
        insertFontLinks: true
      }
    };
  },

  contentFor(type, config) {

    if (type === 'head') {

      if (config['ember-paper'].insertFontLinks) {

        let { whitelist = [], blacklist = [] } = this.emberPaperOptions;
        let links = '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">';

        let paperIconNotWhitelisted = whitelist.length && !whitelist.includes('paper-icon');
        let paperIconBlacklisted = blacklist.length && blacklist.includes('paper-icon');
        
        if ( paperIconNotWhitelisted || paperIconBlacklisted ) {
          return links;
        } 
        
        return `${links} <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">`;

      }
    } else if (type === 'body-footer') {
      let response = null;
      let emberPowerSelect = this.addons.filter(function(addon) {
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

  treeForVendor(tree) {
    let trees = [];

    let versionTree = writeFile(
      'ember-paper/register-version.js',
      `Ember.libraries.register('Ember Paper', '${version}');`
    );

    let hammerJs = fastbootTransform(new Funnel(this.pathBase('hammerjs'), {
      files: ['hammer.js'],
      destDir: 'hammerjs'
    }));

    let matchMediaPolyfill = fastbootTransform(new Funnel(this.pathBase('matchmedia-polyfill'), {
      files: ['matchMedia.js'],
      destDir: 'matchmedia-polyfill'
    }));

    let propagatingHammerJs = fastbootTransform(new Funnel(this.pathBase('propagating-hammerjs'), {
      files: ['propagating.js'],
      destDir: 'propagating-hammerjs'
    }));

    trees = trees.concat([hammerJs, matchMediaPolyfill, propagatingHammerJs, versionTree]);

    if (tree) {
      trees.push(tree);
    }

    return new BroccoliMergeTrees(trees);
  },

  treeForStyles(tree) {
    let scssFiles = [
      // core styles
      'core/style/typography.scss',
      'core/style/mixins.scss',
      'core/style/variables.scss',
      'core/style/structure.scss',
      'core/style/layout.scss',
      'core/services/layout/layout.scss',

      // component styles
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

    let angularScssFiles = new Funnel(this.pathBase('angular-material-source'), {
      files: scssFiles,
      srcDir: '/src',
      destDir: 'angular-material',
      annotation: 'AngularScssFunnel'
    });

    angularScssFiles = new AngularScssFilter(angularScssFiles);

    let mergedTrees = new BroccoliMergeTrees([angularScssFiles, tree], { overwrite: true });
    return this._super.treeForStyles(mergedTrees);
  },

  /*
    Rely on the `resolve` package to mimic node's resolve algorithm.
    It finds the angular-material-source module in a manner that works for npm 2.x,
    3.x, and yarn in both the addon itself and projects that depend on this addon.

    This is an edge case b/c angular-material-source does not have a main
    module we can require.resolve through node itself and similarily ember-cli
    does not have such a hack for the same reason.

    tl;dr - We want the non built scss files, and b/c this dep is only provided via
    git, we use this hack. Please change it if you read this and know a better way.
  */
  pathBase(packageName) {
    return path.dirname(resolve.sync(`${packageName}/package.json`, { basedir: __dirname }));
  },

  treeForApp(tree) {
    tree = this.filterComponents(tree);
    return this._super.treeForApp.call(this, tree);
  },

  treeForAddon(tree) {
    tree = this.filterComponents(tree);
    return this._super.treeForAddon.call(this, tree);
  },

  treeForAddonTemplates(tree) {
    tree = this.filterComponents(tree);
    return this._super.treeForAddonTemplates.call(this, tree);
  },


  filterComponents(tree) {
    let whitelist = this.generateWhitelist(this.emberPaperOptions.whitelist);
    let blacklist = this.emberPaperOptions.blacklist || [];

    // exit early if no opts defined
    if (whitelist.length === 0 && blacklist.length === 0) {
      return tree;
    }

    return new Funnel(tree, {
      exclude: [(name) => this.excludeComponent(name, whitelist, blacklist)]
    });
  },

  excludeComponent(name, whitelist, blacklist) {
    let regex = /^(templates\/)?components\/(base\/)?/;
    let isComponent = regex.test(name);
    if (!isComponent) {
      return false;
    }

    let baseName = name.replace(regex, '');
    let firstSeparator = baseName.indexOf('/');
    if (firstSeparator !== -1) {
      baseName = baseName.substring(0, firstSeparator);
    } else {
      baseName = baseName.substring(0, baseName.lastIndexOf('.'));
    }

    let isWhitelisted = whitelist.indexOf(baseName) !== -1;
    let isBlacklisted = blacklist.indexOf(baseName) !== -1;

    if (whitelist.length === 0 && blacklist.length === 0) {
      return false;
    }

    if (whitelist.length && blacklist.length === 0) {
      return !isWhitelisted;
    }

    return isBlacklisted;
  },

  generateWhitelist(whitelist) {
    let list = [];

    if (!whitelist) {
      return list;
    }

    function _addToWhitelist(item) {
      if (list.indexOf(item) === -1) {
        list.push(item);

        if (componentDependencies[item]) {
          componentDependencies[item].forEach(_addToWhitelist);
        }
      }
    }

    whitelist.forEach(_addToWhitelist);
    return list;
  }
};
