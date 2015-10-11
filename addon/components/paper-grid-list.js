import Ember from 'ember';
import gridLayout from '../utils/grid-layout';

const UNIT = (units) => {
  return `${units.share}% - (${units.gutter} * ${units.gutterShare})`;
};

const POSITION = (positions) => {
  return `calc((${positions.unit} + ${positions.gutter}) * ${positions.offset})`;
};

const DIMENSION = (dimensions) => {
  return `calc((${dimensions.unit}) * ${dimensions.span} + (${dimensions.span} - 1) * ${dimensions.gutter})`;
};

const MEDIA = (mediaName) => {
  return ((mediaName.charAt(0) !== '(') ? ('(' + mediaName + ')') : mediaName);
};

export default Ember.Component.extend({
  tagName: 'md-grid-list',

  constants: Ember.inject.service(),

  layoutInvalidated: false,
  tilesInvalidated: false,
  lastLayoutProps: {},
  tiles: Ember.computed(function() {
    return Ember.A();
  }),

  _invalidateLayoutListener: Ember.computed(function() {
    return Ember.run.bind(this, () => {
      this.send('invalidateLayout');
    });
  }),

  didInsertElement() {
    this._super(...arguments);
    this._watchMedia();
    this._watchResponsiveAttributes(['md-cols', 'md-row-height', 'md-gutter'], Ember.run.bind(this, this.layoutIfMediaMatch));

  },

  willDestroyElement() {
    this._super(...arguments);
    this._unwatchMedia();
  },

  registerGridTile(gridTile) {
    this.get('tiles').addObject(gridTile);
  },

  layout() {
    try {
      var tilesInvalidated = this.get('tilesInvalidated');
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

    const invalidateLayoutListener = this.get('_invalidateLayoutListener');

    for (var mediaName in this.get('constants.MEDIA')) {
      var query = this.get('constants.MEDIA')[mediaName] || MEDIA(mediaName);
      window.matchMedia(query).addListener(invalidateLayoutListener);
    }
  },

  _watchResponsiveAttributes(attrNames, watchFn) {
    const checkObserverValues = (sender, key, mediaName) => {
      const oldValue = sender.get(`old${key}`),
            newValue = sender.get(key);

      if (oldValue !== newValue) {
        watchFn(mediaName);
      }

    };

    attrNames.forEach((attrName) => {
      if (Ember.get(this, attrName)) {
        this.set(`old${attrName}`, Ember.get(this, attrName));

        var customObserver = Ember.run.bind(this, checkObserverValues, this, attrName);

        this.addObserver(attrName, customObserver);
      }

      for (var mediaName in this.get('constants.MEDIA')) {
        var normalizedName = attrName + '-' + mediaName;
        if (Ember.get(this, normalizedName)) {
          var customObserverNormalized = Ember.run.bind(this, checkObserverValues, this, normalizedName, mediaName);
          this.addObserver(normalizedName, customObserverNormalized);
        }
      }

    });
  },

  _unwatchMedia() {
    const invalidateLayoutListener = this.get('_invalidateLayoutListener');
    for(var mediaName in this.get('constants.MEDIA')) {
      var query = this.get('constants.MEDIA')[mediaName] || MEDIA(mediaName);
      window.matchMedia(query).removeListener(invalidateLayoutListener);
    }
  },

  _getResponsiveAttribute(component, attrName) {
    const mediaPriorities = this.get('constants.MEDIA_PRIORITY');
    for (var i = 0; i < mediaPriorities.length; i++) {
      var mediaName = mediaPriorities[i],
          query = this.get('constants.MEDIA')[mediaName] || MEDIA(mediaName);

      if (!window.matchMedia(query).matches) {
        continue;
      }

      var normalizedName = attrName + '-' + mediaName;
      if (Ember.get(component, normalizedName)) {
        return Ember.get(component, normalizedName);
      }
    }

    // fallback on unprefixed
    return Ember.get(component, attrName);
  },



  _getTileStyle(position, spans, colCount, rowCount, gutter, rowMode, rowHeight) {

    // Percent of the available horizontal space that one column takes up.
    const hShare = (1 / colCount) * 100;

    // Fraction of the gutter size that each column takes up.
    const hGutterShare = (colCount - 1) / colCount;

    // Base horizontal size of a column.
    const hUnit = UNIT({share: hShare, gutterShare: hGutterShare, gutter: gutter});

    // The width and horizontal position of each tile is always calculated the same way, but the
    // height and vertical position depends on the rowMode.
    const style = {
      left: POSITION({unit: hUnit, offset: position.col, gutter: gutter}),
      width: DIMENSION({unit: hUnit, span: spans.col, gutter: gutter}),
      //resets
      paddingTop: '',
      marginTop: '',
      top: '',
      height: ''
    };

    let vShare, vUnit;

    switch (rowMode) {
      case 'fixed':
        // In fixed mode, simply use the given rowHeight.
        style.top = POSITION({unit: rowHeight, offset: position.row, gutter: gutter});
        style.height = DIMENSION({unit: rowHeight, span: spans.row, gutter: gutter});
        break;

      case 'ratio':
        // Percent of the available vertical space that one row takes up. Here, rowHeight holds
        // the ratio value. For example, if the width:height ratio is 4:3, rowHeight = 1.333.
        vShare = hShare / rowHeight;

        // Base veritcal size of a row.
        vUnit = UNIT({share: vShare, gutterShare: hGutterShare, gutter: gutter});

        // padidngTop and marginTop are used to maintain the given aspect ratio, as
        // a percentage-based value for these properties is applied to the *width* of the
        // containing block. See http://www.w3.org/TR/CSS2/box.html#margin-properties
        style.paddingTop = DIMENSION({unit: vUnit, span: spans.row, gutter: gutter});
        style.marginTop = POSITION({unit: vUnit, offset: position.row, gutter: gutter});
        break;

      case 'fit':
        // Fraction of the gutter size that each column takes up.
        var vGutterShare = (rowCount - 1) / rowCount;

        // Percent of the available vertical space that one row takes up.
        vShare = (1 / rowCount) * 100;

        // Base vertical size of a row.
        vUnit = UNIT({share: vShare, gutterShare: vGutterShare, gutter: gutter});

        style.top = POSITION({unit: vUnit, offset: position.row, gutter: gutter});
        style.height = DIMENSION({unit: vUnit, span: spans.row, gutter: gutter});
        break;
    }

    return style;

  },

  _getGridStyle(colCount, rowCount, gutter, rowMode, rowHeight) {
    const style = {};

    switch (rowMode) {
      case 'fixed':
        style.height = DIMENSION({unit: rowHeight, span: rowCount, gutter: gutter});
        style.paddingBottom = '';
        break;
      case 'ratio':
        // rowHeight is width / height
        const hGutterShare = colCount === 1 ? 0 : (colCount - 1) / colCount,
          hShare = (1 / colCount) * 100,
          vShare = hShare * (1 / rowHeight),
          vUnit = UNIT({share: vShare, gutterShare: hGutterShare, gutter: gutter});

        style.height = '';
        style.paddingBottom = DIMENSION({unit: vUnit, span: rowCount, gutter: gutter});
        break;
      case 'fit':
        // noop, as the height is user set
        break;
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
    const colCount = parseInt(this._getResponsiveAttribute(this, 'md-cols'), 10);
    if (isNaN(colCount)) {
      throw 'md-grid-list: md-cols attribute was not found, or contained a non-numeric value';
    }
    return colCount;
  },

  _getGutter() {
    return this._applyDefaultUnit(this._getResponsiveAttribute(this, 'md-gutter') || 1);
  },

  _getRowHeight() {
    const rowHeight = this._getResponsiveAttribute(this, 'md-row-height');
    switch (this._getRowMode()) {
      case 'fixed':
        return this._applyDefaultUnit(rowHeight);
      case 'ratio':
        var whRatio = rowHeight.split(':');
        return parseFloat(whRatio[0]) / parseFloat(whRatio[1]);
      case 'fit':
        return 0;
    }
  },

  _getRowMode() {
    const rowHeight = this._getResponsiveAttribute(this, 'md-row-height');
    if (rowHeight === 'fit') {
      return 'fit';
    } else if (rowHeight.indexOf(':') !== -1) {
      return 'ratio';
    } else {
      return 'fixed';
    }
  },


  _layoutDelegate(tilesInvalidated) {
    const tiles = this.get('tiles');
    const props = {
      tileSpans: this._getTileSpans(tiles),
      colCount: this._getColumnCount(),
      rowMode: this._getRowMode(),
      rowHeight: this._getRowHeight(),
      gutter: this._getGutter()
    };

    if (!tilesInvalidated && Ember.isEqual(props, this.get('lastLayoutProps'))) {
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
    return /\D$/.test(val) ? val : val + 'px';
  },

  actions: {
    invalidateTiles() {
      this.set('tilesInvalidated', true);
      this.send('invalidateLayout');
    },

    invalidateLayout() {
      if (this.get('layoutInvalidated')) {
        return;
      }
      this.set('layoutInvalidated', true);
      Ember.run.next(this, this.layout);
    }
  }
});
