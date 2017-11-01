/**
 * @module ember-paper
 */
import { isNone, isEmpty } from '@ember/utils';

export function maxlength(value, maxlength) {
  return isEmpty(maxlength) || isNone(value) || `${value}`.length <= parseInt(maxlength, 10);
}

export default {
  param: 'maxlength',
  message: 'Must not exceed %@ characters.',
  validate: maxlength
};
