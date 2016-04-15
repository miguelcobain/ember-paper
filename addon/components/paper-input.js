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
  isInvalid: Ember.computed('hasAppliedErrors', 'isTouched', 'value', function() {
    return this.get('hasAppliedErrors') || this.validate();
  }),
  renderCharCount: Ember.computed('value', function() {
    var currentLength = this.get('value') ? this.get('value').length : 0;
    return currentLength + '/' + this.get('maxlength');
  }),
  iconFloat: Ember.computed.and('icon', 'label'),

  // Set to display errors from server or other client side validation framework (ember-validations)
  // Expects array of JavaScript objects. Objects must respond to a 'message' property.
  errors: [],
  hasAppliedErrors: Ember.computed.notEmpty('errors'),
  _setAppliedError: Ember.on('init', Ember.observer('hasAppliedErrors', function() {
    var errors = this.get('errors');
    if(this.get('hasAppliedErrors')) {
      this.set('errortext', errors.map( (item) => { return item.message; }).join(', ') );
    }
  })),

  didInsertElement() {
    if (this.get('textarea')) {
      this.setupTextarea();
    }
  },

  setupTextarea() {
    var textarea = this.$().children('textarea').first(),
    textareaNode = textarea[0],
    container = this.get('element'),
    minRows = NaN,
    lineHeight = null;

    if (textareaNode.hasAttribute('rows')) {
      minRows = parseInt(textareaNode.getAttribute('rows'));
    }

    textarea.on('keydown input', () => {
      this.growTextarea(textarea, textareaNode, container, minRows, lineHeight);
    });

    if (isNaN(minRows)) {
      textarea.attr('rows','1');

      textarea.on('scroll', () => {
        this.onScroll(textareaNode);
      });
    }

    Ember.$(window).on('resize', this.growTextarea(textarea, textareaNode, container, minRows, lineHeight));
  },

  growTextarea(textarea, textareaNode, container, minRows, lineHeight) {
    // sets the md-input-container height to avoid jumping around
    container.style.height = container.offsetHeight+'px';

    // temporarily disables element's flex so its height 'runs free'
    textarea.addClass('md-no-flex');

    if(isNaN(minRows)) {
      textareaNode.style.height = "auto";
      textareaNode.scrollTop = 0;
      var height = this.getHeight(textareaNode);
      if (height) {
        textareaNode.style.height = height + 'px';
      }
    } else {
      textareaNode.setAttribute("rows", 1);

      if(!lineHeight) {
        textareaNode.style.minHeight = '0';

        lineHeight = textarea.prop('clientHeight');

        textareaNode.style.minHeight = null;
      }

      var rows = Math.max(minRows, Math.round(textareaNode.scrollHeight / lineHeight));
      textareaNode.setAttribute("rows", rows);
    }

    // reset everything back to normal
    textarea.removeClass('md-no-flex');
    container.style.height = 'auto';
  },

  getHeight(node) {
    var line = node.scrollHeight - node.offsetHeight;
    return node.offsetHeight + (line > 0 ? line : 0);
  },

  onScroll(node) {
    node.scrollTop = 0;
    // for smooth new line adding
    var line = node.scrollHeight - node.offsetHeight;
    var height = node.offsetHeight + line;
    node.style.height = height + 'px';
  },

  willDestroyElement() {
    Ember.$(window).off('resize', this.growTextarea);
  },

  validate() {

    if (!this.get('isTouched')) {
      return false;
    }

    var valueIsInvalid = false;
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
        isError: () => currentValue && currentValue.length > +this.get('maxlength')
      }
    ];

    constraints.some(thisConstraint => {
      if(thisConstraint.isError()) {
        this.setError(thisConstraint);
        valueIsInvalid = true;
        return true;
      }
    });

    if (valueIsInvalid === true) {
      return true;
    }

    if (!Ember.isEmpty(this.get('customValidation'))) {
      var validationObjects = Ember.A();
      var self = this;
      var validationObjectsLength;

      try {
        if (!Ember.isArray(this.get('customValidation'))) {
          validationObjects.addObject(this.get('customValidation'));
        } else {
          validationObjects = this.get('customValidation');
        }

        validationObjectsLength = validationObjects.length;
        for (var i = 0; i < validationObjectsLength; i++) {
          if (typeof validationObjects[i].isError === 'function') {
            if (validationObjects[i].isError.apply(null, [currentValue]) === true) {
              self.setError(validationObjects[i]);
              valueIsInvalid = true;
              break;
            }
          }
        }
      } catch (error) {
        Ember.Logger.error('Exception with custom validation: ', error);
      }

    }

    return valueIsInvalid;
  },

  setError(constraint) {
    this.set('ng-message', constraint.attr || 'custom');
    this.set('errortext', this.get(constraint.attr + '-errortext') || constraint.defaultError || constraint.errorMessage);
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
      this.set('isTouched', true);
    },
    keyDown(value, event) {
      this.sendAction('key-down', value, event);
    }
  }
});
