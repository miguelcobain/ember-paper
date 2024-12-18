/* global Hammer */
/**
 * @module ember-paper
 */
import Focusable from './-focusable';
import { tracked } from '@glimmer/tracking';
import { assert } from '@ember/debug';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import { htmlSafe } from '@ember/template';

/**
 * @class PaperSwitch
 * @extends Component
 */
export default class PaperSwitch extends Focusable {
  @service constants;

  /**
   * Reference to the component's DOM element
   * @type {HTMLElement}
   */
  element;
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
  toggle = true;

  /**
   * specifies the positive amount the switch has been dragged.
   * @type {number|null}
   */
  @tracked dragAmount = null;
  /**
   * specifies whether the switch is currently being dragged.
   * @type {boolean}
   */
  @tracked dragging = false;
  /**
   * specifies the width of the switch to calculate drag deltas.
   * @type {number}
   */
  @tracked switchWidth = 0;

  // Lifecycle hooks
  constructor(owner, args) {
    super(owner, args);

    this.shouldRegister = this.args.shouldRegister ?? false;
    this.skipProxy = this.args.skipProxy || false;
    this.toggle = this.args.toggle || false;

    let parentComponent = this.args.parentComponent;
    if (parentComponent && this.shouldRegister) {
      this.parent = parentComponent;
    }

    assert(
      '<PaperSwitch> requires an `onChange` action or null for no action.',
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

    // Only setup if the switch is not disabled
    if (!this.disabled) {
      this._setupSwitch();
    }
  }

  @action didUpdateNode() {
    if (!this.disabled && !this._switchContainerHammer) {
      this._setupSwitch();
    } else if (!this.disabled && this._switchContainerHammer) {
      this._switchContainerHammer.set({ enable: true });
    } else if (this.disabled && this._switchContainerHammer) {
      this._switchContainerHammer.set({ enable: false });
    }
  }

  /**
   * Performs any required DOM teardown.
   * @param element
   */
  @action willDestroyNode(element) {
    this.unregisterListeners(element);
    this._teardownSwitch();
  }

  willDestroy() {
    super.willDestroy(...arguments);

    let parent = this.parent;
    if (parent && this.shouldRegister) {
      parent.unregisterChild(this);
    }
  }

  /**
   * specifies the current switch value.
   * @type {boolean}
   */
  get value() {
    return this.args.value;
  }

  /**
   * Calculates and returns a css animation transform for the switch's thumb.
   * @returns {string}
   */
  get thumbContainerStyle() {
    if (!this.dragging) {
      return htmlSafe('');
    }

    let translate = Math.max(0, Math.min(100, this.dragAmount * 100));
    let transformProp = `translate3d(${translate}%, 0, 0)`;
    return htmlSafe(
      `transform: ${transformProp};-webkit-transform: ${transformProp}`
    );
  }

  _setupSwitch() {
    this.switchWidth = this.element.querySelector(
      '.md-thumb-container'
    ).offsetWidth;

    let switchContainer = this.element.querySelector('.md-container');
    let switchHammer = new Hammer(switchContainer);
    this._switchContainerHammer = switchHammer;

    // Enable dragging the switch container
    switchHammer.get('pan').set({ threshold: 1 });
    switchHammer
      .on('panstart', this._dragStart.bind(this))
      .on('panmove', this._drag.bind(this))
      .on('panend', this._dragEnd.bind(this));

    // Enable tapping gesture on the switch
    this._switchHammer = new Hammer(this.element);
    this._switchHammer.on('tap', this._dragEnd.bind(this));

    this._onClickHandleNativeClick = this._handleNativeClick.bind(this);

    this.element
      .querySelector('.md-container')
      .addEventListener('click', this._onClickHandleNativeClick);
  }

  _handleNativeClick(ev) {
    let bubbles = this.bubbles;

    if (!bubbles) {
      ev.stopPropagation();
    }

    return bubbles;
  }

  _teardownSwitch() {
    if (this._switchContainerHammer) {
      this._switchContainerHammer.destroy();
      this._switchHammer.destroy();
    }
    this.element
      .querySelector('.md-container')
      .removeEventListener('click', this._onClickHandleNativeClick);
    this._onClickHandleNativeClick = null;
  }

  _dragStart() {
    this.dragAmount = +this.value;
    this.dragging = true;
  }

  _drag(event) {
    if (!this.disabled) {
      // Set the amount the switch has been dragged
      this.dragAmount = +this.value + event.deltaX / this.switchWidth;
    }
  }

  _dragEnd() {
    if (!this.disabled) {
      let value = this.value;
      let dragAmount = this.dragAmount;

      if (
        !this.dragging ||
        (value && dragAmount < 0.5) ||
        (!value && dragAmount > 0.5)
      ) {
        if (this.args.onChange) {
          this.args.onChange(!value);
        }
      }
      this.dragging = false;
      this.dragAmount = null;
    }
  }

  @action handleFocusIn() {
    // Focusing in w/o being pressed should use the default behavior
    if (!this.pressed) {
      super.handleFocusIn(...arguments);
    }
  }

  @action handleKeyPress(ev) {
    if (
      ev.which === this.constants.KEYCODE.SPACE ||
      ev.which === this.constants.KEYCODE.ENTER
    ) {
      ev.preventDefault();
      this._dragEnd();
    }
  }

  processProxy() {
    if (this.args.onChange) {
      this.args.onChange(!this.value);
    }
  }
}
