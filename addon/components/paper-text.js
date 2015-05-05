import Ember from 'ember';
import BaseFocusableMixin from '../mixins/base-focusable';

export default Ember.Component.extend(BaseFocusableMixin, {
  tagName: 'md-input-group',
  classNames: ['md-default-theme'],
  classNameBindings: ['hasValue:md-input-has-value', 'focus:md-input-focused'],
  type: 'text',
  hasValue: Ember.computed.notEmpty('value'),
  inputElementId: Ember.computed('elementId', function() {
    return 'input-' + this.get('elementId');
  }),
  actions: {
    focusIn: function() {
      this.set('focus',true);
    },
    focusOut: function() {
      this.set('focus',false);
    }
  }
});
