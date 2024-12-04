import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';

export default class PaperTabs extends Component {
  @service constants;
  @service fastboot;

  /**
   * Reference to the component's DOM element.
   *
   * @type {HTMLElement}
   * @private
   */
  @tracked element;
  /**
   * Reference to the component's md-tabs-canvas DOM element.
   *
   * @type {HTMLElement}
   * @private
   */
  @tracked elementTabsCanvas;
  /**
   * Reference to the component's md-pagination-wrapper DOM element.
   *
   * @type {HTMLElement}
   * @private
   */
  @tracked elementPaginationWrapper;
  /**
   * Array of tab components.
   *
   * @type {A}
   */
  @tracked children;
  /**
   * tracks the outer width of the element displaying the tabs.
   *
   * `>[[ tab ][ tab ]     ]<`
   *
   * @type {number}
   */
  @tracked canvasWidth;
  /**
   * tracks the width of the tabs within the tab canvas. See {@link canvasWidth}.
   *
   * `[>[ tab ][ tab ]<     ]`
   *
   * @type {number}
   */
  @tracked wrapperWidth;
  /**
   * used to offset tabs based on pagination.
   *
   * `>[ tab ][ tab ]< [ [<-] [ tab ]     [->] ]`
   *
   * @type {number}
   */
  @tracked currentOffset;
  /**
   * holds a reference to the currently selected tab.
   *
   * @type {PaperTab}
   * @private
   */
  @tracked selectedTab = null;
  /**
   * tracks the direction in which inkbar should be animated.
   *
   * @type {boolean}
   */
  @tracked movingRight = true;
  /**
   * set to true if the tab bar should enable paginating through tabs via
   * left/right navigation arrows.
   *
   * @type {boolean}
   */
  @tracked shouldPaginate = false;
  /**
   * _selected provides auto-tracking of selected tabs, this is kept private, so
   * that {@link selected} can output either the auto-tracked number, or a
   * user supplied value.
   *
   * @type {number|any}
   * @private
   * @default 0 - the first tab when using auto-numbering.
   */
  @tracked _selected;

  constructor(owner, args) {
    super(owner, args);

    this.children = A([]);
    this.canvasWidth = 0;
    this.wrapperWidth = 0;
    this.currentOffset = 0;
    this._selected = 0;
  }

  /**
   * Performs any required DOM setup.
   * @param element
   */
  @action didInsertNode(element) {
    this.element = element;
    this.elementTabsCanvas = element.querySelector('md-tabs-canvas');
    this.elementPaginationWrapper = element.querySelector(
      'md-pagination-wrapper'
    );

    window.addEventListener('resize', this.updateCanvasWidth);
    window.addEventListener('orientationchange', this.updateCanvasWidth);

    // Do an initial sizing computation.
    this.didUpdateNode(element);
  }

  @action didUpdateNode() {
    // this makes sure that the tabs react to stretch and center changes
    // this method is also called whenever one of the tab is re-rendered (content changes)
    this.updateCanvasWidth();
    this.updateSelectedTab();
    this.fixOffsetIfNeeded();
  }

  /**
   * Performs any required DOM teardown.
   * @param {HTMLElement} element
   */
  @action willDestroyNode() {
    window.removeEventListener('resize', this.updateCanvasWidth);
    window.removeEventListener('orientationchange', this.updateCanvasWidth);
  }

  /**
   * Registers a child form component
   * @param {PaperTab} child - The paper tab component to register
   */
  @action registerChild(child) {
    // automatically set value if not manually set
    if (child.value === undefined) {
      child.value = this.children.length;
    }

    this.children.pushObject(child);
  }
  /**
   * Removes a registered child form component
   * @param {Component} child - The form component to unregister
   */
  @action unregisterChild(child) {
    this.children.removeObject(child);
  }

  /**
   * whether we can allow paginating to a previous number of tabs to display.
   *
   * @returns {boolean}
   */
  get canPageBack() {
    return this.currentOffset > 0;
  }

  /**
   * whether we can allow paginating to the next number of tabs to display.
   * @returns {boolean}
   */
  get canPageForward() {
    return this.wrapperWidth - this.currentOffset > this.canvasWidth;
  }

  /**
   * disables the animated bar that sits at the bottom of the currently
   * selected tab.
   *
   * @type {boolean}
   */
  get noInkBar() {
    return this.args.noInkBar || false;
  }

  /**
   * passes down to the individual tabs.
   *
   * @type {boolean}
   */
  get noInk() {
    return this.args.noInk || false;
  }

  get inkBar() {
    if (this.noInkBar) {
      return null;
    }

    let selectedTab = this.selectedTab;
    if (!selectedTab || selectedTab.left === undefined) {
      return null;
    }

    return {
      left: selectedTab.left,
      right: this.wrapperWidth - selectedTab.left - selectedTab.width,
    };
  }

  /**
   * returns a 3d translate based on the number of tabs to offset by depending
   * on the current pagination.
   *
   * @returns {string}
   */
  get paginationStyle() {
    return htmlSafe(
      `transform: translate3d(-${this.currentOffset}px, 0px, 0px);`
    );
  }

  /**
   * Returns a user supplied value, or the auto-tracked tab selection via
   * {@link _selected}.
   *
   * @returns {any|number}
   */
  get selected() {
    return this.args.selected || this._selected;
  }

  /**
   * returns true if the tabs should be centered.
   *
   * Only applicable if the number of tabs don't overflow, causing pagination
   * to be enabled.
   *
   * @returns {boolean}
   */
  get shouldCenter() {
    let center = this.args.center ?? false;
    return !this.shouldPaginate && center;
  }

  /**
   * returns true if the tabs should be stretched based on either matching a
   * provided media query {e.g. sm, md} or being set to true.
   *
   * Only applicable if the number of tabs don't overflow, causing pagination
   * to be enabled.
   *
   * @returns {boolean}
   */
  get shouldStretch() {
    let stretch = this.args.stretch ?? 'sm';
    let shouldStretch;

    // if `true` or `false` is specified, always/never "stretch tabs"
    // otherwise proceed with normal matchMedia test
    if (typeof stretch === 'boolean') {
      shouldStretch = stretch;
    } else {
      let mediaQuery = this.constants.MEDIA[stretch] || stretch;
      shouldStretch = !this.fastboot.isFastBoot
        ? window.matchMedia(mediaQuery).matches
        : false;
    }

    return !this.shouldPaginate && shouldStretch;
  }

  /**
   * forces re-computation of element widths and tab offset.
   */
  @action updateCanvasWidth() {
    this.updateDimensions();
    this.fixOffsetIfNeeded();
  }

  /**
   * Updates the currently selected tab only once all the <paper-tab> has rendered.
   *
   * If we were to use a computed property the observer would get triggered once per
   * nested <paper-tab> because we pass the 'selected' property to them that will
   * invalidate their 'isSelected' property.
   */
  @action updateSelectedTab() {
    let selectedTab = this.children.findBy('isSelected');
    let previousSelectedTab = this.selectedTab;
    if (selectedTab === previousSelectedTab) {
      return;
    }

    this.movingRight =
      !selectedTab ||
      !previousSelectedTab ||
      previousSelectedTab.left < selectedTab.left;
    this.selectedTab = selectedTab;
  }

  /**
   * updates the pagination tab offset if needed.
   */
  @action fixOffsetIfNeeded() {
    if (this.isDestroying || this.isDestroyed || !this.selectedTab) {
      // Don't attempt to compute if elements have not been added or are being
      // removed from the DOM.
      return;
    }

    let canvasWidth = this.canvasWidth;
    let currentOffset = this.currentOffset;

    let { left, width } = this.selected;
    let tabLeftOffset = left;
    let tabRightOffset = tabLeftOffset + width;

    let newOffset;
    if (canvasWidth < width) {
      // align with selectedTab if canvas smaller than selected tab
      newOffset = tabLeftOffset;
    } else if (tabRightOffset - currentOffset > canvasWidth) {
      // ensure selectedTab is not partially hidden on the right side
      newOffset = tabRightOffset - canvasWidth;
    } else if (tabLeftOffset < currentOffset) {
      // ensure selectedTab is not partially hidden on the left side
      newOffset = tabLeftOffset;
    } else {
      newOffset = currentOffset;
    }

    if (newOffset === currentOffset) {
      return;
    }

    this.currentOffset = newOffset;
  }

  /**
   * sets widths based on the current tab canvas and pagination wrapper
   * elements.
   */
  @action updateDimensions() {
    if (!this.element) {
      // node not added to the DOM yet...
      return;
    }

    let canvasWidth = this.elementTabsCanvas.offsetWidth;
    let wrapperWidth = this.elementPaginationWrapper.offsetWidth;
    this.children.forEach((c) => c.updateDimensions());
    this.canvasWidth = canvasWidth;
    this.wrapperWidth = wrapperWidth;
    this.shouldPaginate = wrapperWidth > canvasWidth;
  }

  /**
   * computes if a tab offset is required when paginating backwards.
   */
  @action previousPage() {
    let tab = this.children.find((t) => {
      // ensure we are not stuck because of a tab with a width > canvasWidth
      return t.left + t.width >= this.currentOffset;
    });
    if (tab) {
      this.currentOffset = Math.max(0, tab.left - this.canvasWidth);
    }
  }

  /**
   * computes if a tab offset is required when paginating forwards.
   */
  @action nextPage() {
    let tab = this.children.find((t) => {
      // ensure tab's offset is greater than current otherwise if the tab's
      // width is greater than canvas we cannot paginate through it.
      return (
        t.left > this.currentOffset &&
        // paginate until the first partially hidden tab
        t.left + t.width - this.currentOffset > this.canvasWidth
      );
    });
    if (tab) {
      this.currentOffset = tab.left;
    }
  }

  /**
   * sets the current selected tab value, or passes the value up to the user to
   * pass back down.
   *
   * @param {PaperTab} selected
   */
  @action localOnChange(selected) {
    // support non DDAU scenario
    if (this.args.onChange) {
      this.args.onChange(selected.value);
    } else {
      // update our private reference
      this._selected = selected.value;
    }
  }
}
