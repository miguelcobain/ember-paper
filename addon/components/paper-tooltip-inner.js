import Ember from 'ember';
import layout from '../templates/components/paper-tooltip-inner';
import TransitionMixin, { nextTick } from 'ember-css-transitions/mixins/transition-mixin';
import calculateTooltipPosition from 'ember-paper/utils/calculate-tooltip-position';
const { Component, computed, run, String: { htmlSafe } } = Ember;

export default Component.extend(TransitionMixin, {
  layout,
  tagName: 'md-tooltip',
  attributeBindings: ['style'],
  classNames: ['md-tooltip', 'md-panel'],
  classNameBindings: ['positionClass'],
  transitionClassNameBindings: ['show:md-show', 'hide:md-hide'],
  show: computed.bool('style'),

  positionClass: computed('position', function() {
    return `md-origin-${this.get('position')}`;
  }),

  didInsertElement() {
    this._super(...arguments);
    run.schedule('afterRender', () => {
      if (!this.isDestroyed) {
        let anchorElement = this.get('anchorElement');
        let pos = calculateTooltipPosition(this.element, anchorElement, this.get('position'));
        this.set('style', htmlSafe(`top: ${pos.top}px; left: ${pos.left}px`));
        this.set('hide', true);
        nextTick().then(nextTick).then(nextTick).then(nextTick).then(() => {
          if (!this.isDestroyed) {
            this.set('hide', false);
          }
        });
      }
    });
  }
});
