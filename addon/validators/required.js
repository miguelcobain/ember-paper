/**
 * @module ember-paper
 */
import Ember from 'ember';

const { isEmpty } = Ember;

export function required(value, required) {
  return (required === true && !isEmpty(value)) || required !== true;
}

export default {
  param: 'required',
  message: 'This is required.',
  // required can be a boolean or 'style' for just required asterisk styling.
  validate: required
};
