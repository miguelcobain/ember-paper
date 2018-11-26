/**
 * @module ember-paper
 */
import Component from '@ember/component';

import { run } from '@ember/runloop';
import Translate3dMixin from '../mixins/translate3d-mixin';

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
      let focusableElements = this.element.querySelectorAll('[autofocus]');
      let toFocus = focusableElements[focusableElements.length - 1];
      if (!toFocus) {
        let focusableButtons = this.element.querySelectorAll('md-dialog-actions button');
        toFocus = focusableButtons[focusableButtons.length - 1];
      }
      if (toFocus) {
        toFocus.focus();
      }
    }
  },

  onTranslateToEnd(origin) {
    if (origin) {
      origin.focus();
    }
  },

  didInsertElement() {
    this._super(...arguments);
    this.checkContentOverflow();
    // content overflow might change depending on load of images inside dialog.
    let imageElements = this.element.querySelectorAll('img');
    this._checkContentOverflowOnLoad = run.bind(this, this.checkContentOverflow);
    imageElements.forEach((image) => {
      image.addEventListener('load', this._checkContentOverflowOnLoad);
    });

  },

  willDestroyElement() {
    this._super(...arguments);
    let imageElements = this.element.querySelectorAll('img');
    imageElements.forEach((image) => {
      image.removeEventListener('load', this._checkContentOverflowOnLoad);
    });
    this._checkContentOverflowOnLoad = null;
  },

  checkContentOverflow() {
    let content = this.element.querySelector('md-dialog-content');
    if (content) {
      this.set('contentOverflow', content.scrollHeight > content.clientHeight);
    }
  }
});
