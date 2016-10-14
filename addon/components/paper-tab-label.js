import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',
  didInsertElement() {
    if (this.get('parent')) {
      this.get('parent').send('identifyTabLabel', this.elementId);
    }
  }
});
