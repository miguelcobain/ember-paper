import Component from '@ember/component';
import layout from 'ember-paper/templates/components/paper-virtual-repeat/scroller/template';

export default Component.extend({
  layout,
  classNames: ['md-virtual-repeat-scroller'],

  didInsertElement() {
    this._super(...arguments);

    this._onScroll = (e) => {
      this.get('onScroll')(e);
    };
    this.element.addEventListener('scroll', this._onScroll);
  },

  willDestroyElement() {
    this._super(...arguments);
    this.element.removeEventListener('scroll', this._onScroll);
    this._onScroll = null;
  }
});
