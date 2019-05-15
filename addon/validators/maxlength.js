/**
 * @module ember-paper
 */
import config from 'ember-get-config';
import { isNone, isEmpty } from '@ember/utils';

export function maxlength(value, maxlength) {
  return isEmpty(maxlength) || isNone(value) || `${value}`.length <= parseInt(maxlength, 10);
}

export default {
  param: 'maxlength',
  message: config['ember-paper'] &&
    config['ember-paper'].errorMessages &&
    config['ember-paper'].errorMessages.maxlength ?
    config['ember-paper'].errorMessages.maxlength : 'Must not exceed %@ characters.',
  validate: maxlength
};
