/**
 * @module ember-paper
 */
import Focusable from './-focusable';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { isPresent } from '@ember/utils';

/**
 * @class PaperRadioGroup
 * @extends Focusable
 */
export default class PaperRadioGroup extends Focusable {
  @service constants;

  /**
   * Reference to the component's DOM element
   * @type {HTMLElement}
   */
  element;
  /**
   * labelComponent specifies the component to be yielded as a radio group label.
   * @type {string}
   */
  labelComponent;
  /**
   * radioComponent specifies the component to be yielded as a radio.
   * @type {string}
   */
  radioComponent;
  /**
   * provides a globally unique component id for tracking bindings between aria
   * tags and labels.
   * @type {string}
   */
  labelId;
  /**
   * enables toggling the returned value from a child component
   * @type {boolean}
   */
  toggle;

  /* Focusable Overrides */
  focusOnlyOnKey = true;

  /**
   * Array of child components
   * @type {A}
   */
  @tracked children;
  /**
   * tracks whether the label id should be displayed.
   * @type {boolean}
   */
  @tracked hasLabel;

  // Lifecycle hooks
  constructor(owner, args) {
    super(owner, args);

    this.children = A([]);
    this.hasLabel = false;
    this.labelId = `${guidFor(this)}-label`;
    this.toggle = this.args.toggle || false;

    this.labelComponent = this.args.labelComponent || 'paper-radio-group-label';
    this.radioComponent = this.args.radioComponent || 'paper-radio';

    assert(
      '<PaperRadioGroup> requires an `onChange` action or null for no action',
      this.args.onChange !== undefined
    );
  }

  /**
   * Performs any required DOM setup.
   * @param element
   */
  @action didInsertNode(element) {
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

  /**
   * Registers a child form component
   * @param {Component} child - The form component to register
   */
  @action registerChild(child) {
    this.children.pushObject(child);
  }
  /**
   * Removes a registered child form component
   * @param {Component} child - The form component to unregister
   */
  @action unregisterChild(child) {
    this.children.removeObject(child);
  }

  get enabledChildRadios() {
    let filteredChildren = A(this.children.filter((c) => c.disabled === false));
    return filteredChildren;
  }
  get childValues() {
    return this.enabledChildRadios.map((c) => c.value);
  }
  /**
   * provides a callback to notify if a label has been injected into the DOM
   * to enable aria-labelledby being rendered on the radio group.
   */
  @action didInsertLabel() {
    this.hasLabel = true;
  }

  @action onKeyDown(ev) {
    switch (ev.which) {
      case this.constants.KEYCODE.LEFT_ARROW:
      case this.constants.KEYCODE.UP_ARROW:
        ev.preventDefault();
        this.select(-1);
        break;
      case this.constants.KEYCODE.RIGHT_ARROW:
      case this.constants.KEYCODE.DOWN_ARROW:
        ev.preventDefault();
        this.select(1);
        break;
    }
  }

  select(increment) {
    let groupValue = this.args.groupValue;
    let index = 0;

    if (isPresent(groupValue)) {
      index = this.childValues.indexOf(groupValue);
      index += increment;
      let length = this.childValues.length;
      index = ((index % length) + length) % length;
    }

    let childRadio = this.enabledChildRadios.objectAt(index);
    if (childRadio) {
      childRadio.focused = true;
      if (this.args.onChange) {
        this.args.onChange(childRadio.value);
      }
    }
  }

  @action onChange(value) {
    if (this.args.onChange) {
      this.args.onChange(value);
    }
  }
}
