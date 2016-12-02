import Ember from 'ember';

const { Component, run } = Ember;

export default Component.extend({
  tagName: 'md-tabs-content-wrapper',

  init() {
    this._super();
    run.scheduleOnce('afterRender', () => this.get('parent').send('setWormhole', this.elementId));
  }
});
