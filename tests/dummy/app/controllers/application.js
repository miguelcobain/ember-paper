/* eslint-disable ember/no-actions-hash */
import { equal } from '@ember/object/computed';
import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { inject as service } from '@ember/service';

export default Controller.extend({
  router: service(),

  actions: {
    toggleExpandedItem(value, ev) {
      if (this.expandedItem === value) {
        value = null;
      }
      this.set('expandedItem', value);
      ev.stopPropagation();
    },
  },

  expandedItem: computed('router.currentRouteName', function () {
    if (this.router.currentRouteName.substr(0, 6) === 'layout') {
      return 'layout';
    } else {
      return 'demos';
    }
  }),

  demosExpanded: equal('expandedItem', 'demos'),
  layoutExpanded: equal('expandedItem', 'layout'),
});
