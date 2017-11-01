/**
 * @module ember-paper
 */
import Helper from '@ember/component/helper';

import Ember from 'ember';

const {
  String: Str
} = Ember;

export function underscore([text]) {
  return Str.underscore(text);
}

export default Helper.helper(underscore);
