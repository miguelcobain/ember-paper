/**
 * @module ember-paper
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import gridLayout from '../utils/grid-layout';
import { debounce } from '../utils/raf';

const mediaRegex = /(^|\s)((?:print-)|(?:[a-z]{2}-){1,2})?(\d+)(?!\S)/g;
const rowHeightRegex =
  /(^|\s)((?:print-)|(?:[a-z]{2}-){1,2})?(\d+(?:[a-z]{2,3}|%)?|\d+:\d+|fit)(?!\S)/g;

const unitCSS = (units) => {
  return `${units.share}% - (${units.gutter} * ${units.gutterShare})`;
};

const dimensionCSS = (dimensions) => {
  return `calc((${dimensions.unit}) * ${dimensions.span} + (${dimensions.span} - 1) * ${dimensions.gutter})`;
};

const media = (mediaName) => {
  return mediaName.charAt(0) !== '(' ? `(${mediaName})` : mediaName;
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
 * A responsive grid list component that arranges child tiles in a configurable grid layout
 *
 * @class PaperGridList
 * @extends Component
 * @arg {string} class
 * @arg {string} cols
 * @arg {string} gutter
 * @arg {string} rowHeight
 */
export default class PaperGridList extends Component {
  /**
   * Service containing media query breakpoints and constants
   */
  @service constants;

  /**
   * Set of child grid tile components
   * @type {Set<PaperGridTile>}
   */
  @tracked children;
  /**
   * Set of callbacks to notify children when they need to update their position.
   * @type {Set<Function>}
   */
  @tracked childrenNotifyUpdate;
  /**
   * Reference to the component's DOM element
   * @type {HTMLElement}
   */
  @tracked element;
  /**
   * Map of media query listener instances
   * @type {Object}
   */
  @tracked listenerList = {};
  /**
   * Map of media query change handler functions
   * @type {Object}
   */
  @tracked listeners = {};
  /**
   * Map of active media query states
   * @type {Object}
   */
  @tracked media = {};
  /**
   * RAF ID for debouncing grid updates
   * @type {number}
   */
  @tracked rafUpdateGrid;
  /**
   * Number of rows in the grid
   * @type {number}
   */
  @tracked rowCount;

  constructor() {
    super(...arguments);

    this.children = new Set();
    this.childrenNotifyUpdate = new Set();
  }

  /**
   * Performs any required DOM setup.
   * @param {HTMLElement} element
   */
  @action didInsertNode(element) {
    this.element = element;
    this._installMediaListener();
  }

  @action didUpdateNode() {
    this.updateGrid();
  }

  willDestroy() {
    super.willDestroy(...arguments);
    this._uninstallMediaListener();
  }

  /**
   * Registers a child tile component
   * @param {PaperGridTile} tile - The tile component to register
   * @param {Function} notifyUpdate - A callback to notify children on when they should update.
   */
  @action registerChild(tile, notifyUpdate) {
    this.children.add(tile);
    this.childrenNotifyUpdate.add(notifyUpdate);
    this.updateGrid();
  }

  /**
   * Unregisters a child tile component
   * @param {PaperGridTile} tile - The tile component to unregister
   * @param {Function} notifyUpdate - The notify callback to remove.
   */
  @action unregisterChild(tile, notifyUpdate) {
    this.children.delete(tile);
    this.childrenNotifyUpdate.delete(notifyUpdate);
    this.updateGrid();
  }

  // Sets up a listener for each media query
  _installMediaListener() {
    for (let mediaName in this.constants.MEDIA) {
      let query = this.constants.MEDIA[mediaName] || media(mediaName);
      let mediaList = window.matchMedia(query);
      let listenerName = mediaListenerName(mediaName);

      // Sets mediaList to a property so removeListener can access it
      this.listenerList[`${listenerName}List`] = mediaList;

      // Creates a function based on mediaName so that removeListener can remove it.
      let onchange = (result) => {
        this._mediaDidChange(mediaName, result.matches);
      };
      this.listeners[listenerName] = onchange.bind(this);

      // Trigger initial grid calculations
      this._mediaDidChange(mediaName, mediaList.matches);

      mediaList.addListener(this.listeners[listenerName]);
    }
  }

  _uninstallMediaListener() {
    for (let mediaName in this.constants.MEDIA) {
      let listenerName = mediaListenerName(mediaName);
      let mediaList = this.listenerList[`${listenerName}List`];
      if (mediaList) {
        mediaList.removeListener(this.listeners[listenerName]);
      }
    }
  }

  _mediaDidChange(mediaName, matches) {
    this.media[mediaName] = matches;
    this.updateGrid();
  }

  // Updates styles and triggers onUpdate callbacks
  updateGrid() {
    // Debounce until the next frame
    const updateGrid = () => {
      applyStyles(this.element, this._gridStyle());
      this.childrenNotifyUpdate.forEach((notify) => notify());
      if (this.args.onUpdate) {
        this.args.onUpdate();
      }
    };

    this.rafUpdateGrid = debounce(this.rafUpdateGrid, updateGrid);
  }

  _gridStyle() {
    this._setTileLayout();

    let style = {};
    let colCount = this.currentCols;
    let gutter = this.currentGutter;
    let rowHeight = this.currentRowHeight;
    let rowMode = this.currentRowMode;
    let rowCount = this.rowCount;

    switch (rowMode) {
      case 'fixed': {
        style.height = dimensionCSS({
          unit: rowHeight,
          span: rowCount,
          gutter,
        });
        style.paddingBottom = '';
        break;
      }
      case 'ratio': {
        // rowHeight is width / height
        let hGutterShare = colCount === 1 ? 0 : (colCount - 1) / colCount;
        let hShare = (1 / colCount) * 100;
        let vShare = hShare * (1 / rowHeight);
        let vUnit = unitCSS({
          share: vShare,
          gutterShare: hGutterShare,
          gutter,
        });

        style.height = '';
        style.paddingBottom = dimensionCSS({
          unit: vUnit,
          span: rowCount,
          gutter,
        });
        break;
      }
      case 'fit': {
        // rowHeight is container height
        style.height = '100%';
        break;
      }
    }

    return style;
  }

  // Calculates tile positions
  _setTileLayout() {
    let tiles = this.orderedTiles;
    let layoutInfo = gridLayout(this.currentCols, tiles);

    tiles.forEach((tile, i) => {
      tile.position = layoutInfo.positions[i];
    });

    this.rowCount = layoutInfo.rowCount;
  }

  /**
   * Returns child tiles sorted by DOM order
   * @type {Array<PaperGridTile>}
   */
  get orderedTiles() {
    // Convert NodeList to native javascript array, to be able to use indexOf.
    let domTiles = Array.prototype.slice.call(
      this.element.querySelectorAll('md-grid-tile')
    );

    return Array.from(this.children).sort((a, b) => {
      return domTiles.indexOf(a.element) > domTiles.indexOf(b.element) ? 1 : -1;
    });
  }

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
  }

  // Gets attribute for current media
  _getAttributeForMedia(sizes, currentMedia) {
    for (let i = 0; i < currentMedia.length; i++) {
      if (sizes[currentMedia[i]]) {
        return sizes[currentMedia[i]];
      }
    }
    return sizes.base;
  }

  /**
   * Returns the parsed responsive column sizes
   * @type {Object<string,number>}
   */
  get colsMedia() {
    let sizes = this._extractResponsiveSizes(this.args.cols);
    if (Object.keys(sizes).length === 0) {
      throw new Error('md-grid-list: No valid cols found');
    }
    return sizes;
  }

  /**
   * Returns the currently active media query breakpoints
   * @type {Array<string>}
   */
  get currentMedia() {
    let mediaPriorities = this.constants.MEDIA_PRIORITY;
    return mediaPriorities.filter((mediaName) => this.media[mediaName]);
  }

  /**
   * Returns the current number of columns based on active media queries
   * @type {number}
   */
  get currentCols() {
    return this._getAttributeForMedia(this.colsMedia, this.currentMedia) || 1;
  }

  /**
   * Returns the parsed responsive gutter sizes
   * @type {Object<string,string|number>}
   */
  get gutterMedia() {
    return this._extractResponsiveSizes(this.args.gutter, rowHeightRegex);
  }

  /**
   * Returns the current gutter size based on active media queries
   * @type {string}
   */
  get currentGutter() {
    return this._applyDefaultUnit(
      this._getAttributeForMedia(this.gutterMedia, this.currentMedia) || 1
    );
  }

  /**
   * Returns the parsed responsive row heights
   * @type {Object<string,string|number>}
   */
  get rowHeightMedia() {
    let rowHeights = this._extractResponsiveSizes(
      this.args.rowHeight,
      rowHeightRegex
    );
    if (Object.keys(rowHeights).length === 0) {
      throw new Error('md-grid-list: No valid rowHeight found');
    }
    return rowHeights;
  }

  /**
   * Returns the calculated row height based on the current media query.
   * @returns {string}
   */
  get rowHeight() {
    return this._getAttributeForMedia(this.rowHeightMedia, this.currentMedia);
  }

  /**
   * Current row height mode ('fixed', 'ratio', or 'fit')
   * @type {string}
   */
  get currentRowMode() {
    return this._getRowMode(this.rowHeight);
  }

  /**
   * Returns the current row height based on the row mode.
   * @type {string|number|undefined}
   */
  get currentRowHeight() {
    let rowHeight = this.rowHeight;
    switch (this.currentRowMode) {
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
  }

  _getRowMode(rowHeight) {
    if (rowHeight === 'fit') {
      return 'fit';
    } else if (rowHeight.indexOf(':') !== -1) {
      return 'ratio';
    } else {
      return 'fixed';
    }
  }

  _applyDefaultUnit(val) {
    return /\D$/.test(val) ? val : `${val}px`;
  }
}
