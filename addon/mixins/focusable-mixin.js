/**
 * @module ember-paper
 */
import Mixin from '@ember/object/mixin';

import { computed } from '@ember/object';
import EventsMixin from './events-mixin';
import { invokeAction } from 'ember-invoke-action';

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
    return this.get('disabled') ? 'disabled' : null;
  }),

  // Alow element to be focusable by supplying a tabindex 0
  tabindex: computed('disabled', function() {
    return this.get('disabled') ? '-1' : '0';
  }),

  toggle: false,

  // Only render the "focused" state if the element gains focus due to
  // keyboard navigation.
  focusOnlyOnKey: false,

  didInsertElement() {
    this._super(...arguments);
    this.element.addEventListener('mouseenter', this.handleMouseEnter.bind(this));
    this.element.addEventListener('mouseleave', this.handleMouseLeave.bind(this));
  },

  willDestroyElement() {
    this._super(...arguments);
    this.element.removeEventListener('mouseenter', this.handleMouseEnter.bind(this));
    this.element.removeEventListener('mouseleave', this.handleMouseLeave.bind(this));
  },

  /*
   * Listen to `focusIn` and `focusOut` events instead of `focus` and `blur`.
   * This way we don't need to explicitly bubble the events.
   * They bubble by default.
   */
  focusIn() {
    if (!this.get('disabled') && !this.get('focusOnlyOnKey') || !this.get('pressed')) {
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
