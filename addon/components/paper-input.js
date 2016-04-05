import Ember from 'ember';
import BaseFocusable from './base-focusable';
import ColorMixin from 'ember-paper/mixins/color-mixin';
import FlexMixin from 'ember-paper/mixins/flex-mixin';

const { $, computed, isPresent, isArray, Logger, A, getWithDefault, run, assert } = Ember;

export default BaseFocusable.extend(ColorMixin, FlexMixin, {
  tagName: 'md-input-container',
  classNames: ['md-default-theme'],
  classNameBindings: [
    'hasValue:md-input-has-value',
    'isInvalid:md-input-invalid',
    'eitherIcon:md-has-icon',
    'iconRight:md-icon-right',
    'focused:md-input-focused',
    'block:md-block'
  ],
  type: 'text',
  autofocus: false,
  tabindex: -1,
  hideAllMessages: false,
  isTouched: false,

  hasValue: computed.notEmpty('value'),

  inputElementId: computed('elementId', function() {
    return `input-${this.get('elementId')}`;
  }),

  isInvalid: computed('isTouched', 'value', function() {
    return this.get('isTouched') && isPresent(this.get('errorMessages'));
  }),

  renderCharCount: computed('value', function() {
    let currentLength = this.get('value') ? this.get('value').length : 0;
    return `${currentLength}/${this.get('maxlength')}`;
  }),

  eitherIcon: computed.or('icon', 'iconRight'),

  /**
   * Return the built-in constraints.
   *
   * May be overridden to provide additional built-in constraints. Be sure to
   * call this._super() to retrieve the standard constraints.
   *
   * @public
   */
  constraints() {
    let currentValue = this.get('value');
    return [
      {
        attr: 'required',
        defaultError: 'This is required.',
        // required can be a boolean or 'style' for just required asterisk styling.
        isError: () => this.get('required') === true && !this.get('hasValue')
      },
      {
        attr: 'min',
        defaultError: `Must be at least ${this.get('min')}.`,
        isError: () => currentValue && +currentValue < +this.get('min')
      },
      {
        attr: 'max',
        defaultError: `Must be less than ${this.get('max')}.`,
        isError: () => currentValue && +currentValue > +this.get('max')
      },
      {
        attr: 'maxlength',
        defaultError: `Must not exceed ${this.get('maxlength')} characters.`,
        isError: () => currentValue && currentValue.length > +this.get('maxlength')
      }
    ];
  },

  /**
   * Computed property that validate the input and return an array of error
   * objects, each with an ng-message code and an error message.
   *
   * @public
   */
  errorMessages: computed('value', function() {
    let constraints = A();
    let customConstraints = this.get('customValidation');
    constraints.pushObjects(this.constraints());
    if (isPresent(customConstraints)) {
      if (isArray(customConstraints)) {
        constraints.pushObjects(customConstraints);
      } else {
        constraints.pushObject(customConstraints);
      }
    }

    let currentValueParameter = [ this.get('value') ];
    let messages = A();
    try {
      constraints.forEach((constraint) => {
        if (constraint.isError(currentValueParameter)) {
          messages.pushObject({
            key: constraint.attr || 'custom',
            message: this.get(`${constraint.attr}-errortext`) || constraint.defaultError || constraint.errorMessage
          });
        }
      });
    } catch (error) {
      Logger.error('Exception with custom validation: ', error);
    }

    let errors = this.get('errors');
    if (errors && isArray(errors)) {
      messages.pushObjects(errors.map((i) => ({
        key: getWithDefault(i, 'attr', 'custom'),
        message: getWithDefault(i, 'message', i)
      })));
    }

    return messages;
  }),

  // Lifecycle hooks
  didReceiveAttrs() {
    this._super(...arguments);
    assert('{{paper-input}} requires an `onChange` function', this.get('onChange') && typeof this.get('onChange') === 'function');
  },

  didInsertElement() {
    this._super(...arguments);
    if (this.get('textarea')) {
      $(window).on(`resize.${this.elementId}`, run.bind(this, this.growTextarea));
    }
  },

  didRender() {
    if (this.get('textarea')) {
      this.growTextarea();
    }
  },

  willDestroyElement() {
    if (this.get('textarea')) {
      $(window).off(`resize.${this.elementId}`);
    }
  },

  growTextarea() {
    let inputElement = this.$('input, textarea');
    inputElement.addClass('md-no-flex').attr('rows', 1);

    let minRows = this.get('passThru.rows');

    if (minRows) {
      if (!this.lineHeight) {
        inputElement.get(0).style.minHeight = 0;
        this.lineHeight = inputElement.get(0).clientHeight;
        inputElement.get(0).style.minHeight = null;
      }

      let newRows = Math.round(Math.round(this.getHeight(inputElement) / this.lineHeight));
      let rowsToSet = Math.min(newRows, minRows);

      inputElement
        .css('height', `${this.lineHeight * rowsToSet}px`)
        .attr('rows', rowsToSet)
        .toggleClass('md-textarea-scrollable', newRows >= minRows);
    } else {
      inputElement.css('height', 'auto');
      inputElement.get(0).scrollTop = 0;
      let height = this.getHeight(inputElement);
      if (height) {
        inputElement.css('height', `${height}px`);
      }
    }

    inputElement.removeClass('md-no-flex');
  },

  getHeight(inputElement) {
    let { offsetHeight } = inputElement.get(0);
    let line = inputElement.get(0).scrollHeight - offsetHeight;
    return offsetHeight + (line > 0 ? line : 0);
  },

  actions: {
    handleInput(e) {
      this.sendAction('onChange', e.target.value);
      this.growTextarea();
    },

    handleBlur(e) {
      this.sendAction('onBlur', e);
      this.set('isTouched', true);
    }
  }
});
