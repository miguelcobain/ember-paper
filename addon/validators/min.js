/**
 * @module ember-paper
 */
import { isEmpty } from '@ember/utils';

export function min(value, min) {
  return isEmpty(min) || isEmpty(value) || parseFloat(value) >= parseFloat(min);
}

export default {
  param: 'min',
  message: 'Must be at least %@.',
  validate: min
};
