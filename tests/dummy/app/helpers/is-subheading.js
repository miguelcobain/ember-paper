import Ember from 'ember';
const { Helper } = Ember;

export default Helper.extend({
  compute([row]) {
    return !row[0];
  }
});
