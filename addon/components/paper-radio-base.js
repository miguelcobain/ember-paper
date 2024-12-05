/**
 * @module ember-paper
 */
import Focusable from './-focusable';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';

/**
 * @class PaperRadio
 * @extends Component
 */
export default class PaperRadioBase extends Focusable {
  /**
   * Reference to the component's DOM element
   * @type {HTMLElement}
   */
  element;
  /**
   * provides a globally unique component id for tracking bindings between aria
   * tags and labels.
   * @type {string}
   */
  labelId;
  /**
   * The parent this component is bound to.
   * @type {PaperRadioGroup|PaperForm|PaperItem|PaperTabs}
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

  /* Focusable Overrides */
  focusOnlyOnKey = true;
  toggle = false;

  // Lifecycle hooks
  constructor(owner, args) {
    super(owner, args);

    this.labelId = `${guidFor(this)}-label`;

    this.skipProxy = this.args.skipProxy || false;
    this.toggle = this.args.toggle || false;

    assert(
      '<PaperRadio> requires an `onChange` action or null for no action.',
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
  }

  get value() {
    return this.args.value || false;
  }

  get checked() {
    return this.args.groupValue === this.value;
  }

  get ariaChecked() {
    return this.checked ? 'true' : 'false';
  }

  get bubbles() {
    return this.args.bubbles === undefined || this.args.bubbles;
  }

  @action onClick(e) {
    if (!this.disabled) {
      if (this.args.onChange) {
        if (this.toggle) {
          this.args.onChange(this.checked ? null : this.value);
        } else {
          this.args.onChange(this.value);
        }
      }

      // Prevent bubbling, if specified. If undefined, the event will bubble.
      if (!this.bubbles && e) {
        e.stopPropagation();
      }
    }
  }
}
