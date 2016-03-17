import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-tabs-content-wrapper',

  init() {
    this._super();
    this.get('parent').send('setWormhole', this.elementId);
  }
});
