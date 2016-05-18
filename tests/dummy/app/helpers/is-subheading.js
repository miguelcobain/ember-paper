import Ember from 'ember';
const { Helper, typeOf } = Ember;

export default Helper.extend({
  compute([row]) {
    return typeOf(row) !== 'array';
  }
});
