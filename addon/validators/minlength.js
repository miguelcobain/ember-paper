/**
 * @module ember-paper
 */
import Ember from 'ember';

const { isEmpty, isNone } = Ember;

export function minlength(value, minlength) {
  return isEmpty(minlength) || isNone(value) || `${value}`.length >= parseInt(minlength, 10);
}

export default {
  param: 'minlength',
  message: 'Must have at least %@ characters.',
  validate: minlength
};
