import Component from 'ember-component';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';

export default Component.extend(TransitionMixin, {
  tagName: 'button',
  attributeBindings: ['tabindex'],
  transitionClass: 'ng'
});
