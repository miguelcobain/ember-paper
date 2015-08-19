import Ember from 'ember';
import Translate3dMixin from '../mixins/translate3d-mixin';
import PaperDialog from './paper-dialog';

export default Ember.Component.extend(Translate3dMixin, {
  tagName: 'md-dialog',
  classNames: ['md-default-theme'],
  classNameBindings: ['contentOverflow:md-content-overflow'],

  dialogComponent: Ember.computed(function () {
    return this.nearestOfType(PaperDialog);
  }),

  translateFromOrigin: Ember.computed(function () {
    return this.get('dialogComponent').get('origin');
  }),
  translateToParent: Ember.computed(function () {
    return this.get('dialogComponent').get('parent');
  }),

  onTranslateDestroy(origin) {
    origin.focus();
  }
});
