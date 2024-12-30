/**
 * @module ember-paper
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { A } from '@ember/array';
import { action } from '@ember/object';

/**
 * @class PaperItem
 * @extends Ember.Component
 * @uses ParentMixin
 */
export default class PaperItem extends Component {
  /**
   * Reference to the component's DOM element
   * @type {HTMLElement}
   */
  element;

  /**
   * Array of child components.
   * @type {A}
   */
  @tracked children;
  /**
   * marks whether the component is focused. Sets class `md-focused` if true.
   * @type {boolean}
   */
  @tracked focused = false;

  constructor(owner, args) {
    super(owner, args);

    this.children = A([]);

    if (this.args.role) {
      this.role = this.args.role;
    }
  }

  /**
   * Performs any required DOM setup.
   * @param {HTMLElement} element
   */
  @action didInsertNode(element) {
    element.addEventListener('mouseenter', this.handleMouseEnter);
    element.addEventListener('mouseleave', this.handleMouseLeave);

    this.element = element;
  }

  @action didUpdateNode() {
    // noop
  }

  /**
   * Performs any required DOM teardown.
   * @param {HTMLElement} element
   */
  @action willDestroyNode(element) {
    element.removeEventListener('mouseenter', this.handleMouseEnter);
    element.removeEventListener('mouseleave', this.handleMouseLeave);
  }

  /**
   * Registers a child component
   * @param {Component} child - The component to register
   */
  @action registerChild(child) {
    this.children.pushObject(child);
  }

  /**
   * Unregisters a child component
   * @param {Component} child - The component to unregister
   */
  @action unregisterChild(child) {
    this.children.removeObject(child);
  }

  // Ripple Overrides
  /**
   * disable ripple when we have a primary action or when we don't have a proxied component
   * @returns {boolean}
   */
  get noink() {
    return this.hasPrimaryAction || !this.hasProxiedComponent;
  }

  /**
   * Returns registered child proxy components.
   * @returns {Component[]}
   */
  get proxiedComponents() {
    return this.children.filter((c) => {
      return !c.skipProxy;
    });
  }

  /**
   * @returns {boolean}
   */
  get hasProxiedComponent() {
    return this.proxiedComponents ? this.proxiedComponents.length > 0 : false;
  }

  /**
   * @returns {boolean}
   */
  get shouldBeClickable() {
    return this.hasProxiedComponent || !!this.args.onClick;
  }

  /**
   * @returns {boolean}
   */
  get hasPrimaryAction() {
    return !!this.args.onClick || !!this.args.href;
  }

  /**
   * dead code?
   * @returns {boolean}
   */
  get noProxy() {
    return !this.hasPrimaryAction && !this.hasProxiedComponent;
  }

  /**
   * Returns a secondary component.
   * @returns {Component}
   */
  get secondaryItem() {
    let proxiedComponents = this.proxiedComponents;
    return proxiedComponents.objectAt(0);
  }

  @action localOnClick() {
    this.proxiedComponents.forEach((component) => {
      if (
        !!component.processProxy &&
        !component.disabled &&
        !!(component.bubbles || !this.hasPrimaryAction)
      ) {
        component.processProxy();
      }
    });
  }

  @action handleMouseEnter(e) {
    if (this.args.onMouseEnter) {
      this.args.onMouseEnter(e);
    }
  }

  @action handleMouseLeave(e) {
    if (this.args.onMouseLeave) {
      this.args.onMouseLeave(e);
    }
  }
}
