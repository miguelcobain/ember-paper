import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: '',
  didInsertElement() {
    if (this.get('parent')) {
      this.get('parent').send('identifyTabLabel', this.elementId);
    }
  }
});
