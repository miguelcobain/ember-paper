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
    this.shouldRegister = this.args.shouldRegister || false;
    if (this.shouldRegister) {
      assert(
        'A parent component should be supplied to <PaperRadio> when shouldRegister=true',
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
    super.didInsertNode(element);

    if (this.shouldRegister) {
      this.parent.registerChild(this);
    }
  }

  willDestroy() {
    super.willDestroy(...arguments);

    if (this.shouldRegister) {
      this.parent.unregisterChild(this);
    }
  }
}
