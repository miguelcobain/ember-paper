/**
 * @module ember-paper
 */
import Ember from 'ember';
import gridLayout from '../utils/grid-layout';

const { Component, inject, computed, A, run, get, isEqual } = Ember;

const unitCSS = (units) => {
  return `${units.share}% - (${units.gutter} * ${units.gutterShare})`;
};

const positionCSS = (positions) => {
  return `calc((${positions.unit} + ${positions.gutter}) * ${positions.offset})`;
};

const dimensionCSS = (dimensions) => {
  return `calc((${dimensions.unit}) * ${dimensions.span} + (${dimensions.span} - 1) * ${dimensions.gutter})`;
};

const media = (mediaName) => {
  return ((mediaName.charAt(0) !== '(') ? (`(${mediaName})`) : mediaName);
};

/**
 * @class PaperGridList
 * @extends Ember.Component
 */
export default Component.extend({
  tagName: 'md-grid-list',

  constants: inject.service(),

  layoutInvalidated: false,
  tilesInvalidated: false,
  lastLayoutProps: {},
  tiles: computed(function() {
    return A();
  }),

  _invalidateLayoutListener: computed(function() {
    return run.bind(this, () => {
      this.send('invalidateLayout');
    });
  }),

  didInsertElement() {
    this._super(...arguments);
    this._watchMedia();
    this._watchResponsiveAttributes(['md-cols', 'md-row-height', 'md-gutter'], run.bind(this, this.layoutIfMediaMatch));

  },

  willDestroyElement() {
    this._super(...arguments);
    this._unwatchMedia();
  },

  registerGridTile(gridTile) {
    this.get('tiles').addObject(gridTile);
  },

  doLayout() {
    try {
      let tilesInvalidated = this.get('tilesInvalidated');
      this._layoutDelegate(tilesInvalidated);
    } finally {
      this.setProperties({
        'layoutInvalidated': false,
        'tilesInvalidated': false
      });
    }
  },

  layoutIfMediaMatch(mediaName) {
    if (mediaName == null) {
      this.send('invalidateLayout');
    } else if (window.matchMedia(mediaName)) {
      this.send('invalidateLayout');
    }
  },

  _watchMedia() {

    let invalidateLayoutListener = this.get('_invalidateLayoutListener');

    for (let mediaName in this.get('constants.MEDIA')) {
      let query = this.get('constants.MEDIA')[mediaName] || media(mediaName);
      window.matchMedia(query).addListener(invalidateLayoutListener);
    }
  },

  _watchResponsiveAttributes(attrNames, watchFn) {
    let checkObserverValues = (sender, key, mediaName) => {
      let oldValue = sender.get(`old${key}`);
      let newValue = sender.get(key);

      if (oldValue !== newValue) {
        watchFn(mediaName);
      }

    };

    attrNames.forEach((attrName) => {
      if (get(this, attrName)) {
        this.set(`old${attrName}`, get(this, attrName));

        let customObserver = run.bind(this, checkObserverValues, this, attrName);

        this.addObserver(attrName, customObserver);
      }

      for (let mediaName in this.get('constants.MEDIA')) {
        let normalizedName = `${attrName}-${mediaName}`;
        if (get(this, normalizedName)) {
          let customObserverNormalized = run.bind(this, checkObserverValues, this, normalizedName, mediaName);
          this.addObserver(normalizedName, customObserverNormalized);
        }
      }

    });
  },

  _unwatchMedia() {
    let invalidateLayoutListener = this.get('_invalidateLayoutListener');
    for (let mediaName in this.get('constants.MEDIA')) {
      let query = this.get('constants.MEDIA')[mediaName] || media(mediaName);
      window.matchMedia(query).removeListener(invalidateLayoutListener);
    }
  },

  _getResponsiveAttribute(component, attrName) {
    let mediaPriorities = this.get('constants.MEDIA_PRIORITY');
    for (let i = 0; i < mediaPriorities.length; i++) {
      let mediaName = mediaPriorities[i];
      let query = this.get('constants.MEDIA')[mediaName] || media(mediaName);

      if (!window.matchMedia(query).matches) {
        continue;
      }

      let normalizedName = `${attrName}-${mediaName}`;
      if (get(component, normalizedName)) {
        return get(component, normalizedName);
      }
    }

    // fallback on unprefixed
    return get(component, attrName);
  },

  _getTileStyle(position, spans, colCount, rowCount, gutter, rowMode, rowHeight) {

    // Percent of the available horizontal space that one column takes up.
    let hShare = (1 / colCount) * 100;

    // Fraction of the gutter size that each column takes up.
    let hGutterShare = (colCount - 1) / colCount;

    // Base horizontal size of a column.
    let hUnit = unitCSS({ share: hShare, gutterShare: hGutterShare, gutter });

    // The width and horizontal position of each tile is always calculated the same way, but the
    // height and vertical position depends on the rowMode.
    let style = {
      left: positionCSS({ unit: hUnit, offset: position.col, gutter }),
      width: dimensionCSS({ unit: hUnit, span: spans.col, gutter }),
      // resets
      paddingTop: '',
      marginTop: '',
      top: '',
      height: ''
    };

    let vShare, vUnit;

    switch (rowMode) {
      case 'fixed': {
        // In fixed mode, simply use the given rowHeight.
        style.top = positionCSS({ unit: rowHeight, offset: position.row, gutter });
        style.height = dimensionCSS({ unit: rowHeight, span: spans.row, gutter });
        break;
      }
      case 'ratio': {
        // Percent of the available vertical space that one row takes up. Here, rowHeight holds
        // the ratio value. For example, if the width:height ratio is 4:3, rowHeight = 1.333.
        vShare = hShare / rowHeight;

        // Base veritcal size of a row.
        vUnit = unitCSS({ share: vShare, gutterShare: hGutterShare, gutter });

        // padidngTop and marginTop are used to maintain the given aspect ratio, as
        // a percentage-based value for these properties is applied to the *width* of the
        // containing block. See http://www.w3.org/TR/CSS2/box.html#margin-properties
        style.paddingTop = dimensionCSS({ unit: vUnit, span: spans.row, gutter });
        style.marginTop = positionCSS({ unit: vUnit, offset: position.row, gutter });
        break;
      }
      case 'fit': {
        // Fraction of the gutter size that each column takes up.
        let vGutterShare = (rowCount - 1) / rowCount;

        // Percent of the available vertical space that one row takes up.
        vShare = (1 / rowCount) * 100;

        // Base vertical size of a row.
        vUnit = unitCSS({ share: vShare, gutterShare: vGutterShare, gutter });

        style.top = positionCSS({ unit: vUnit, offset: position.row, gutter });
        style.height = dimensionCSS({ unit: vUnit, span: spans.row, gutter });
        break;
      }
    }

    return style;

  },

  _getGridStyle(colCount, rowCount, gutter, rowMode, rowHeight) {
    let style = {};

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
        // noop, as the height is user set
        break;
      }
    }

    return style;
  },

  _getTileSpans(tileElements) {
    return [].map.call(tileElements, (ele) => {
      return {
        row: parseInt(this._getResponsiveAttribute(ele, 'md-rowspan'), 10) || 1,
        col: parseInt(this._getResponsiveAttribute(ele, 'md-colspan'), 10) || 1
      };
    });
  },

  _getColumnCount() {
    let colCount = parseInt(this._getResponsiveAttribute(this, 'md-cols'), 10);
    if (isNaN(colCount)) {
      throw 'md-grid-list: md-cols attribute was not found, or contained a non-numeric value';
    }
    return colCount;
  },

  _getGutter() {
    return this._applyDefaultUnit(this._getResponsiveAttribute(this, 'md-gutter') || 1);
  },

  _getRowHeight() {
    let rowHeight = this._getResponsiveAttribute(this, 'md-row-height');
    switch (this._getRowMode()) {
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
  },

  _getRowMode() {
    let rowHeight = this._getResponsiveAttribute(this, 'md-row-height');
    if (rowHeight === 'fit') {
      return 'fit';
    } else if (rowHeight.indexOf(':') !== -1) {
      return 'ratio';
    } else {
      return 'fixed';
    }
  },

  _layoutDelegate(tilesInvalidated) {
    let tiles = this.get('tiles');
    let props = {
      tileSpans: this._getTileSpans(tiles),
      colCount: this._getColumnCount(),
      rowMode: this._getRowMode(),
      rowHeight: this._getRowHeight(),
      gutter: this._getGutter()
    };

    if (!tilesInvalidated && isEqual(props, this.get('lastLayoutProps'))) {
      return;
    }

    gridLayout(props.colCount, props.tileSpans, tiles)
      .map((tilePositions, rowCount) => {
        return {
          grid: {
            element: this.$(),
            style: this._getGridStyle(props.colCount, rowCount, props.gutter, props.rowMode, props.rowHeight)
          },
          tiles: tilePositions.map((ps, i) => {
            return {
              element: tiles[i].$(),
              style: this._getTileStyle(ps.position, ps.spans, props.colCount, rowCount, props.gutter, props.rowMode, props.rowHeight)
            };
          })
        };
      })
      .reflow();

    this.set('lastLayoutProps', props);

  },

  _applyDefaultUnit(val) {
    return /\D$/.test(val) ? val : `${val}px`;
  },

  actions: {
    invalidateTiles() {
      this.set('tilesInvalidated', true);
      this.send('invalidateLayout');
    },

    invalidateLayout() {
      if (this.get('layoutInvalidated') || this.get('isDestroyed') || this.get('isDestroying')) {
        return;
      }
      this.set('layoutInvalidated', true);
      run.next(this, this.doLayout);
    }
  }
});
