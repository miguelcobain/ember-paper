import Ember from 'ember';
import ColorMixin from 'ember-paper/mixins/color-mixin';
const { Component } = Ember;

export default Component.extend(ColorMixin, {
  tagName: 'md-toolbar',
  classNames: ['md-default-theme'],
  tall: false,
  classNameBindings: ['tall:md-tall']
});
