import Ember from 'ember';
const { isNone } = Ember;

export function maxlength(value, maxlength) {
  return isNone(value) || value === false || `${value}`.length <= parseInt(maxlength);
}

export default {
  param: 'maxlength',
  message: 'Must not exceed %@ characters.',
  validate: maxlength
};