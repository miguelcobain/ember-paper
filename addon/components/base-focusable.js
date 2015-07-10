import Ember from 'ember';
import EventsMixin from '../mixins/events-mixin';
import ProxiableMixin from 'ember-paper/mixins/proxiable-mixin';
import HasBlockMixin from '../mixins/hasblock-mixin';

export default Ember.Component.extend(EventsMixin, HasBlockMixin, {
  disabled: false,
  pressed: false,
  active: false,
  focus: false,
  hover: false,
  attributeBindings: ['tabindex', 'disabledAttr:disabled'],

  /*
   * Not binding boolean values in Ember 1.8.1?
   * https://github.com/emberjs/ember.js/issues/9595
   */
  disabledAttr: Ember.computed('disabled', function() {
    return this.get('disabled') ? 'disabled' : null;
  }),

  //Alow element to be focusable by supplying a tabindex 0
  tabindex: Ember.computed('disabled', function() {
    return this.get('disabled') ? '-1' : '0';
  }),

  toggle: false,

  /*
   * Listen to `focusIn` and `focusOut` events instead of `focus` and `blur`.
   * This way we don't need to explicitly bubble the events.
   */
  focusIn() {
    if (!this.get('pressed')) {
      // Only render the "focused" state if the element gains focus due to
      // keyboard navigation.
      this.set('focus', true);
    }
  },
  focusOut() {
    this.set('focus', false);
  },
  mouseEnter() {
    this.set('hover', true);
  },
  mouseLeave(e) {
    this.set('hover', false);
    this._super(e);
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
