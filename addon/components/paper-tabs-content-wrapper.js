import Ember from 'ember';

const { Component, run } = Ember;

export default Component.extend({
  tagName: 'md-tabs-content-wrapper',

  didInsertElement() {
    this._super(...arguments);
    run.scheduleOnce('afterRender', () => this.get('parent').send('setWormhole', this.elementId));
  }
});
