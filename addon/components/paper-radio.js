/**
 * @module ember-paper
 */
import PaperRadioBase from './paper-radio-base';
import { action } from '@ember/object';
import { assert } from '@ember/debug';

/**
 * @class PaperRadio
 * @extends PaperRadioBase
 */
export default class PaperRadio extends PaperRadioBase {
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

  constructor(owner, args) {
    super(owner, args);

    this.skipProxy = this.args.skipProxy || false;
    this.shouldRegister = this.args.shouldRegister ?? true;

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
    super.didInsertNode(element);

    let parent = this.parent;
    if (parent && this.shouldRegister) {
      parent.registerChild(this);
    }
  }

  willDestroy() {
    super.willDestroy(...arguments);

    let parent = this.parent;
    if (parent && this.shouldRegister) {
      parent.unregisterChild(this);
    }
  }
}
