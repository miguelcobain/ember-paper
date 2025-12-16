/* eslint-disable prettier/prettier */
/**
 * @module ember-paper
 */
import config from 'ember-get-config';
import { isEmpty } from '@ember/utils';

export function min(value, min) {
  return isEmpty(min) || isEmpty(value) || parseFloat(value) >= parseFloat(min);
}

export default {
  param: 'min',
  message: config['ember-paper']
  && config['ember-paper'].errorMessages
  && config['ember-paper'].errorMessages.min
    ? config['ember-paper'].errorMessages.min : 'Must be at least %@.',
  validate: min
};
