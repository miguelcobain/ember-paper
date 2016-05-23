import Ember from 'ember';
import BaseFocusable from './base-focusable';
const { A, computed, inject, assert } = Ember;

export default BaseFocusable.extend({
  tagName: 'md-radio-group',
  tabindex: 0,

  /* BaseFocusable Overrides */
  focusOnlyOnKey: true,

  constants: inject.service(),

  // Lifecycle hooks
  didInitAttrs() {
    this._super(...arguments);
    assert('{{paper-radio-group}} requires an `onChange` action or null for no action', this.get('onChange') !== undefined);
  },

  childRadios: computed(function() {
    return A();
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
    this.sendAction('onChange', childRadio.get('value'));
  },

  actions: {
    onChange(value) {
      this.sendAction('onChange', value);
    }
  }
});
