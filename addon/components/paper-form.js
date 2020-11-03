/**
 * @module ember-paper
 */
import { not, and } from '@ember/object/computed';

import Component from '@ember/component';
import { tagName, layout } from '@ember-decorators/component';
import { set, action } from '@ember/object';
import template from '../templates/components/paper-form';
import { A } from '@ember/array';
import { invokeAction } from 'ember-invoke-action';
import { tracked } from '@glimmer/tracking';

/**
 * @class PaperForm
 * @extends Ember.Component
 * @uses ParentMixin
 */
@tagName('form')
@layout(template)
export default class PaperForm extends Component {
  inputComponent = 'paper-input';
  submitButtonComponent = 'paper-button';
  selectComponent = 'paper-select';
  autocompleteComponent = 'paper-autocomplete';

  finishFirstRender = false

  @tracked
  formHasBeenValidated = false

  isValid = true
  isTouched = false

  @not('isValid')
  isInvalid

  @and('isInvalid', 'isTouched')
  isInvalidAndTouched

  childComponents = A()

  updateValidity ({ childId, isValid, isTouched, isInvalidAndTouched }) {
    const child = this.get('childComponents').findBy('childId', childId);

    if (child) {
      const lastIsValid = child.isValid;
      const lastIsTouched = child.isTouched;

      if (
        lastIsValid !== isValid
        || lastIsTouched !== isTouched
      ) {
        set(child, 'isValid', isValid);
        set(child, 'isTouched', isTouched);
        set(child, 'isInvalidAndTouched', isInvalidAndTouched);

        this.notifyPropertyChange('childComponents')
      }
    }

    this.triggerValidityChange()
  }

  triggerValidityChange () {
    const lastIsValid = this.get('isValid');
    const lastIsTouched = this.get('isTouched');

    if (
      this.get('finishFirstRender')
      && (
        lastIsValid !== this.getIsValid()
        || lastIsTouched !== this.getIsTouched()
      )
    ) {
      this.setNewValidity()
    }
  }

  getIsValid () {
    return this.get('childComponents').isEvery('isValid')
  }

  getIsTouched () {
    return this.get('childComponents').isAny('isTouched')
  }

  setNewValidity () {
    this.set('isValid', this.getIsValid());
    this.set('isTouched', this.getIsTouched());

    invokeAction(this, 'onValidityChange', this.get('isValid'), this.get('isTouched'), this.get('isInvalidAndTouched'));
  }

  @action
  onChildValidityChange ({ elementId: childId, isValid, isTouched, isInvalidAndTouched }) {
    if (!this.isDestroying) {
      this.updateValidity({
        childId,
        isValid,
        isTouched,
        isInvalidAndTouched
      })
    }
  }

  didRender () {
    if (!this.get('finishFirstRender')) {
      this.set('finishFirstRender', true)

      this.setNewValidity()
    }
  }

  submit (event) {
    event.preventDefault()

    this.onInternalSubmit(...arguments)
  }

  reset () {
    this.set('formHasBeenValidated', false);
  }

  @action
  onInternalSubmit () {
    if (this.get('isInvalid')) {
      this.set('formHasBeenValidated', true);

      invokeAction(this, 'onInvalid');
    } else {
      invokeAction(this, 'onSubmit');

      this.set('formHasBeenValidated', false);
    }
  }

  @action
  onRegister (childId) {
    this.get('childComponents').pushObject({ childId });
  }

  @action
  onUnregister (childId) {
    if (!this.isDestroying) {
      const child = this.get('childComponents').findBy('childId', childId)

      if (child) {
        this.get('childComponents').removeObject(child);

        this.triggerValidityChange()
      }
    }
  }
}
