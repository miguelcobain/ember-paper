import Ember from 'ember';
import Translate3dMixin from '../mixins/translate3d-mixin';
import PaperDialog from './paper-dialog';

const { Component, computed } = Ember;

export default Component.extend(/*Translate3dMixin, TODO */ {
  tagName: 'md-dialog',
  classNames: ['md-default-theme'     , 'md-transition-in'     /* TODO */ ],
  classNameBindings: ['contentOverflow:md-content-overflow', 'fullscreen:md-dialog-fullscreen'],

  translateFromOrigin: computed.reads('openFrom'),

  translateToParent: computed.reads('closeTo'),

  onTranslateDestroy(origin) {
    origin.focus();
  },

  click(ev) {
    if (this.get('clickOutsideToClose')) {
      ev.stopPropagation();
      return false;
    }
  }

});
