import Ember from 'ember';
import BaseFocusable from './base-focusable';

export default BaseFocusable.extend({
  tagName: 'md-input-container',
  classNames: ['md-default-theme'],
  classNameBindings: ['hasValue:md-input-has-value', 'focus:md-input-focused', 'isInvalid:md-input-invalid'],
  type: 'text',
  tabindex:-1,
  hasValue: Ember.computed.notEmpty('value'),
  inputElementId: Ember.computed('elementId', function() {
    return 'input-' + this.get('elementId');
  }),
  isInvalid: Ember.computed('value', function() {
    return this.validate();
  }),
  renderCharCount: Ember.computed('value', function() {
    var currentLength = this.get('value') ? this.get('value').length : 0;
    return currentLength + "/" + this.get('md-maxlength');
  }),

  validate: function() {
    var that = this;
    var returnValue = false;
    var currentValue = this.get('value');
    var constraints = [
      {
        attr: 'required',
        defaultError: 'This is required.',
        isError: function() {return that.get('required') && (!that.get('hasValue'));}
      },
      {
        attr: 'min',
        defaultError: 'Must be at least '+this.get('min')+'.',
        isError: function() {return +currentValue < +(that.get('min'));}
      },
      {
        attr: 'max',
        defaultError: 'Must be less than '+this.get('max')+'.',
        isError: function() {return +currentValue > +(that.get('max'));}
      },
      {
        attr: 'md-maxlength',
        defaultError: 'Must not exceed '+this.get('md-maxlength')+' characters.',
        isError: function() {return currentValue && currentValue.length > +(that.get('md-maxlength'));}
      }
    ];

    constraints.some(function(thisConstraint) {
      if(thisConstraint.isError()) {
        that.setError(thisConstraint);
        returnValue = true;
        return true;
      }
    });

    return returnValue;
  },

  setError: function(constraint) {
    this.set('ng-message', constraint.attr);
    this.set('errortext', this.get(constraint.attr + '-errortext') || constraint.defaultError);
  },

  actions: {
    focusIn() {
      this.set('focus',true);
    },
    focusOut() {
      this.set('focus',false);
    }
  }
});
