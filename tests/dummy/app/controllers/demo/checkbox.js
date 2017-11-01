import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  value1: true,
  value2: false,
  value3: false,
  value4: false,
  value5: false,
  value6: false,

  isIndeterminate: computed('value7', function() {
    return this.get('value7') === undefined;
  }),

  actions: {
    toggleValue6() {
      this.toggleProperty('value6');
    }
  }
});
