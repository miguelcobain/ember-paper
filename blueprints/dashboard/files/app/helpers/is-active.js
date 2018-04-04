import Helper from '@ember/component/helper';

export default Helper.extend({
  compute([routeName, activeRoute]) {
    return activeRoute === routeName;
  }
});
