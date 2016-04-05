import Ember from 'ember';
import BaseFocusable from './base-focusable';
const { computed, inject } = Ember;

export default BaseFocusable.extend({
  tagName: 'md-radio-group',
  tabindex: 0,

  /* BaseFocusable Overrides */
  focusOnlyOnKey: true,

  constants: inject.service(),

  // Lifecycle hooks
  didInitAttrs() {
    this._super(...arguments);
    Ember.assert('{{paper-radio-group}} requires an `onchange` function', this.get('onchange') && typeof this.get('onchange') === 'function');
  },

  childRadios: computed(function() {
    return Ember.A();
  }),

  enabledChildRadios: computed.filterBy('childRadios', 'disabled', false),
  childValues: computed.mapBy('enabledChildRadios', 'value'),

  register(child) {
    this.get('childRadios').pushObject(child);
  },

  unregister(child) {
    this.get('childRadios').removeObject(child);
  },

  keyDown(ev) {

    switch (ev.which) {
      case this.get('constants.KEYCODE.LEFT_ARROW'):
      case this.get('constants.KEYCODE.UP_ARROW'):
        ev.preventDefault();
        this.select(-1);
        break;
      case this.get('constants.KEYCODE.RIGHT_ARROW'):
      case this.get('constants.KEYCODE.DOWN_ARROW'):
        ev.preventDefault();
        this.select(1);
        break;
    }
  },

  select(increment) {
    let groupValue = this.get('groupValue');
    let index = 0;

    if (groupValue) {
      index = this.get('childValues').indexOf(groupValue);
      index += increment;
      let length = this.get('childValues.length');
      index = ((index % length) + length) % length;
    }

    let childRadio = this.get('enabledChildRadios').objectAt(index);
    childRadio.set('focused', true);
    this.get('onchange')(childRadio.get('value'));
  },

  actions: {
    onchange(value) {
      this.get('onchange')(value);
    }
  }
});