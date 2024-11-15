/**
 * @module ember-paper
 */
import Mixin from '@ember/object/mixin';
import { computed } from '@ember/object';
import { invokeAction } from 'ember-paper/utils/invoke-action';

/**
 * @class FocusableMixin
 * @extends Ember.Mixin
 */
export default Mixin.create({
  disabled: false,
  pressed: false,
  active: false,
  focused: false,
  hover: false,

  classNameBindings: ['focused:md-focused'],
  attributeBindings: ['tabindex', 'disabledAttr:disabled'],

  disabledAttr: computed('disabled', function () {
    return this.disabled ? 'disabled' : null;
  }),

  // Allow element to be focusable by supplying a tabindex 0
  tabindex: computed('disabled', function () {
    return this.disabled ? '-1' : '0';
  }),

  toggle: false,

  // Only render the "focused" state if the element gains focus due to
  // keyboard navigation.
  focusOnlyOnKey: false,

  _mouseEnterHandler: undefined,
  _mouseMoveHandler: undefined,
  _mouseLeaveHandler: undefined,

  didInsertElement() {
    this._super(...arguments);

    this._mouseEnterHandler = this.handleMouseEnter.bind(this);
    this._mouseMoveHandler = this.handleMouseMove.bind(this);
    this._mouseLeaveHandler = this.handleMouseLeave.bind(this);

    this.element.addEventListener('mouseenter', this._mouseEnterHandler);
    this.element.addEventListener('mousemove', this._mouseMoveHandler);
    this.element.addEventListener('mouseleave', this._mouseLeaveHandler);
  },

  willDestroyElement() {
    this._super(...arguments);

    this.element.removeEventListener('mouseenter', this._mouseEnterHandler);
    this.element.removeEventListener('mousemove', this._mouseMoveHandler);
    this.element.removeEventListener('mouseleave', this._mouseLeaveHandler);

    this._mouseEnterHandler = undefined;
    this._mouseMoveHandler = undefined;
    this._mouseLeaveHandler = undefined;
  },

  /*
   * Listen to `focusIn` and `focusOut` events instead of `focus` and `blur`.
   * This way we don't need to explicitly bubble the events.
   * They bubble by default.
   */
  focusIn() {
    if ((!this.disabled && !this.focusOnlyOnKey) || !this.pressed) {
      this.set('focused', true);
    }
  },

  focusOut() {
    this.set('focused', false);
  },

  handleMouseEnter(e) {
    this.set('hover', true);
    invokeAction(this, 'onMouseEnter', e);
  },

  touchStart(e) {
    return this.down(e);
  },

  mouseDown(e) {
    this.down(e);
  },

  touchEnd(e) {
    return this.up(e);
  },

  mouseUp(e) {
    return this.up(e);
  },

  touchCancel(e) {
    return this.up(e);
  },

  handleMouseLeave(e) {
    this.set('hover', false);
    this.up(e);
    invokeAction(this, 'onMouseLeave', e);
  },

  up() {
    this.set('pressed', false);

    if (!this.toggle) {
      this.set('active', false);
    }
  },

  down() {
    this.set('pressed', true);
    if (this.toggle) {
      this.toggleProperty('active');
    } else {
      this.set('active', true);
    }
  },
  contextMenu() {},

  /*
   * Move events
   */

  handleMouseMove(e) {
    return this.move(e);
  },

  touchMove(e) {
    return this.move(e);
  },

  pointerMove(e) {
    return this.move(e);
  },

  move() {},
});
