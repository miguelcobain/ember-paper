/**
 * @module ember-paper
 */
import Focusable from './-focusable';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { htmlSafe } from '@ember/template';
import { assert } from '@ember/debug';

/**
 * @class PaperTab
 * @extends Focusable
 */
export default class PaperTab extends Focusable {
  /**
   * Reference to the component's DOM element.
   *
   * @type {HTMLElement}
   */
  @tracked element;
  /**
   * The parent this component is bound to.
   *
   * @type {PaperTabs}
   */
  parent;
  /**
   * Marks whether the component should register itself to the supplied parent.
   *
   * @type {Boolean}
   */
  shouldRegister;
  /**
   * The top level tag to render. One of {'a', 'md-tab'}.
   *
   * @type {string}
   * @private
   * @default 'md-tab-item'
   */
  tag;
  /**
   * provides a proxy value if one is not supplied by the user.
   *
   * @type {number|*}
   * @private
   */
  @tracked _value;
  /**
   * the number of pixels that the upper left corner of the current element is
   * offset to the left within the {@link HTMLElement.offsetParent} node.
   *
   * @type{number}
   */
  // @tracked left;
  /**
   * the layout width of the element as an integer.
   *
   * @type{number}
   */
  // @tracked width;

  /**
   * @constructor
   * @param owner
   * @param args
   */
  constructor(owner, args) {
    super(owner, args);

    this.tag = 'md-tab-item';
    if (this.args.href) {
      this.tag = 'a';
    }

    this.shouldRegister = this.args.shouldRegister || true;
    if (this.shouldRegister) {
      assert(
        'A parent component should be supplied to <PaperTab>',
        this.args.parentComponent
      );
      this.parent = this.args.parentComponent;
    }
  }

  /**
   * Performs any required DOM setup.
   *
   * @param {HTMLElement} element - the node that has been added to the DOM.
   */
  @action didInsertNode(element) {
    this.element = element;
    // this.left = element.offsetLeft;
    // this.width = element.offsetWidth;

    this.registerListeners(element);

    if (this.shouldRegister) {
      this.parent.registerChild(this);
    }
  }

  /**
   * didUpdateNode is called when tracked component attributes change.
   */
  @action didUpdateNode() {
    if (this.args.value) {
      this.value = this.args.value;
    }
  }

  /**
   * Performs any required DOM teardown.
   *
   * @param {HTMLElement} element - the node to be removed from the DOM.
   */
  @action willDestroyNode(element) {
    this.unregisterListeners(element);
  }

  /**
   * lifecycle hook to perform non-DOM related teardown.
   */
  willDestroy() {
    super.willDestroy();

    if (this.shouldRegister) {
      this.parent.unregisterChild(this);
    }
  }

  /**
   * <a> tags have browser styles or are usually styled by the user
   * this makes sure that tab item still looks good with an anchor tag.
   *
   * @returns {string|undefined}
   */
  get style() {
    if (this.args.href) {
      return htmlSafe('text-decoration: none; border: none;');
    } else {
      return undefined;
    }
  }

  /**
   * maybeHref returns the user supplied href link url.
   *
   * @returns {string|undefined}
   */
  get maybeHref() {
    if (this.args.href && !this.disabled) {
      return this.args.href;
    } else {
      return undefined;
    }
  }

  /**
   * computes whether this is the currently selected tab.
   *
   * @returns {boolean}
   */
  get isSelected() {
    return this.args.selected === this.value;
  }

  get el() {
    return this.element;
  }

  get left() {
    console.log('lefting');
    return this.element ? this.element.offsetLeft : 0;
  }
  get width() {
    return this.element ? this.element.offsetWidth : 0;
  }

  // this method is called by the parent
  // updateDimensions() {
  //   // this is the true current width
  //   // it is used to calculate the ink bar position & pagination offset
  //   this.left = this.element.offsetLeft;
  //   this.width = this.element.offsetWidth;
  // }

  get value() {
    // enable support for user supplied value
    return this.args.value || this._value;
  }
  set value(value) {
    this._value = value;
  }

  @action handleClick(e) {
    if (!this.disabled) {
      if (this.args.onClick) {
        this.args.onClick(e);
      }

      if (this.args.onSelect) {
        this.args.onSelect(this);
      }
    }
  }
}
