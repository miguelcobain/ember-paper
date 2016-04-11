import Ember from 'ember';
const { isEmpty } = Ember;

export function max(value, max) {
  return isEmpty(value) || value === false || parseInt(value) <= parseInt(max);
}

export default {
  param: 'max',
  message: 'Must be less than %@.',
  validate: max
};