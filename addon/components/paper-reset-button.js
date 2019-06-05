import Component from '@ember/component';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';

export default Component.extend(TransitionMixin, {
  tagName: 'button',
  type: 'button',
  attributeBindings: ['tabindex', 'type'],
  transitionClass: 'ng',
  onReset: null,

  mouseUp(e) {
    let onReset = this.get('onReset');
    if (onReset === null) {
      return;
    }
    onReset(e);
  },

  didTransitionOut() {
    this._super(...arguments);
    if (this.get('onDidTransitionOut')) {
      this.get('onDidTransitionOut')();
    }
  }
});
