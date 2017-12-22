/**
 * @module ember-paper
 */
import { alias, and } from '@ember/object/computed';

import { computed } from '@ember/object';
import layout from '../templates/components/paper-select';
import PowerSelect from 'ember-power-select/components/power-select';
import ValidationMixin from 'ember-paper/mixins/validation-mixin';
import ChildMixin from 'ember-paper/mixins/child-mixin';
import FocusableMixin from 'ember-paper/mixins/focusable-mixin';

function concatWithProperty(strings, property) {
  if (property) {
    strings.push(property);
  }
  return strings.join(' ');
}

/**
 * @class PaperSelect
 * @extends PaperInput
 */
export default PowerSelect.extend(ValidationMixin, ChildMixin, FocusableMixin, {
  layout,
  tagName: 'md-input-container',
  onchange: alias('onChange'),
  optionsComponent: 'paper-select-options',
  triggerComponent: 'paper-select-trigger',
  beforeOptionsComponent: 'paper-select-search',
  classNameBindings: ['isInvalidAndTouched:md-input-invalid', 'selected:md-input-has-value', 'focusedAndSelected:md-input-focused'],
  searchEnabled: false,
  validationProperty: 'selected',
  isTouched: false,
  isInvalidAndTouched: and('isInvalid', 'isTouched'),
  attributeBindings: ['parentTabindex:tabindex'],
  shouldShowLabel: and('label', 'selected'),
  focusedAndSelected: and('focused', 'selected'),

  didReceiveAttrs() {
    this._super(...arguments);
    this.notifyValidityChange();
  },

  concatenatedTriggerClasses: computed('triggerClass', 'publicAPI.isActive', function() {
    let classes = ['ember-power-select-trigger'];
    if (this.get('isInvalid')) {
      classes.push('ng-invalid');
    }
    if (this.get('isTouched')) {
      classes.push('ng-dirty');
    }
    if (this.get('publicAPI.isActive')) {
      classes.push('ember-power-select-trigger--active');
    }
    return concatWithProperty(classes, this.get('triggerClass'));
  }),
  actions: {
    onClose() {
      this._super(...arguments);
      this.set('isTouched', true);
      this.notifyValidityChange();
    },
    onOpen() {
      this._super(...arguments);
      this.notifyValidityChange();
    }
  }
});
