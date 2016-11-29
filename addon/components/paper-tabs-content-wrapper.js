import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'md-tabs-content-wrapper',

  init() {
    this._super();
    this.get('parent').send('setWormhole', this.elementId);
  }
});
