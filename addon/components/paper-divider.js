import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-divider',
  attributeBindings: ['inset:md-inset'],
  classNames: ['paper-divider','md-default-theme'],
  inset: null,
});
