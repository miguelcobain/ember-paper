/**
 * @module ember-paper
 */
import { or, bool, and, not } from '@ember/object/computed';

import Component from '@ember/component';
import { tagName, layout } from '@ember-decorators/component';
import { computed, set, get } from '@ember/object';
import { tracked } from '@glimmer/tracking'
import { isEmpty } from '@ember/utils';
import { run } from '@ember/runloop';
import { assert } from '@ember/debug';
import template from './template';
import colorClassNameBindings from 'ember-paper/utils/color-class-bindings';
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
 */
@tagName('md-input-container')
@layout(template)
export default class PaperInput extends Component {
  classNameBindings = ['computedClasses']

  @computed(
    'hasValue',
    'isInvalidAndTouched',
    'hasLeftIcon',
    'hasRightIcon',
    'focused',
    'block',
    'placeholder',
    ...colorClassNameBindings.map(binding => binding.param)
  )
  get computedClasses () {
    const classes = [
      'md-default-theme'
    ]

    if (get(this, 'hasValue')) {
      classes.push('md-input-has-value')
    }

    if (get(this, 'isInvalidAndTouched')) {
      classes.push('md-input-invalid')
    }

    if (get(this, 'hasLeftIcon')) {
      classes.push('md-icon-left')
    }

    if (get(this, 'hasRightIcon')) {
      classes.push('md-icon-right')
    }

    if (get(this, 'focused')) {
      classes.push('md-input-focused')
    }

    if (get(this, 'block')) {
      classes.push('md-block')
    }

    if (get(this, 'placeholder')) {
      classes.push('md-input-has-placeholder')
    }

    colorClassNameBindings.forEach(binding => {
      if (this[binding.param]) {
        classes.push(binding.class)
      }
    })

    return classes.join(' ')
  }

  type = 'text';

  @tracked
  focused = false;

  @tracked
  isTouched = false;

  set formHasBeenValidated (value) {
    this.set('isTouched', value)
  }

  iconComponent = 'paper-icon';

  validations = validations;

  @tracked
  errorMessages;

  @tracked
  value = '';

  @tracked
  customValidations = [];

  @tracked
  errors = [];

  @computed(
    'value',
    'errors.[]',
    'customValidations.[]',
    'errorMessages',
    ...validations.map(validator => validator.param),
  )
  get validationErrorMessages () {
    return buildComputedValidationMessages.call(this, 'value');
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
    const value = get(this, 'value');
    const isNativeInvalid = get(this, 'isNativeInvalid');

    return !isEmpty(value) || isNativeInvalid;
  }

  @computed('label', 'focused')
  get shouldAddPlaceholder () {
    // if has label, only add placeholder when focused
    return isEmpty(get(this, 'label')) || get(this, 'focused');
  }

  inputElementId

  @computed('value', 'maxlength')
  get renderCharCount () {
    let currentLength = get(this, 'value') ? get(this, 'value.length') : 0;
    return `${currentLength}/${get(this, 'maxlength')}`;
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

    assert('{{paper-input}} requires an `onChange` action or null for no action.', get(this, 'onChange') !== undefined);

    if (get(this, 'onRegister')) {
      invokeAction(this, 'onRegister', get(this, 'elementId'));
    }

    if (!get(this, 'inputElementId')) {
      set(this, 'inputElementId', `input-${get(this, 'elementId')}`)
    }
  }

  didReceiveAttrs () {
    super.didReceiveAttrs(...arguments);

    this.notifyValidityChange();
  }

  didInsertElement () {
    super.didInsertElement(...arguments);

    if (get(this, 'textarea')) {
      set(this, '_growTextareaOnResize', run.bind(this, this.growTextarea));

      window.addEventListener('resize', get(this, '_growTextareaOnResize'));
    }
  }

  willDestroyElement () {
    super.willDestroyElement(...arguments);

    if (get(this, 'textarea')) {
      window.removeEventListener('resize', get(this, '_growTextareaOnResize'));

      set(this, '_growTextareaOnResize', null);
    }
  }

  willDestroy () {
    const eltId = get(this, 'elementId');

    super.willDestroy(...arguments);

    if (get(this, 'onUnregister')) {
      invokeAction(this, 'onUnregister', eltId);
    }
  }

  growTextarea () {
    if (get(this, 'textarea')) {
      const inputElement = this.element.querySelector('input, textarea');

      inputElement.classList.add('md-no-flex');
      inputElement.setAttribute('rows', 1);

      const minRows = get(this, 'passThru.rows');
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
        let maxRows = get(this, 'passThru.maxRows') || Number.MAX_VALUE;
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

  input (e) {
    invokeAction(this, 'onChange', e.target.value);

    // setValue below ensures that the input value is the same as this.value
    run.next(() => {
      if (this.isDestroyed) {
        return;
      }
      this.setValue(get(this, 'value'));
    });

    this.growTextarea();

    const inputElement = this.element.querySelector('input');
    let isNativeInvalid = inputElement && inputElement.validity && inputElement.validity.badInput;

    if (get(this, 'type') === 'date' && e.target.value === '') {
      // Chrome doesn't fire the onInput event when clearing the second and third date components.
      // This means that we won't see another event when badInput becomes false if the user is clearing
      // the date field.  The reported value is empty, though, so we can already mark it as valid.
      isNativeInvalid = false;
    }

    set(this, 'isNativeInvalid', isNativeInvalid);
    this.notifyValidityChange();
  }

  focusOut (e) {
    set(this, 'isTouched', true);
    set(this, 'focused', true);

    invokeAction(this, 'onBlur', e);

    this.notifyValidityChange();
  }

  focusIn (e) {
    set(this, 'focused', false);

    invokeAction(this, 'onFocus', e);
  }
}
