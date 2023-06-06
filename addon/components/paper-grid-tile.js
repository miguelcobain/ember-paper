/* eslint-disable ember/no-computed-properties-in-native-classes, ember/no-classic-components, ember/no-component-lifecycle-hooks, ember/require-computed-property-dependencies, ember/no-get, ember/classic-decorator-no-classic-methods */
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { computed } from '@ember/object';
import { alias } from '@ember/object/computed';

import Component from '@ember/component';
import { debounce } from '@ember/runloop';
import layout from '../templates/components/paper-grid-tile';
import { ChildMixin } from 'ember-composability-tools';
import { invokeAction } from 'ember-paper/utils/invoke-action';

const positionCSS = (positions) => {
  return `calc((${positions.unit} + ${positions.gutter}) * ${positions.offset})`;
};

const dimensionCSS = (dimensions) => {
  return `calc((${dimensions.unit}) * ${dimensions.span} + (${dimensions.span} - 1) * ${dimensions.gutter})`;
};

const unitCSS = (units) => {
  return `${units.share}% - (${units.gutter} * ${units.gutterShare})`;
};

const applyStyles = (el, styles) => {
  for (let key in styles) {
    el.style[key] = styles[key];
  }
};

/**
 * @class PaperGridTile
 * @extends Ember.Component
 */
@templateLayout(layout)
@tagName('md-grid-tile')
export default class PaperGridTile extends Component.extend(ChildMixin) {
  @alias('parentComponent')
  gridList;

  didUpdateAttrs() {
    super.didUpdateAttrs(...arguments);
    let gridList = this.gridList;

    // Debounces until the next run loop
    debounce(gridList, gridList.updateGrid, 0);
  }

  updateTile() {
    applyStyles(this.element, this._tileStyle());
    invokeAction(this, 'onUpdate');
  }

  @computed('colspan')
  get colspanMedia() {
    return this.gridList._extractResponsiveSizes(this.colspan);
  }

  @computed('colspanMedia', 'gridList.currentMedia.[]')
  get currentColspan() {
    let colspan = this.gridList._getAttributeForMedia(this.colspanMedia, this.get('gridList.currentMedia'));
    return parseInt(colspan, 10) || 1;
  }

  @computed('rowspan')
  get rowspanMedia() {
    return this.gridList._extractResponsiveSizes(this.rowspan);
  }

  @computed('rowspanMedia', 'gridList.currentMedia.[]')
  get currentRowspan() {
    let rowspan = this.gridList._getAttributeForMedia(this.rowspanMedia, this.get('gridList.currentMedia'));
    return parseInt(rowspan, 10) || 1;
  }

  _tileStyle() {
    let position = this.position;
    let currentColspan = this.currentColspan;
    let currentRowspan = this.currentRowspan;
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
}
