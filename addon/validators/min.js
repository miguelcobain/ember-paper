/**
 * @module ember-paper
 */
import Ember from 'ember';

const { isEmpty } = Ember;

export function min(value, min) {
  return isEmpty(min) || isEmpty(value) || parseFloat(value) >= parseFloat(min);
}

export default {
  param: 'min',
  message: 'Must be at least %@.',
  validate: min
};
