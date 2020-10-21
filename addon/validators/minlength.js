/**
 * @module ember-paper
 */
import config from 'ember-get-config';
import { isNone, isEmpty } from '@ember/utils';

export function minlength(value, minlength) {
  return isEmpty(minlength) || isNone(value) || `${value}`.length >= parseInt(minlength, 10);
}

export default {
  param: 'minlength',
  message: config['ember-paper']
  && config['ember-paper'].errorMessages
  && config['ember-paper'].errorMessages.minlength
    ? config['ember-paper'].errorMessages.minlength : 'Must have at least %@ characters.',
  validate: minlength
};
