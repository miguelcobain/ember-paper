import Ember from 'ember';
const { isNone } = Ember;

export function minlength(value, minlength) {
  return isNone(value) || value === false || `${value}`.length >= parseInt(minlength);
}

export default {
  param: 'minlength',
  message: 'Must have at least %@ characters.',
  validate: minlength
};