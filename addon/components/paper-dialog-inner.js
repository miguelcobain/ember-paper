import Ember from 'ember';
import Translate3dMixin from '../mixins/translate3d-mixin';
import PaperDialog from './paper-dialog';

const { Component, computed } = Ember;

export default Component.extend(/*Translate3dMixin, TODO */ {
  tagName: 'md-dialog',
  classNames: ['md-default-theme'     , 'md-transition-in'     /* TODO */ ],
  classNameBindings: ['contentOverflow:md-content-overflow', 'dialogComponent.fullscreen:md-dialog-fullscreen'],

  dialogComponent: computed(function() {
    return this.nearestOfType(PaperDialog);
  }),

  translateFromOrigin: computed.reads('dialogComponent.openFrom'),

  translateToParent: computed.reads('dialogComponent.closeTo'),

  onTranslateDestroy(origin) {
    origin.focus();
  },

  click(ev) {
    if (this.get('dialogComponent.clickOutsideToClose')) {
      ev.stopPropagation();
      return false;
    }
  }

});
