import Ember from 'ember';
import BaseFocusable from './base-focusable';
import ColorMixin from 'ember-paper/mixins/color-mixin';
import FlexMixin from 'ember-paper/mixins/flex-mixin';

export default BaseFocusable.extend(ColorMixin, FlexMixin, {
  tagName: 'md-input-container',
  classNames: ['md-default-theme'],
  classNameBindings: ['hasValue:md-input-has-value', 'focus:md-input-focused', 'isInvalid:md-input-invalid', 'iconFloat:md-icon-float'],
  type: 'text',
  autofocus: false,
  tabindex: -1,
  hideAllMessages: false,
  hasValue: Ember.computed.notEmpty('value'),
  inputElementId: Ember.computed('elementId', function() {
    return 'input-' + this.get('elementId');
  }),
  isInvalid: Ember.computed('value', function() {
    return this.validate();
  }),
  renderCharCount: Ember.computed('value', function() {
    var currentLength = this.get('value') ? this.get('value').length : 0;
    return currentLength + '/' + this.get('maxlength');
  }),
  iconFloat: Ember.computed.and('icon', 'label'),

  validate() {
    var returnValue = false;
    var currentValue = this.get('value');
    var constraints = [
      {
        attr: 'required',
        defaultError: 'This is required.',
        isError: () => this.get('required') && !this.get('hasValue')
      },
      {
        attr: 'min',
        defaultError: 'Must be at least ' + this.get('min') + '.',
        isError: () => +currentValue < +this.get('min')
      },
      {
        attr: 'max',
        defaultError: 'Must be less than ' + this.get('max') + '.',
        isError: () => +currentValue > +this.get('max')
      },
      {
        attr: 'maxlength',
        defaultError: 'Must not exceed ' + this.get('maxlength') + ' characters.',
        isError: () => currentValue && currentValue.length > + this.get('maxlength')
      }
    ];

    constraints.some(thisConstraint => {
      if(thisConstraint.isError()) {
        this.setError(thisConstraint);
        returnValue = true;
        return true;
      }
    });

    return returnValue;
  },

  setError(constraint) {
    this.set('ng-message', constraint.attr);
    this.set('errortext', this.get(constraint.attr + '-errortext') || constraint.defaultError);
  },

  actions: {
    focusIn(value) {
      // We resend action so other components can take use of the actions also ( if they want ).
      // Actions must be sent before focusing.
      this.sendAction('focus-in', value);
      this.set('focus',true);
    },
    focusOut(value) {
      this.sendAction('focus-out', value);
      this.set('focus',false);
    },
    keyDown(value, event) {
      this.sendAction('key-down', value, event);
    }
  }
});
