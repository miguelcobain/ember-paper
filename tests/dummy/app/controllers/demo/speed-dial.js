/* eslint-disable ember/no-actions-hash, prettier/prettier */
import Controller from '@ember/controller';

export default Controller.extend({
  animation: 'fling',
  direction: 'down',

  actions: {
    toggle(propName) {
      this.toggleProperty(propName);
    }
  }
});