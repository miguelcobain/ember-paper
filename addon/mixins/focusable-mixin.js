/**
 * @module ember-paper
 */
import Mixin from '@ember/object/mixin';

import { computed } from '@ember/object';
import EventsMixin from './events-mixin';
import { invokeAction } from 'ember-paper/utils/invoke-action';

/**
 * @class FocusableMixin
 * @extends Ember.Mixin
 * @uses EventsMixin
 */
export default Mixin.create(EventsMixin, {

  disabled: false,
  pressed: false,
  active: false,
  focused: false,
  hover: false,

  classNameBindings: ['focused:md-focused'],
  attributeBindings: ['tabindex', 'disabledAttr:disabled'],

  disabledAttr: computed('disabled', function() {
    return this.disabled ? 'disabled' : null;
  }),

  // Alow element to be focusable by supplying a tabindex 0
  tabindex: computed('disabled', function() {
    return this.disabled ? '-1' : '0';
  }),

  toggle: false,

  // Only render the "focused" state if the element gains focus due to
  // keyboard navigation.
  focusOnlyOnKey: false,

  _mouseEnterHandler: undefined,
  _mouseLeaveHandler: undefined,

  didInsertElement() {
    this._super(...arguments);

    this._mouseEnterHandler = this.handleMouseEnter.bind(this);
    this._mouseLeaveHandler = this.handleMouseLeave.bind(this);

    this.element.addEventListener('mouseenter', this._mouseEnterHandler);
    this.element.addEventListener('mouseleave', this._mouseLeaveHandler);
  },

  willDestroyElement() {
    this._super(...arguments);

    this.element.removeEventListener('mouseenter', this._mouseEnterHandler);
    this.element.removeEventListener('mouseleave', this._mouseLeaveHandler);

    this._mouseEnterHandler = undefined;
    this._mouseLeaveHandler = undefined;
  },

  /*
   * Listen to `focusIn` and `focusOut` events instead of `focus` and `blur`.
   * This way we don't need to explicitly bubble the events.
   * They bubble by default.
   */
  focusIn() {
    if (!this.disabled && !this.focusOnlyOnKey || !this.pressed) {
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

  handleMouseLeave(e) {
    this.set('hover', false);
    this._super(e);
    invokeAction(this, 'onMouseLeave', e);
  },

  down() {
    this.set('pressed', true);
    if (this.toggle) {
      this.toggleProperty('active');
    } else {
      this.set('active', true);
    }
  },

  up() {
    this.set('pressed', false);

    if (!this.toggle) {
      this.set('active', false);
    }
  }
});
