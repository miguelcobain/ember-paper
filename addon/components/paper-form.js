/* eslint-disable ember/no-computed-properties-in-native-classes, ember/no-classic-components, ember/no-mixins, ember/classic-decorator-no-classic-methods */
import { tagName, layout as templateLayout } from '@ember-decorators/component';
import { action, computed } from '@ember/object';
import { and, not } from '@ember/object/computed';

import Component from '@ember/component';
import layout from '../templates/components/paper-form';
import ParentMixin from 'ember-paper/mixins/parent-mixin';
import { invokeAction } from 'ember-paper/utils/invoke-action';

/**
 * @class PaperForm
 * @extends Ember.Component
 * @uses ParentMixin
 */
@templateLayout(layout)
@tagName('form')
export default class PaperForm extends Component.extend(ParentMixin) {
  inputComponent = 'paper-input';
  submitButtonComponent = 'paper-button';
  selectComponent = 'paper-select';
  autocompleteComponent = 'paper-autocomplete';

  @not('isInvalid')
  isValid;

  @computed('childComponents.@each.isInvalid')
  get isInvalid() {
    return this.childComponents.isAny('isInvalid');
  }

  @computed('childComponents.@each.isTouched')
  get isTouched() {
    return this.childComponents.isAny('isTouched');
  }

  @and('isInvalid', 'isTouched')
  isInvalidAndTouched;

  submit() {
    this.send('localOnSubmit');
    return false;
  }

  @action
  localOnValidityChange() {
    if (this.lastIsValid !== this.isValid || this.lastIsTouched !== this.isTouched) {
      invokeAction(this, 'onValidityChange', this.isValid, this.isTouched, this.isInvalidAndTouched);
      this.set('lastIsValid', this.isValid);
      this.set('lastIsTouched', this.isTouched);
    }
  }

  @action
  localOnSubmit() {
    if (this.isInvalid) {
      this.childComponents.setEach('isTouched', true);
      invokeAction(this, 'onInvalid');
    } else {
      invokeAction(this, 'onSubmit');
      this.childComponents.setEach('isTouched', false);
    }
  }
}
