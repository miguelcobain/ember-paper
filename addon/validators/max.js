/**
 * @module ember-paper
 */
import { isEmpty } from '@ember/utils';

export function max(value, max) {
  return isEmpty(max) || isEmpty(value) || parseFloat(value) <= parseFloat(max);
}

export default {
  param: 'max',
  message: 'Must be less than %@.',
  validate: max
};
