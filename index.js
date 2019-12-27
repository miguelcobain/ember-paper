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
  'paper-autocomplete': {
    styles: [
      'components/autocomplete/autocomplete.scss',
      'components/autocomplete/autocomplete-theme.scss'
    ],
    dependencies: [
      'paper-autocomplete/ebd-trigger',
      'paper-autocomplete/eps-trigger',
      'paper-autocomplete/ebd-content',
      'paper-autocomplete/options',
      'paper-autocomplete/no-matches-message',
      'paper-autocomplete/highlight'
    ]
  },

  'paper-autocomplete/eps-trigger': {
    dependencies: [
      'paper-progress-linear',
      'paper-input',
      'paper-autocomplete/reset-button',
      'paper-icon'
    ]
  },

  'paper-backdrop': {
    styles: [
      'components/backdrop/backdrop.scss',
      'components/backdrop/backdrop-theme.scss'
    ]
  },
  'paper-button': {
    styles: [
      'components/button/button.scss',
      'components/button/button-theme.scss'
    ]
  },
  'paper-card': {
    styles: [
      'components/card/card.scss',
      'components/card/card-theme.scss'
    ],
    dependencies: [
      'paper-card-title',
      'paper-card-content',
      'paper-card-actions',
      'paper-card-header',
      'paper-card-image',
      'paper-card-media'
    ]
  },
  'paper-card-actions': {
    dependencies: [
      'paper-card-icon-actions'
    ]
  },
  'paper-card-title': {
    dependencies: [
      'paper-card-title-text',
      'paper-card-title-media'
    ]
  },
  'paper-card-title-text': {
    dependencies: [
      'paper-card-header-headline',
      'paper-card-header-subhead'
    ]
  },
  'paper-card-header': {
    dependencies: [
      'paper-card-header-text',
      'paper-card-avatar'
    ]
  },
  'paper-card-header-text': {
    dependencies: [
      'paper-card-header-title',
      'paper-card-header-subhead'
    ]
  },
  'paper-checkbox': {
    styles: [
      'components/checkbox/checkbox.scss',
      'components/checkbox/checkbox-theme.scss'
    ]
  },
  'paper-chips': {
    styles: [
      'components/chips/chips.scss',
      'components/chips/chips-theme.scss'
    ],
    dependencies: [
      'paper-autocomplete',
      'paper-icon'
    ]
  },
  'paper-contact-chips': {
    dependencies: [
      'paper-chips'
    ]
  },
  'paper-content': {
    styles: [
      'components/content/content.scss',
      'components/content/content-theme.scss'
    ]
  },
  'paper-dialog': {
    styles: [
      'components/dialog/dialog.scss',
      'components/dialog/dialog-theme.scss'
    ],
    dependencies: [
      'paper-dialog-actions',
      'paper-backdrop',
      'paper-dialog-container',
      'paper-dialog-content',
      'paper-dialog-inner'
    ]
  },
  'paper-divider': {
    styles: [
      'components/divider/divider.scss',
      'components/divider/divider-theme.scss'
    ]
  },
  'paper-form': {
    dependencies: [
      'paper-input',
      'paper-select',
      'paper-autocomplete',
      'paper-button'
    ]
  },
  'paper-grid-list': {
    styles: [
      'components/gridList/grid-list.scss'
    ],
    dependencies: [
      'paper-grid-tile'
    ]
  },
  'paper-grid-tile': {
    dependencies: [
      'paper-grid-tile-footer'
    ]
  },
  'paper-icon': {
    styles: [
      'components/icon/icon.scss',
      'components/icon/icon-theme.scss'
    ]
  },
  'paper-input': {
    styles: [
      'components/input/input.scss',
      'components/input/input-theme.scss'
    ]
  },
  'paper-item': {
    dependencies: [
      'paper-checkbox',
      'paper-button',
      'paper-switch',
      'paper-radio-proxiable'
    ]
  },
  'paper-list': {
    styles: [
      'components/list/list.scss',
      'components/list/list-theme.scss'
    ]
  },
  'paper-radio-proxiable': {
    dependencies: [
      'paper-radio-base'
    ]
  },

  'paper-menu': {
    styles: [
      'components/menu/menu.scss',
      'components/menu/menu-theme.scss'
    ],
    dependencies: [
      'paper-menu/trigger',
      'paper-menu/content'
    ]
  },

  'paper-menu/content': {
    dependencies: [
      'paper-backdrop',
      'paper-menu/item'
    ]
  },

  'paper-menu/item': {
    dependencies: [
      'paper-button'
    ]
  },

  'paper-progress-circular': {
    styles: [
      'components/progressCircular/progress-circular.scss',
      'components/progressCircular/progress-circular-theme.scss'
    ]
  },
  'paper-progress-linear': {
    styles: [
      'components/progressLinear/progress-linear.scss',
      'components/progressLinear/progress-linear-theme.scss'
    ]
  },
  'paper-radio': {
    dependencies: [
      'paper-radio-base'
    ]
  },
  'paper-radio-base': {
    styles: [
      'components/radioButton/radio-button.scss',
      'components/radioButton/radio-button-theme.scss'
    ]
  },
  'paper-radio-group': {
    dependencies: [
      'paper-radio'
    ]
  },

  'paper-select': {
    styles: [
      'components/select/select.scss',
      'components/select/select-theme.scss'
    ],
    dependencies: [
      'paper-select/ebd-trigger',
      'paper-select/eps-trigger',
      'paper-select/ebd-content',
      'paper-select/options',
      'paper-select/search',
      'paper-select/no-matches-message',
      'paper-select/search-message',
    ]
  },

  'paper-select/options': {
    dependencies: [
      'paper-progress-circular',
      'paper-select/option'
    ]
  },

  'paper-select/ebd-content': {
    dependencies: [
      'paper-backdrop'
    ]
  },

  'paper-sidenav': {
    styles: [
      'components/sidenav/sidenav.scss',
      'components/sidenav/sidenav-theme.scss'
    ],
    dependencies: [
      'paper-backdrop',
      'paper-sidenav-inner'
    ]
  },
  'paper-slider': {
    styles: [
      'components/slider/slider.scss',
      'components/slider/slider-theme.scss'
    ]
  },
  'paper-speed-dial': {
    styles: [
      'components/fabSpeedDial/fabSpeedDial.scss'
    ],
    dependencies: [
      'paper-speed-dial-trigger',
      'paper-speed-dial-actions'
    ]
  },
  'paper-subheader': {
    styles: [
      'components/subheader/subheader.scss',
      'components/subheader/subheader-theme.scss'
    ]
  },
  'paper-speed-dial-actions': {
    dependencies: [
      'paper-speed-dial-actions-action'
    ]
  },
  'paper-switch': {
    styles: [
      'components/switch/switch.scss',
      'components/switch/switch-theme.scss'
    ]
  },
  'paper-tabs': {
    styles: [
      'components/tabs/tabs.scss',
      'components/tabs/tabs-theme.scss'
    ],
    dependencies: [
      'paper-tab',
      'paper-ink-bar',
      'paper-icon'
    ]
  },
  'paper-toast': {
    styles: [
      'components/toast/toast.scss',
      'components/toast/toast-theme.scss'
    ],
    dependencies: [
      'paper-toast-inner',
      'paper-toast-text'
    ]
  },
  'paper-toaster': {
    dependencies: [
      'paper-toast',
      'paper-button'
    ]
  },
  'paper-toolbar': {
    styles: [
      'components/toolbar/toolbar.scss',
      'components/toolbar/toolbar-theme.scss'
    ],
    dependencies: [
      'paper-toolbar-tools'
    ]
  },
  'paper-tooltip': {
    styles: [
      'components/tooltip/tooltip.scss',
      'components/tooltip/tooltip-theme.scss'
    ],
    dependencies: [
      'paper-tooltip-inner'
    ]
  }
};

module.exports = {
  name: require('./package').name,

  options: {
    polyfills: {
      'polyfill-nodelist-foreach': {
        files: ['index.js'],
        // compatibility from https://developer.mozilla.org/en-US/docs/Web/API/NodeList/forEach
        browsers: ['ie > 0', 'chrome < 52', 'ff < 50', 'opera < 38', 'safari < 10', 'edge < 16', 'android < 51', 'and_chr < 51', 'and_ff < 50', 'ios_saf < 10', 'Samsung < 5']
      },
      'classlist-polyfill': {
        files: ['src/index.js'],
        caniuse: 'classlist'
      },
      'element-closest': {
        files: ['browser.js'],
        caniuse: 'element-closest'
      },
      'matchmedia-polyfill': {
        files: ['matchMedia.js'],
        caniuse: 'matchmedia'
      }
    }
  },

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

        let whitelist = this.emberPaperOptions.whitelist || [];
        let blacklist = this.emberPaperOptions.blacklist || [];

        let links = '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic">';

        let paperIconNotWhitelisted = whitelist.length && !whitelist.includes('paper-icon');
        let paperIconBlacklisted = blacklist.length && blacklist.includes('paper-icon');

        if (paperIconNotWhitelisted || paperIconBlacklisted) {
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

    let propagatingHammerJs = fastbootTransform(new Funnel(this.pathBase('propagating-hammerjs'), {
      files: ['propagating.js'],
      destDir: 'propagating-hammerjs'
    }));

    trees = trees.concat([hammerJs, propagatingHammerJs, versionTree]);

    if (tree) {
      trees.push(tree);
    }

    return new BroccoliMergeTrees(trees);
  },

  treeForStyles(tree) {
    let coreScssFiles = [
      // core styles
      'core/style/mixins.scss',
      'core/style/variables.scss',
      'core/style/structure.scss',
      'core/style/typography.scss',
      'core/style/layout.scss',
      'core/services/layout/layout.scss',

      // TODO: Move to core, if we don't import menu, it breaks.
      'components/menu/menu.scss',
      'components/menu/menu-theme.scss',

      // Need to find which components rely on this, otherwise, move to core.
      'components/whiteframe/whiteframe.scss',

      'components/panel/panel.scss',
      'components/panel/panel-theme.scss'
    ];

    let filteredScssFiles = this.addStyles(coreScssFiles) || coreScssFiles;

    let angularScssFiles = new Funnel(this.pathBase('angular-material-styles'), {
      files: filteredScssFiles,
      srcDir: '/src',
      destDir: 'angular-material',
      annotation: 'AngularScssFunnel'
    });

    angularScssFiles = new AngularScssFilter(angularScssFiles);

    let importer = writeFile(
      'ember-paper-components.scss',
      filteredScssFiles.map((path) => `@import './angular-material/${path}';`).join('\n')
    );

    let mergedTrees = new BroccoliMergeTrees([angularScssFiles, importer, tree], { overwrite: true });
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

  /**
   * This function will push styles using whitelist and blacklist
   * @param {Array} core - The core scss files
   * @return {Array} - New array with styles appended
   */
  addStyles(core = []) {

    let whitelist = this.generateWhitelist(this.emberPaperOptions.whitelist);
    let blacklist = this.emberPaperOptions.blacklist || [];

    let styles = core.slice();

    // add everything if no opts defined
    if (whitelist.length === 0 && blacklist.length === 0) {
      Object.keys(componentDependencies).forEach((key) => {
        this.addComponentStyle(styles, componentDependencies[key]);
      });
    }

    // build array from whitelist
    if (whitelist.length && blacklist.length === 0) {
      whitelist.forEach((component) => {
        this.addComponentStyle(styles, componentDependencies[component]);
      });
    }

    // add all but blacklisted
    if (blacklist.length && whitelist.length === 0) {
      Object.keys(componentDependencies).forEach((key) => {
        if (!blacklist.includes(key)) {
          this.addComponentStyle(styles, componentDependencies[key]);
        }
      });
    }

    return styles;

  },

  /**
   * Validate if the object exists in componentDependencies and has any styles
   * if so, add them to the arr
   *
   * @param {Array} arr - Styles array
   * @param {Object} component - componentDependencies[key]
   */
  addComponentStyle(arr, component) {
    if (component && component.styles) {
      component.styles.forEach((scss) => {
        if (!arr.includes(scss)) {
          arr.push(scss);
        }
      });
    }

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
    baseName = baseName.replace(/(\/component|\/template\b)/, '');
    baseName = baseName.substring(0, baseName.lastIndexOf('.')); 
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

        if (componentDependencies[item] && componentDependencies[item].dependencies) {
          componentDependencies[item].dependencies.forEach(_addToWhitelist);
        }
      }
    }

    whitelist.forEach(_addToWhitelist);
    return list;
  }
};
