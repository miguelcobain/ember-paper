import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class extends Route {
  model() {
    // Create a new record for demonstration purposes. Normally, data
    // would be retrieved from the store via find or findAll.
    return this.store.createRecord('user', {});
  }

  @action
  willTransition() {
    // Clean up the record created for demonstration purposes.
    let record = this.modelFor('components.input');
    record.rollbackAttributes();
    this.store.unloadRecord(record);
  }
}
