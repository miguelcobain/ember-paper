/**
 * @module ember-paper
 */
import Helper from '@ember/component/helper';
import { underscore as strUnderscore } from '@ember/string';

export function underscore([text]) {
  return strUnderscore(text);
}

export default Helper.helper(underscore);
