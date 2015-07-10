import Ember from 'ember';
import BaseFocusable from './base-focusable';
import RippleMixin from '../mixins/ripple-mixin';

export default BaseFocusable.extend(RippleMixin, {
  tagName: 'md-radio-button',
  classNames: ['paper-radio', 'md-default-theme'],
  classNameBindings: ['checked:md-checked'],
  toggle: false,
  selected: null,

  /* RippleMixin overrides */
  center: true,
  dimBackground: false,
  fitRipple: true,
  rippleContainerSelector: '.md-container',

  checked: Ember.computed('value', 'selected', function() {
    return this.get('value') === this.get('selected');
  }),

  checkedDidChange: Ember.observer('checked', function() {
    if (this.get('checked')) {
      this.set('selected', this.get('value'));
      this.sendAction('changed', this.get('value'));
    }
  }),

  click() {
    if (this.get('disabled')) {
      return;
    }

    if (this.get('toggle')) {
      this.set('selected', this.get('checked') ? null : this.get('value'));
    } else {
      this.set('selected', this.get('value'));
    }
  }
});
