/**
 * @module ember-paper
 */
import Ember from 'ember';

const { isEmpty } = Ember;

export function max(value, max) {
  return isEmpty(max) || isEmpty(value) || parseFloat(value) <= parseFloat(max);
}

export default {
  param: 'max',
  message: 'Must be less than %@.',
  validate: max
};
