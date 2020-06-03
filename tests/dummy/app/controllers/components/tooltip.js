import Controller from '@ember/controller';

export default Controller.extend({
  position: 'bottom',

  actions: {
    toggle(propName) {
      this.toggleProperty(propName);
    }
  }
});