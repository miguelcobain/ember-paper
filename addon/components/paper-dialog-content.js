/**
 * @module ember-paper
 */
import Ember from 'ember';
import PaperDialogInner from './paper-dialog-inner';

const { Component, computed, run } = Ember;

/**
 * @class PaperDialogComponent
 * @extends Ember.Component
 */
export default Component.extend({
  tagName: 'md-dialog-content',
  classNames: ['md-dialog-content'],

  dialogInnerComponent: computed(function() {
    return this.nearestOfType(PaperDialogInner);
  }),

  imagesLoaded() {
    let content = this.get('element');
    this.get('dialogInnerComponent').set('contentOverflow', content.scrollHeight > content.clientHeight);
  },

  didInsertElement() {
    // content overflow might change depending on load of images inside dialog.
    let images = this.$().find('img');

    let imageLoadHandler = run.bind(this, this.imagesLoaded);
    this.set('imageLoadHandler', imageLoadHandler);

    images.on('load', imageLoadHandler);
  },

  willDestroyElement() {
    this._super(...arguments);
    let images = this.$().find('img');
    images.off('load', this.get('imageLoadHandler'));
  }
});
