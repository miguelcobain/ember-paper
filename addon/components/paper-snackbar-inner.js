/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-snackbar-inner';
import GestureMixin from '../mixins/gesture-mixin';
const { Component } = Ember;

/**
 * @class PaperSnackbarInner
 * @extends Ember.Component
 */
export default Component.extend(GestureMixin, {
  layout,
  tagName: 'md-toast',
  classNames: [],
  bottom: true,
  classNameBindings: ['left:md-left', 'right:md-right', 'top:md-top', 'bottom:md-bottom', 'capsule:md-capsule'],
  swipe() { },
  swipeRight() {
    this.swipe();
  },
  swipeLeft() {
    this.swipe();
  }
}
);
