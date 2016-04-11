import Ember from 'ember';
const { isEmpty } = Ember;

export function min(value, min) {
  return isEmpty(value) || value === false || parseInt(value) >= parseInt(min);
}

export default {
  param: 'min',
  message: 'Must be at least %@.',
  validate: min
};