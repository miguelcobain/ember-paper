/**
 * @module ember-paper
 */
import Ember from 'ember';

const { isEmpty, isNone } = Ember;

export function maxlength(value, maxlength) {
  return isEmpty(maxlength) || isNone(value) || `${value}`.length <= parseInt(maxlength, 10);
}

export default {
  param: 'maxlength',
  message: 'Must not exceed %@ characters.',
  validate: maxlength
};
