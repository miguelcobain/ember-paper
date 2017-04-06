import Ember from 'ember';
import layout from '../templates/components/paper-tabs-content-wrapper';

const { Component, run } = Ember;

export default Component.extend({
  tagName: 'md-tabs-content-wrapper',
  layout,

  didInsertElement() {
    this._super(...arguments);
    run.scheduleOnce('afterRender', () => this.get('parent').send('setWormhole', this.elementId));
  }
});
