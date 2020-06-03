import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    // Create a new record for demonstration purposes. Normally, data
    // would be retrieved from the store via find or findAll.
    return this.store.createRecord('user', {});
  },

  actions: {

    willTransition() {
      // Clean up the record created for demonstration purposes.
      let record = this.modelFor('demo.input');
      record.rollbackAttributes();
      this.store.unloadRecord(record);
    }

  }
});
