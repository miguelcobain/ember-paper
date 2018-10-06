/**
 * @module ember-paper
 */
import Helper from '@ember/component/helper';

export function firstChar([text]) {
  return text && text[0];
}

export default Helper.helper(firstChar);
