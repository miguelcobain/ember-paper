import Ember from 'ember';
const { Component } = Ember;

export default Component.extend({
  classNames: ['flex', 'layout-row'],
  attributeBindings: ['style'],
  style: Ember.String.htmlSafe('overflow: hidden; position: relative')
});
