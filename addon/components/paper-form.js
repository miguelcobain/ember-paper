/**
 * @module ember-paper
 */
import { not, and } from '@ember/object/computed';

import Component from '@ember/component';
import { tagName, layout } from '@ember-decorators/component';
import { run } from '@ember/runloop';
import { get, set, action } from '@ember/object';
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
    const child = get(this, 'childComponents').findBy('childId', childId);

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
    const lastIsValid = get(this, 'isValid');
    const lastIsTouched = get(this, 'isTouched');

    if (
      get(this, 'finishFirstRender')
      && (
        lastIsValid !== this.getIsValid()
        || lastIsTouched !== this.getIsTouched()
      )
    ) {
      this.setNewValidity()
    }
  }

  getIsValid () {
    return get(this, 'childComponents').isEvery('isValid')
  }

  getIsTouched () {
    return get(this, 'childComponents').isAny('isTouched')
  }

  setNewValidity () {
    run.next(() => {
      if (!get(this, 'isDestroying')) {
        this.set('isValid', this.getIsValid());
        this.set('isTouched', this.getIsTouched());

        invokeAction(this, 'onValidityChange', get(this, 'isValid'), get(this, 'isTouched'), get(this, 'isInvalidAndTouched'));
      }
    })
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
    if (!get(this, 'finishFirstRender')) {
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
    if (get(this, 'isInvalid')) {
      this.set('formHasBeenValidated', true);

      invokeAction(this, 'onInvalid');
    } else {
      invokeAction(this, 'onSubmit');

      this.set('formHasBeenValidated', false);
    }
  }

  @action
  onRegister (childId) {
    get(this, 'childComponents').pushObject({ childId });
  }

  @action
  onUnregister (childId) {
    if (!this.isDestroying) {
      const child = get(this, 'childComponents').findBy('childId', childId)

      if (child) {
        get(this, 'childComponents').removeObject(child);

        this.triggerValidityChange()
      }
    }
  }
}
