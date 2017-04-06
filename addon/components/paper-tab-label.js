import Ember from 'ember';
import layout from '../templates/components/paper-tab-label';

const { Component } = Ember;

export default Component.extend({

  tagName: 'span',
  layout,

  didInsertElement() {
    if (this.get('parent')) {
      this.get('parent').send('identifyTabLabel', this.elementId);
    }
  }
});
