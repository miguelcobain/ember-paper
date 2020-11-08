/**
 * @module ember-paper
 */
import { or, bool, and, not } from '@ember/object/computed';

import Component from '@ember/component';
import { tagName, layout } from '@ember-decorators/component';
import { computed, set, action } from '@ember/object';
import { tracked } from '@glimmer/tracking'
import { isEmpty } from '@ember/utils';
import { run } from '@ember/runloop';
import { assert } from '@ember/debug';
import template from './template';
import FocusableMixin from 'ember-paper/mixins/focusable-mixin';
import ColorMixin from 'ember-paper/mixins/color-mixin';
import { buildComputedValidationMessages, notifyValidityChange } from 'ember-paper/utils/validation';
import requiredValidator from 'ember-paper/validators/required';
import minValidator from 'ember-paper/validators/min';
import maxValidator from 'ember-paper/validators/max';
import minlengthValidator from 'ember-paper/validators/minlength';
import maxlengthValidator from 'ember-paper/validators/maxlength';
import { invokeAction } from 'ember-invoke-action';

const validations = [
  requiredValidator,
  minValidator,
  maxValidator,
  minlengthValidator,
  maxlengthValidator
];

/**
 * @class PaperInput
 * @extends Ember.Component
 * @uses FocusableMixin
 * @uses ColorMixin
 */
@tagName('md-input-container')
@layout(template)
export default class PaperInput extends Component.extend(FocusableMixin, ColorMixin) {
  classNames = ['md-default-theme'];

  classNameBindings = [
    'hasValue:md-input-has-value',
    'isInvalidAndTouched:md-input-invalid',
    'hasLeftIcon:md-icon-left',
    'hasRightIcon:md-icon-right',
    'focused:md-input-focused',
    'block:md-block',
    'placeholder:md-input-has-placeholder'
  ];

  type = 'text';
  autofocus = false;
  tabindex = null;
  hideAllMessages = false;

  @tracked
  isTouched = false;

  set formHasBeenValidated (value) {
    this.set('isTouched', value)
  }

  iconComponent = 'paper-icon';

  validations = validations;

  @tracked
  errorMessages

  @tracked
  customValidations = []

  @tracked
  errors = []

  @computed(
    'value',
    'errors.[]',
    'customValidations.[]',
    'errorMessages',
    requiredValidator.param,
    minValidator.param,
    maxValidator.param,
    minlengthValidator.param,
    maxlengthValidator.param,
  )
  get validationErrorMessages () {
    return buildComputedValidationMessages.call(this, 'value')
  }

  @bool('validationErrorMessages.length')
  hasErrorMessages

  @not('isInvalid')
  isValid

  // override validation mixin `isInvalid` to account for the native input validity
  @or('hasErrorMessages', 'isNativeInvalid')
  isInvalid

  @computed('value', 'isNativeInvalid')
  get hasValue () {
    let value = this.get('value');
    let isNativeInvalid = this.get('isNativeInvalid');

    return !isEmpty(value) || isNativeInvalid;
  }

  @computed('label', 'focused')
  get shouldAddPlaceholder () {
    // if has label, only add placeholder when focused
    return isEmpty(this.get('label')) || this.get('focused');
  }

  @computed('elementId')
  get inputElementId () {
    // elementId can be set from outside and it will override the computed value.
    // Please check the deprecations for further details
    // https://deprecations.emberjs.com/v3.x/#toc_computed-property-override
    return `input-${this.get('elementId')}`;
  }

  set inputElementId (value) {
    // To make sure the context updates properly, We are manually set value using @ember/object#set as recommended.
    return set(this, "elementId", value);
  }

  @computed('value')
  get renderCharCount () {
    let currentLength = this.get('value') ? this.get('value').length : 0;
    return `${currentLength}/${this.get('maxlength')}`;
  }

  @bool('icon')
  hasLeftIcon

  @bool('iconRight')
  hasRightIcon

  @and('isInvalid', 'isTouched')
  isInvalidAndTouched

  // Lifecycle hooks
  init () {
    super.init(...arguments);

    invokeAction(this, 'onRegister', this.get('elementId'));
  }

  didReceiveAttrs () {
    super.didReceiveAttrs(...arguments);

    assert('{{paper-input}} requires an `onChange` action or null for no action.', this.get('onChange') !== undefined);

    let { value, errors } = this.getProperties('value', 'errors');
    let { _prevValue, _prevErrors } = this.getProperties('_prevValue', '_prevErrors');

    if (value !== _prevValue || errors !== _prevErrors) {
      this.notifyValidityChange();
    }

    this._prevValue = value;
    this._prevErrors = errors;
  }

  didInsertElement () {
    super.didInsertElement(...arguments);

    if (this.get('textarea')) {
      this._growTextareaOnResize = run.bind(this, this.growTextarea);
      window.addEventListener('resize', this._growTextareaOnResize);
    }
  }

  didRender () {
    super.didRender(...arguments);
    // setValue below ensures that the input value is the same as this.value
    this.setValue(this.get('value'));
    this.growTextarea();
  }

  willDestroyElement () {
    super.willDestroyElement(...arguments);

    if (this.get('textarea')) {
      window.removeEventListener('resize', this._growTextareaOnResize);
      this._growTextareaOnResize = null;
    }
  }

  destroy () {
    const eltId = this.get('elementId')

    super.destroy(...arguments);

    invokeAction(this, 'onUnregister', eltId);
  }

  growTextarea () {
    if (this.get('textarea')) {
      const inputElement = this.element.querySelector('input, textarea');
      inputElement.classList.add('md-no-flex');
      inputElement.setAttribute('rows', 1);

      const minRows = this.get('passThru.rows');
      let height = this.getHeight(inputElement);
      if (minRows) {
        if (!this.lineHeight) {
          inputElement.style.minHeight = 0;
          this.lineHeight = inputElement.clientHeight;
          inputElement.style.minHeight = null;
        }

        if (this.lineHeight) {
          height = Math.max(height, this.lineHeight * minRows);
        }

        let proposedHeight = Math.round(height / this.lineHeight);
        let maxRows = this.get('passThru.maxRows') || Number.MAX_VALUE;
        let rowsToSet = Math.min(proposedHeight, maxRows);

        inputElement.style.height = `${this.lineHeight * rowsToSet}px`;
        inputElement.setAttribute('rows', rowsToSet);

        if (proposedHeight >= maxRows) {
          inputElement.classList.add('md-textarea-scrollable');
        } else {
          inputElement.classList.remove('md-textarea-scrollable');
        }
      } else {
        inputElement.style.height = 'auto';
        inputElement.scrollTop = 0;
        let height = this.getHeight(inputElement);
        if (height) {
          inputElement.style.height = `${height}px`;
        }
      }

      inputElement.classList.remove('md-no-flex');
    }
  }

  getHeight (inputElement) {
    const { offsetHeight } = inputElement;
    const line = inputElement.scrollHeight - offsetHeight;

    return offsetHeight + (line > 0 ? line : 0);
  }

  setValue (value) {
    // normalize falsy values to empty string
    value = isEmpty(value) ? '' : value;

    if (this.element.querySelector('input, textarea').value !== value) {
      this.element.querySelector('input, textarea').value = value;
    }
  }

  notifyValidityChange () {
    notifyValidityChange.call(this);
  }

  @action
  handleInput (e) {
    invokeAction(this, 'onChange', e.target.value);
    // setValue below ensures that the input value is the same as this.value
    run.next(() => {
      if (this.isDestroyed) {
        return;
      }
      this.setValue(this.get('value'));
    });

    this.growTextarea();

    let inputElement = this.element.querySelector('input');
    let isNativeInvalid = inputElement && inputElement.validity && inputElement.validity.badInput;

    if (this.type === 'date' && e.target.value === '') {
      // Chrome doesn't fire the onInput event when clearing the second and third date components.
      // This means that we won't see another event when badInput becomes false if the user is clearing
      // the date field.  The reported value is empty, though, so we can already mark it as valid.
      isNativeInvalid = false;
    }

    this.set('isNativeInvalid', isNativeInvalid);
    this.notifyValidityChange();
  }

  focusOut (e) {
    invokeAction(this, 'onBlur', e);

    this.set('isTouched', true);
    this.notifyValidityChange();
  }

  focusIn (e) {
    invokeAction(this, 'onFocus', e);
  }
}
