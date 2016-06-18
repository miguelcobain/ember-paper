import Ember from 'ember';
const { Component } = Ember;

export default Component.extend({
  tagName: 'md-divider',
  attributeBindings: ['inset:md-inset'],
  classNames: ['paper-divider','md-default-theme'],
  inset: null
});
