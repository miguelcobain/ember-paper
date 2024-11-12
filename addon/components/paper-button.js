/**
 * @module ember-paper
 */
import Focusable from './-focusable';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

/**
 * @class PaperButton
 * @extends Focusable
 */
export default class PaperButton extends Focusable {
  /**
   * Reference to the component's DOM element
   * @type {HTMLElement}
   */
  @tracked element;
  /**
   * The parent this component is bound to.
   * @type {Boolean}
   */
  parent;
  /**
   * Marks whether the component should register itself to the supplied parent
   * @type {Boolean}
   */
  shouldRegister;
  /**
   * Marks whether the component should skip being proxied.
   * @type {Boolean}
   */
  skipProxy;

  constructor(owner, args) {
    super(owner, args);

    this.shouldRegister = this.args.shouldRegister || false;
    this.skipProxy = this.args.skipProxy || false;
    if (this.shouldRegister) {
      assert(
        'A parent component should be supplied to <PaperButton> when shouldRegister=true',
        this.args.parentComponent
      );
      this.parent = this.args.parentComponent;
    }
  }

  /**
   * Performs any required DOM setup.
   * @param element
   */
  @action didInsertNode(element) {
    this.element = element;
    this.registerListeners(element);

    if (this.shouldRegister) {
      this.args.parentComponent.registerChild(this);
    }
  }

  /**
   * Performs DOM updates based on tracked args.
   */
  @action didUpdateNode() {
    // noop
  }

  /**
   * Performs any required DOM teardown.
   * @param element
   */
  @action willDestroyNode(element) {
    this.unregisterListeners(element);
  }

  willDestroy() {
    super.willDestroy(...arguments);

    if (this.shouldRegister) {
      this.args.parentComponent.unregisterChild(this);
    }
  }

  get tag() {
    if (this.args.href) {
      return 'a';
    }

    return 'button';
  }

  get type() {
    if (this.args.type) {
      return this.args.type;
    }

    return 'button';
  }

  get fab() {
    return this.args.fab || this.args.mini;
  }

  @action handleClick(e) {
    if (this.args.onClick) {
      this.args.onClick(e);
    }

    // Prevent bubbling, if specified. If undefined, the event will bubble.
    if (this.args.bubbles === undefined) {
      return true;
    }

    return this.args.bubbles;
  }

  // Proxiable Handlers

  @action handleMouseDown(e) {
    super.handleMouseDown(e);

    let parentComponent = this.parentComponent;
    if (parentComponent) {
      parentComponent.mouseActive = true;
      setTimeout(() => {
        if (parentComponent.isDestroyed) {
          return;
        }
        parentComponent.mouseActive = false;
      }, 100);
    }
  }

  @action handleFocusIn(e) {
    super.handleFocusIn(e);

    let parentComponent = this.parent;
    if (parentComponent && !parentComponent.mouseActive) {
      parentComponent.focused = true;
    }
  }

  @action focusOut(e) {
    super.focusOut(e);

    let parentComponent = this.parent;
    if (parentComponent) {
      parentComponent.focused = false;
    }
  }
}
