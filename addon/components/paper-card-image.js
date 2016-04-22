import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: 'img',
  classNames: ['md-card-image'],
  attributeBindings: ['src', 'title', 'alt']
});
