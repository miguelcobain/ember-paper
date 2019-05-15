
/**
 * @module ember-paper
 */
import config from 'ember-get-config';
import { isEmpty } from '@ember/utils';

export function required(value, required) {
  return (required === true && !isEmpty(value)) || required !== true;
}
export default {
  param: 'required',
  message: config['ember-paper']
  && config['ember-paper'].errorMessages
  && config['ember-paper'].errorMessages.required
    ? config['ember-paper'].errorMessages.required : 'This is required.',
  // required can be a boolean or 'style' for just required asterisk styling.
  validate: required
};
