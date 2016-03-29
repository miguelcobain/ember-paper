import Ember from 'ember';
import BaseFocusable from './base-focusable';
import ColorMixin from 'ember-paper/mixins/color-mixin';
import FlexMixin from 'ember-paper/mixins/flex-mixin';

const { $, computed, isPresent, isArray, Logger, A, getWithDefault } = Ember;

export default BaseFocusable.extend(ColorMixin, FlexMixin, {
  tagName: 'md-input-container',
  classNames: ['md-default-theme'],
  classNameBindings: [
    'hasValue:md-input-has-value',
    'isInvalid:md-input-invalid',
    'eitherIcon:md-has-icon',
    'iconFloat:md-icon-float',
    'iconRight:md-icon-right',
    'focused:md-input-focused'
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
  iconFloat: computed.and('eitherIcon', 'label'),

  didInsertElement() {
    if (this.get('textarea')) {
      let textarea = this.$().children('textarea').first();
      let textareaNode = textarea.get(0);
      let container = this.get('element');
      let minRows = NaN;
      let lineHeight = null;

      if (textareaNode.hasAttribute('rows')) {
        minRows = parseInt(textareaNode.getAttribute('rows'));
      }

      textarea.on(`keydown.${this.elementId} input.${this.elementId}`, () => {
        this.growTextarea(textarea, textareaNode, container, minRows, lineHeight);
      });

      if (isNaN(minRows)) {
        textarea.attr('rows', '1');

        textarea.on(`scroll.${this.elementId}`, () => {
          this.onScroll(textareaNode);
        });
      }

      $(window).on(`resize.${this.elementId}`, this.growTextarea(textarea, textareaNode, container, minRows, lineHeight));
    }
  },

  willDestroyElement() {
    if (this.get('textarea')) {
      $(window).off(`resize.${this.elementId}`, this.growTextarea);
      this.$().children('textarea').first().off(`keydown.${this.elementId} input.${this.elementId} scroll.${this.elementId}`);
    }
  },

  growTextarea(textarea, textareaNode, container, minRows, lineHeight) {
    // sets the md-input-container height to avoid jumping around
    container.style.height = `${container.offsetHeight}px`;

    // temporarily disables element's flex so its height 'runs free'
    textarea.addClass('md-no-flex');

    if (isNaN(minRows)) {
      textareaNode.style.height = 'auto';
      textareaNode.scrollTop = 0;
      let height = this.getHeight(textareaNode);
      if (height) {
        textareaNode.style.height = `${height}px`;
      }
    } else {
      textareaNode.setAttribute('rows', 1);

      if (!lineHeight) {
        textareaNode.style.minHeight = '0';

        lineHeight = textarea.prop('clientHeight');

        textareaNode.style.minHeight = null;
      }

      let rows = Math.max(minRows, Math.round(textareaNode.scrollHeight / lineHeight));
      textareaNode.setAttribute('rows', rows);
    }

    // reset everything back to normal
    textarea.removeClass('md-no-flex');
    container.style.height = 'auto';
  },

  getHeight(node) {
    let line = node.scrollHeight - node.offsetHeight;
    return node.offsetHeight + (line > 0 ? line : 0);
  },

  onScroll(node) {
    node.scrollTop = 0;
    // for smooth new line adding
    let line = node.scrollHeight - node.offsetHeight;
    let height = node.offsetHeight + line;
    node.style.height = `${height}px`;
  },

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

  actions: {
    focusOut(ev) {
      if (this.get('onFocusOut')) {
        this.get('onFocusOut')(ev);
      }
      this.set('isTouched', true);
      return true;
    }
  }
});
