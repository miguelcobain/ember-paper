/**
 * @module ember-paper
 */
import Ember from 'ember';
import EventsMixin from './events-mixin';

const { Mixin, computed } = Ember;

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

  mouseEnter(e) {
    this.set('hover', true);
    this.sendAction('onMouseEnter', e);
  },

  mouseLeave(e) {
    this.set('hover', false);
    this._super(e);
    this.sendAction('onMouseLeave', e);
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
