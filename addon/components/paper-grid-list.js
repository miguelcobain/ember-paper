/**
 * @module ember-paper
 */
import { inject as service } from '@ember/service';

import { alias } from '@ember/object/computed';
import Component from '@ember/component';
import { computed } from '@ember/object';
import { run } from '@ember/runloop';
import layout from '../templates/components/paper-grid-list';
import { ParentMixin } from 'ember-composability-tools';
import gridLayout from '../utils/grid-layout';
import { invokeAction } from 'ember-invoke-action';

const mediaRegex = /(^|\s)((?:print-)|(?:[a-z]{2}-){1,2})?(\d+)(?!\S)/g;
const rowHeightRegex = /(^|\s)((?:print-)|(?:[a-z]{2}-){1,2})?(\d+(?:[a-z]{2,3}|%)?|\d+:\d+|fit)(?!\S)/g;

const unitCSS = (units) => {
  return `${units.share}% - (${units.gutter} * ${units.gutterShare})`;
};

const dimensionCSS = (dimensions) => {
  return `calc((${dimensions.unit}) * ${dimensions.span} + (${dimensions.span} - 1) * ${dimensions.gutter})`;
};

const media = (mediaName) => {
  return ((mediaName.charAt(0) !== '(') ? (`(${mediaName})`) : mediaName);
};

const mediaListenerName = (name) => {
  return `${name.replace('-', '')}Listener`;
};

const applyStyles = (el, styles) => {
  for (let key in styles) {
    el.style[key] = styles[key];
  }
};

/**
 * @class PaperGridList
 * @extends Ember.Component
 */
export default Component.extend(ParentMixin, {
  layout,
  tagName: 'md-grid-list',

  constants: service(),

  tiles: alias('childComponents'),

  didInsertElement() {
    this._super(...arguments);
    this._installMediaListener();
  },

  didUpdate() {
    this._super(...arguments);

    // Debounces until the next run loop
    run.debounce(this, this.updateGrid, 0);
  },

  willDestroyElement() {
    this._super(...arguments);
    this._uninstallMediaListener();
  },

  // Sets up a listener for each media query
  _installMediaListener() {
    for (let mediaName in this.get('constants.MEDIA')) {
      let query = this.get('constants.MEDIA')[mediaName] || media(mediaName);
      let mediaList = window.matchMedia(query);
      let listenerName = mediaListenerName(mediaName);

      // Sets mediaList to a property so removeListener can access it
      this.set(`${listenerName}List`, mediaList);

      // Creates a function based on mediaName so that removeListener can remove it.
      this.set(listenerName, run.bind(this, (result) => {
        this._mediaDidChange(mediaName, result.matches);
      }));

      // Trigger initial grid calculations
      this._mediaDidChange(mediaName, mediaList.matches);

      mediaList.addListener(this[listenerName]);
    }
  },

  _uninstallMediaListener() {
    for (let mediaName in this.get('constants.MEDIA')) {
      let listenerName = mediaListenerName(mediaName);
      let mediaList = this.get(`${listenerName}List`);
      mediaList.removeListener(this[listenerName]);
    }
  },

  _mediaDidChange(mediaName, matches) {
    this.set(mediaName, matches);

    // Debounces until the next run loop
    run.debounce(this, this._updateCurrentMedia, 0);
  },

  _updateCurrentMedia() {
    let mediaPriorities = this.get('constants.MEDIA_PRIORITY');
    let currentMedia = mediaPriorities.filter((mediaName) => this.get(mediaName));
    this.set('currentMedia', currentMedia);
    this.updateGrid();
  },

  // Updates styles and triggers onUpdate callbacks
  updateGrid() {
    applyStyles(this.element, this._gridStyle());

    this.get('tiles').forEach((tile) => tile.updateTile());
    invokeAction(this, 'onUpdate');
  },

  _gridStyle() {
    this._setTileLayout();

    let style = {};
    let colCount = this.get('currentCols');
    let gutter = this.get('currentGutter');
    let rowHeight = this.get('currentRowHeight');
    let rowMode = this.get('currentRowMode');
    let rowCount = this.get('rowCount');

    switch (rowMode) {
      case 'fixed': {
        style.height = dimensionCSS({ unit: rowHeight, span: rowCount, gutter });
        style.paddingBottom = '';
        break;
      }
      case 'ratio': {
        // rowHeight is width / height
        let hGutterShare = colCount === 1 ? 0 : (colCount - 1) / colCount;
        let hShare = (1 / colCount) * 100;
        let vShare = hShare * (1 / rowHeight);
        let vUnit = unitCSS({ share: vShare, gutterShare: hGutterShare, gutter });

        style.height = '';
        style.paddingBottom = dimensionCSS({ unit: vUnit, span: rowCount, gutter });
        break;
      }
      case 'fit': {
        // rowHeight is container height
        style.height = '100%';
        break;
      }
    }

    return style;
  },

  // Calculates tile positions
  _setTileLayout() {
    let tiles = this.orderedTiles();
    let layoutInfo = gridLayout(this.get('currentCols'), tiles);

    tiles.forEach((tile, i) => tile.set('position', layoutInfo.positions[i]));

    this.set('rowCount', layoutInfo.rowCount);
  },

  // Sorts tiles by their order in the dom
  orderedTiles() {
    // Convert NodeList to native javascript array, to be able to use indexOf.
    let domTiles = Array.prototype.slice.call(this.element.querySelectorAll('md-grid-tile'));

    return this.get('tiles').sort((a, b) => {
      return domTiles.indexOf(a.get('element')) > domTiles.indexOf(b.get('element')) ? 1 : -1;
    });
  },

  // Parses attribute string and returns hash of media sizes
  _extractResponsiveSizes(string, regex = mediaRegex) {
    let matches = {};
    let match;
    while ((match = regex.exec(string))) {
      if (match[2]) {
        matches[match[2].slice(0, -1)] = match[3];
      } else {
        matches.base = match[3];
      }
    }
    return matches;
  },

  // Gets attribute for current media
  _getAttributeForMedia(sizes, currentMedia) {
    for (let i = 0; i < currentMedia.length; i++) {
      if (sizes[currentMedia[i]]) {
        return sizes[currentMedia[i]];
      }
    }
    return sizes.base;
  },

  colsMedia: computed('cols', function() {
    let sizes = this._extractResponsiveSizes(this.get('cols'));
    if (Object.keys(sizes).length === 0) {
      throw new Error('md-grid-list: No valid cols found');
    }
    return sizes;
  }),

  currentCols: computed('colsMedia', 'currentMedia.[]', function() {
    return this._getAttributeForMedia(this.get('colsMedia'), this.get('currentMedia')) || 1;
  }),

  gutterMedia: computed('gutter', function() {
    return this._extractResponsiveSizes(this.get('gutter'), rowHeightRegex);
  }),

  currentGutter: computed('gutterMedia', 'currentMedia.[]', function() {
    return this._applyDefaultUnit(this._getAttributeForMedia(this.get('gutterMedia'), this.get('currentMedia')) || 1);
  }),

  rowHeightMedia: computed('rowHeight', function() {
    let rowHeights = this._extractResponsiveSizes(this.get('rowHeight'), rowHeightRegex);
    if (Object.keys(rowHeights).length === 0) {
      throw new Error('md-grid-list: No valid rowHeight found');
    }
    return rowHeights;
  }),

  currentRowHeight: computed('rowHeightMedia', 'currentMedia.[]', function() {
    let rowHeight = this._getAttributeForMedia(this.get('rowHeightMedia'), this.get('currentMedia'));
    // eslint-disable-next-line ember/no-side-effects
    this.set('currentRowMode', this._getRowMode(rowHeight));
    switch (this._getRowMode(rowHeight)) {
      case 'fixed': {
        return this._applyDefaultUnit(rowHeight);
      }
      case 'ratio': {
        let whRatio = rowHeight.split(':');
        return parseFloat(whRatio[0]) / parseFloat(whRatio[1]);
      }
      case 'fit': {
        return 0;
      }
    }

    return undefined;
  }),

  _getRowMode(rowHeight) {
    if (rowHeight === 'fit') {
      return 'fit';
    } else if (rowHeight.indexOf(':') !== -1) {
      return 'ratio';
    } else {
      return 'fixed';
    }
  },

  _applyDefaultUnit(val) {
    return /\D$/.test(val) ? val : `${val}px`;
  }

});
