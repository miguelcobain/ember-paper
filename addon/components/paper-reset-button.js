import Ember from 'ember';
import Component from 'ember-component';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';

const { NAME_KEY } = Ember;

const PaperComponent = Component.extend(TransitionMixin, {
  tagName: 'button',
  attributeBindings: ['tabindex'],
  transitionClass: 'ng',
  onReset: null,

  mouseUp(e) {
    let onReset = this.get('onReset');
    if (onReset === null) {
      return;
    }
    onReset(e);
  }

});

PaperComponent[NAME_KEY] = 'paper-reset-button';

export default PaperComponent;
