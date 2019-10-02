import Component from '@ember/component';
import layout from '../templates/components/paper-virtual-repeat-scroller';

export default Component.extend({
  layout,
  classNames: ['md-virtual-repeat-scroller'],

  didInsertElement() {
    this._super(...arguments);
    this.element.addEventListener((e) => {
      this.get('onScroll')(e);
    });
  },

  willDestroyElement() {
    this._super(...arguments);
    this.element.addEventListener('scroll');
  }
});
