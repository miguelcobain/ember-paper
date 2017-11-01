/**
 * @module ember-paper
 */
import { isEmpty } from '@ember/utils';

export function required(value, required) {
  return (required === true && !isEmpty(value)) || required !== true;
}

export default {
  param: 'required',
  message: 'This is required.',
  // required can be a boolean or 'style' for just required asterisk styling.
  validate: required
};
