import Ember from 'ember';
const { Helper } = Ember;

export default Helper.extend({
  compute([routeName, activeRoute]) {
    return activeRoute === routeName;
  }
});
