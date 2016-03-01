import Ember from 'ember';
import Translate3dMixin from '../mixins/translate3d-mixin';
import PaperDialog from './paper-dialog';

const { Component, computed } = Ember;

export default Component.extend(Translate3dMixin, {
  tagName: 'md-dialog',
  classNames: ['md-default-theme'],
  classNameBindings: ['contentOverflow:md-content-overflow'],

  dialogComponent: computed(function() {
    return this.nearestOfType(PaperDialog);
  }),

  translateFromOrigin: computed('dialogComponent.origin', function() {
    return this.get('dialogComponent').get('origin');
  }),
  translateToParent: computed('dialogComponent.dialogRelativeContainer', function() {
    return this.get('dialogComponent').get('dialogRelativeContainer');
  }),

  onTranslateDestroy(origin) {
    origin.focus();
  }
});
