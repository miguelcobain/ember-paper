import Helper from '@ember/component/helper';
import { typeOf } from '@ember/utils';

export default Helper.extend({
  compute([row]) {
    return typeOf(row) !== 'array';
  }
});
