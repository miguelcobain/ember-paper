import Ember from 'ember';
import layout from '../templates/components/paper-nav-bar-item';
import { ChildMixin } from 'ember-composability-tools';
const { computed, Component } = Ember;

export default Component.extend(ChildMixin, {
  layout,
  tagName: 'li',
  classNames: ['md-nav-item'],
  attributeBindings: ['ariaSelected:aria-selected'],
  ariaSelected: computed.reads('selected'),
  accent: true,

  selected: computed('selectedNavItem', 'name', function() {
    if (this.get('selectedNavItem') !== undefined) {
      return this.get('selectedNavItem') === this.get('name');
    }
  }),

  didRender() {
    this._super(...arguments);
    let button = this.element.querySelector('.md-button');
    let { width } = button.getBoundingClientRect();
    let left = button.offsetLeft;
    this.setProperties({
      width,
      left
    });
  },

  actions: {
    onButtonClick() {
      this.sendAction('onClick', ...arguments);
      this.sendAction('onSelect', this);
    }
  }
});
