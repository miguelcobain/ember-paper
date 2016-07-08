import Ember from 'ember';
import ParentMixin from 'ember-paper/mixins/parent-mixin';

const { Component, computed, on, observer } = Ember;

export default Component.extend(ParentMixin, {
  tagName: '',
  isValid: computed('childComponents.@each.isInvalid', function() {
    return !this.get('childComponents').isAny('isInvalid');
  }),
  isInvalid: computed.not('isValid'),
  sendToParent: on('init', observer('isValid', function() {
    if (!this.get('parentAction')) {
      return;
    }
    this.get('parentAction')(this.get('isValid'));
  })),
  actions: {
    submit() {
      if (this.get('parentSubmit')) {
        this.get('parentSubmit')();
      }
      this.get('childComponents').setEach('isTouched', false);
    }
  }
});
