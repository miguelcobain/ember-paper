/* eslint-disable prettier/prettier */
/**
 * @module ember-paper
 */
import config from 'ember-get-config';
import { isEmpty } from '@ember/utils';

export function max(value, max) {
  return isEmpty(max) || isEmpty(value) || parseFloat(value) <= parseFloat(max);
}

export default {
  param: 'max',
  message: config['ember-paper']
  && config['ember-paper'].errorMessages
  && config['ember-paper'].errorMessages.max
    ? config['ember-paper'].errorMessages.max : 'Must be less than %@.',
  validate: max
};
