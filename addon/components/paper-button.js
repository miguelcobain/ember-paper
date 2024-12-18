/**
 * @module ember-paper
 */
import Focusable from './-focusable';
import { action } from '@ember/object';

/**
 * @class PaperButton
 * @extends Focusable
 */
export default class PaperButton extends Focusable {
  /**
   * Reference to the component's DOM element
   * @type {HTMLElement}
   */
  element;
  /**
   * The parent this component is bound to.
   * @type {PaperForm|PaperItem|PaperTabs}
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

    this.shouldRegister = this.args.shouldRegister ?? false;
    this.skipProxy = this.args.skipProxy || false;

    let parentComponent = this.args.parentComponent;
    if (parentComponent && this.shouldRegister) {
      this.parent = parentComponent;
    }
  }

  /**
   * Performs any required DOM setup.
   * @param element
   */
  @action didInsertNode(element) {
    this.element = element;
    this.registerListeners(element);

    let parent = this.parent;
    if (parent && this.shouldRegister) {
      parent.registerChild(this);
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

    let parent = this.parent;
    if (parent && this.shouldRegister) {
      parent.unregisterChild(this);
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

  get bubbles() {
    return this.args.bubbles === undefined || this.args.bubbles;
  }

  @action handleClick(e) {
    if (this.args.onClick) {
      this.args.onClick(e);
    }

    // Prevent bubbling, if specified. If undefined, the event will bubble.
    if (!this.bubbles && e) {
      e.stopPropagation();
    }
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
