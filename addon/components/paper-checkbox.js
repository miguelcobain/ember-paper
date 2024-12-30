/**
 * @module ember-paper
 */
import Focusable from './-focusable';
import { inject as service } from '@ember/service';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';

/**
 * @class PaperCheckbox
 * @extends Component
 */
export default class PaperCheckbox extends Focusable {
  /**
   * Service containing media query breakpoints and constants
   */
  @service constants;

  /**
   * Reference to the component's DOM element
   * @type {HTMLElement}
   */
  element;
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
  /**
   * provides a globally unique component id for tracking bindings between aria
   * tags and labels.
   * @type {string}
   */
  labelId;

  /* Focusable Overrides */
  focusOnlyOnKey = true;

  constructor(owner, args) {
    super(owner, args);

    this.labelId = `${guidFor(args)}-label`;
    this.shouldRegister = this.args.shouldRegister ?? false;
    this.skipProxy = this.args.skipProxy || false;

    let parentComponent = this.args.parentComponent;
    if (parentComponent && this.shouldRegister) {
      this.parent = parentComponent;
    }

    assert(
      '<PaperCheckbox> requires an `onChange` action or null for no action.',
      this.args.onChange !== undefined
    );
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

  get indeterminate() {
    return this.args.indeterminate || false;
  }

  get notIndeterminate() {
    return !this.indeterminate;
  }

  get value() {
    return this.args.value || false;
  }

  get isChecked() {
    return this.notIndeterminate && this.value;
  }

  get ariaChecked() {
    if (this.indeterminate) {
      return 'mixed';
    }

    return this.isChecked ? 'true' : 'false';
  }

  get bubbles() {
    return this.args.bubbles === undefined || this.args.bubbles;
  }

  @action onClick(e) {
    if (!this.disabled) {
      if (this.args.onChange) {
        this.args.onChange(!this.value);
      }

      // Prevent bubbling, if specified. If undefined, the event will bubble.
      if (!this.bubbles && e) {
        e.stopPropagation();
      }
    }
  }

  @action onKeyPress(e) {
    if (
      e.which === this.constants.KEYCODE.SPACE ||
      e.which === this.constants.KEYCODE.ENTER
    ) {
      e.preventDefault();
      this.onClick();
    }
  }

  processProxy() {
    if (this.args.onChange) {
      this.args.onChange(!this.value);
    }
  }
}
