/**
 * @module ember-paper
 */
import Ember from 'ember';

const { Helper, String: Str } = Ember;

export function underscore([text]) {
  return Str.underscore(text);
}

export default Helper.helper(underscore);
