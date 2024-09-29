/* eslint-disable ember/no-actions-hash, ember/no-controller-access-in-routes, prettier/prettier */
import Route from '@ember/routing/route';

export default Route.extend({
  actions: {
    willTransition() {
      this.controller.set('drawerOpen', false);
    },
    alertValue(value) {
      alert(`You clicked Radio button: ${value}`);
    }
  }
});
