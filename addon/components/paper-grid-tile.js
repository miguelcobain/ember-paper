import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

/**
 * Converts a unit value and span into a CSS calc expression for positioning
 * @param {Object} positions - Position parameters
 * @param {string} positions.unit - The base unit value
 * @param {number} positions.offset - The offset multiplier
 * @param {string} positions.gutter - The gutter size
 * @returns {string} The CSS calc expression
 */
const positionCSS = (positions) => {
  return `calc((${positions.unit} + ${positions.gutter}) * ${positions.offset})`;
};

/**
 * Converts a unit value and span into a CSS calc expression for dimensions
 * @param {Object} dimensions - Dimension parameters
 * @param {string} dimensions.unit - The base unit value
 * @param {number} dimensions.span - The span multiplier
 * @param {string} dimensions.gutter - The gutter size
 * @returns {string} The CSS calc expression
 */
const dimensionCSS = (dimensions) => {
  return `calc((${dimensions.unit}) * ${dimensions.span} + (${dimensions.span} - 1) * ${dimensions.gutter})`;
};

/**
 * Converts share and gutter values into a CSS calc expression for units
 * @param {Object} units - Unit parameters
 * @param {number} units.share - The percentage share
 * @param {number} units.gutterShare - The gutter share
 * @param {string} units.gutter - The gutter size
 * @returns {string} The CSS calc expression
 */
const unitCSS = (units) => {
  return `${units.share}% - (${units.gutter} * ${units.gutterShare})`;
};

/**
 * Applies a set of styles to an HTML element
 * @param {HTMLElement} el - The target element
 * @param {Object} styles - Object containing style properties and values
 */
const applyStyles = (el, styles) => {
  for (let key in styles) {
    el.style[key] = styles[key];
  }
};

/**
 * A tile component that represents a cell within a grid list
 *
 * @class PaperGridTile
 * @extends Component
 * @arg {string} class
 * @arg {string} colspan
 * @arg {string} rowspan
 */
export default class PaperGridTile extends Component {
  /**
   * Reference to the tile's DOM element
   * @type {HTMLElement}
   */
  @tracked element;
  /**
   * Reference to the parent grid list component
   * @type {PaperGridList}
   */
  @tracked gridList;
  /**
   * Current position of the tile in the grid
   * @type {{row: number, col: number}}
   */
  @tracked position;

  constructor() {
    super(...arguments);

    this.gridList = this.args.parent;
  }

  @action didInsertNode(element) {
    this.element = element;

    this.args.parent.registerChild(this, this.updateTile);
  }

  @action didUpdateNode() {
    this.gridList.didUpdateNode();
  }

  willDestroy() {
    super.willDestroy(...arguments);

    this.args.parent.unregisterChild(this, this.updateTile);
  }

  /**
   * Returns the parsed responsive column span sizes
   * @type {Object<string,string>}
   */
  get colspanMedia() {
    return this.gridList._extractResponsiveSizes(this.args.colspan);
  }

  /**
   * Returns the current column span based on active media queries
   * @type {number}
   */
  get currentColspan() {
    let colspan = this.gridList._getAttributeForMedia(
      this.colspanMedia,
      this.gridList.currentMedia
    );
    return parseInt(colspan, 10) || 1;
  }

  /**
   * Returns the parsed responsive row span sizes
   * @type {Object<string,string>}
   */
  get rowspanMedia() {
    return this.gridList._extractResponsiveSizes(this.args.rowspan);
  }

  /**
   * Returns the current row span based on active media queries
   * @type {number}
   */
  get currentRowspan() {
    let rowspan = this.gridList._getAttributeForMedia(
      this.rowspanMedia,
      this.gridList.currentMedia
    );
    return parseInt(rowspan, 10) || 1;
  }

  /**
   * Updates the tile's styles when the grid layout changes
   */
  @action updateTile() {
    applyStyles(this.element, this._tileStyle());
    if (this.args.onUpdate) {
      this.args.onUpdate();
    }
  }

  _tileStyle() {
    let position = this.position; // this is set/updated by the parent
    let currentColspan = this.currentColspan;
    let currentRowspan = this.currentRowspan;
    let rowCount = this.gridList.rowCount;
    let colCount = this.gridList.currentCols;
    let gutter = this.gridList.currentGutter;
    let rowMode = this.gridList.currentRowMode;
    let rowHeight = this.gridList.currentRowHeight;

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
      height: '',
    };

    let vShare, vUnit;

    switch (rowMode) {
      case 'fixed': {
        // In fixed mode, simply use the given rowHeight.
        style.top = positionCSS({
          unit: rowHeight,
          offset: position.row,
          gutter,
        });
        style.height = dimensionCSS({
          unit: rowHeight,
          span: currentRowspan,
          gutter,
        });
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
        style.paddingTop = dimensionCSS({
          unit: vUnit,
          span: currentRowspan,
          gutter,
        });
        style.marginTop = positionCSS({
          unit: vUnit,
          offset: position.row,
          gutter,
        });
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
        style.height = dimensionCSS({
          unit: vUnit,
          span: currentRowspan,
          gutter,
        });
        break;
      }
    }

    return style;
  }
}
