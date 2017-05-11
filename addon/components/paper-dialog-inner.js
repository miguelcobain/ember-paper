/**
 * @module ember-paper
 */
import Ember from 'ember';
import Translate3dMixin from '../mixins/translate3d-mixin';

const { Component, run } = Ember;

/**
 * @class PaperDialogInner
 * @extends Ember.Component
 * @uses Translate3dMixin
 */
export default Component.extend(Translate3dMixin, {
  tagName: 'md-dialog',
  classNames: ['md-default-theme'],
  classNameBindings: ['contentOverflow:md-content-overflow', 'fullscreen:md-dialog-fullscreen'],

  onTranslateFromEnd() {
    if (this.get('focusOnOpen')) {
      let toFocus = this.$('[autofocus]').last();
      if (toFocus.length === 0) {
        toFocus = this.$('md-dialog-actions button').last();
      }
      toFocus.focus();
    }
  },

  onTranslateToEnd($origin) {
    if ($origin) {
      $origin.focus();
    }
  },

  imagesLoaded() {
    let content = this.element.querySelector('md-dialog-content');
    this.set('contentOverflow', content.scrollHeight > content.clientHeight);
  },

  didInsertElement() {
    this._super(...arguments);
    // content overflow might change depending on load of images inside dialog.
    let images = this.$().find('img');
    images.on(`load.${this.elementId}`, run.bind(this, this.imagesLoaded));
  },

  willDestroyElement() {
    this._super(...arguments);
    let images = this.$().find('img');
    images.off(`load.${this.elementId}`);
  }
});
