/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-grid-tile';
import { ChildMixin } from 'ember-composability-tools';

const { Component, computed, run } = Ember;

const positionCSS = (positions) => {
  return `calc((${positions.unit} + ${positions.gutter}) * ${positions.offset})`;
};

const dimensionCSS = (dimensions) => {
  return `calc((${dimensions.unit}) * ${dimensions.span} + (${dimensions.span} - 1) * ${dimensions.gutter})`;
};

const unitCSS = (units) => {
  return `${units.share}% - (${units.gutter} * ${units.gutterShare})`;
};

/**
 * @class PaperGridTile
 * @extends Ember.Component
 */
export default Component.extend(ChildMixin, {
  layout,
  tagName: 'md-grid-tile',

  gridList: computed.alias('parentComponent'),

  didUpdateAttrs() {
    this._super(...arguments);
    this.updateTile();
  },

  updateTile() {
    let gridList = this.get('gridList');
    run.debounce(gridList, gridList.updateGrid, 50);
  },

  colspanMedia: computed('colspan', function() {
    return this.get('gridList')._extractResponsiveSizes(this.get('colspan'));
  }),

  currentColspan: computed('colspanMedia', 'gridList.currentMedia.[]', function() {
    let colspan = this.get('gridList')._getAttributeForMedia(this.get('colspanMedia'), this.get('gridList.currentMedia'));
    return parseInt(colspan, 10) || 1;
  }),

  rowspanMedia: computed('rowspan', function() {
    return this.get('gridList')._extractResponsiveSizes(this.get('rowspan'));
  }),

  currentRowspan: computed('rowspanMedia', 'gridList.currentMedia.[]', function() {
    let rowspan = this.get('gridList')._getAttributeForMedia(this.get('rowspanMedia'), this.get('gridList.currentMedia'));
    return parseInt(rowspan, 10) || 1;
  }),

  _tileStyle() {
    let position = this.get('position');
    let currentColspan = this.get('currentColspan');
    let currentRowspan = this.get('currentRowspan');
    let rowCount = this.get('gridList.rowCount');
    let colCount = this.get('gridList.currentCols');
    let gutter = this.get('gridList.currentGutter');
    let rowMode = this.get('gridList.currentRowMode');
    let rowHeight = this.get('gridList.currentRowHeight');

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
      width: dimensionCSS({ unit: hUnit, span: currentColspan, gutter }),
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
        style.height = dimensionCSS({ unit: rowHeight, span: currentRowspan, gutter });
        break;
      }
      case 'ratio': {
        // Percent of the available vertical space that one row takes up. Here, rowHeight holds
        // the ratio value. For example, if the width:height ratio is 4:3, rowHeight = 1.333.
        vShare = hShare / rowHeight;

        // Base veritcal size of a row.
        vUnit = unitCSS({ share: vShare, gutterShare: hGutterShare, gutter });

        // paddingTop and marginTop are used to maintain the given aspect ratio, as
        // a percentage-based value for these properties is applied to the *width* of the
        // containing block. See http://www.w3.org/TR/CSS2/box.html#margin-properties
        style.paddingTop = dimensionCSS({ unit: vUnit, span: currentRowspan, gutter });
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
        style.height = dimensionCSS({ unit: vUnit, span: currentRowspan, gutter });
        break;
      }
    }

    return style;
  }

});
