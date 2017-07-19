import Ember from 'ember';
import layout from '../templates/components/paper-nav-bar';
import { ParentMixin } from 'ember-composability-tools';

const { computed, Component } = Ember;

export default Component.extend(ParentMixin, {
  layout,
  tagName: 'md-nav-bar',

  selectedNavItem: null, // key of item

  _selectedNavItem: computed('childComponents.@each.name', 'selectedNavItem', function() {
    return this.get('childComponents').findBy('name', this.get('selectedNavItem'));
  }),

  _previousSelectedNavItem: computed('childComponents.@each.name', 'previousSelectedNavItem', function() {
    return this.get('childComponents').findBy('name', this.get('previousSelectedNavItem'));
  }),

  noInkBar: false,
  ariaLabel: null,
  previousInkBarPosition: 0,

  inkBarLeft: computed('_selectedNavItem.left', function() {
    return this.get('_selectedNavItem.left') || 0;
  }),

  inkBarWidth: computed('_selectedNavItem.width', function() {
    return this.get('_selectedNavItem.width') || 0;
  }),

  setMovingRight() {
    let movingRight = this.get('_previousSelectedNavItem.left') < this.get('_selectedNavItem.left');
    this.set('movingRight', movingRight);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    if (this.get('selectedNavItem') !== this.get('previousSelectedNavItem')) {
      this.setMovingRight();
      this.set('previousSelectedNavItem', this.get('selectedNavItem'));
    }
  },

  actions: {
    onChange(selected) {
      // support non DDAU scenario
      if (this.get('onChange')) {
        this.sendAction('onChange', selected.get('name'));
      } else {
        this.set('selectedNavItem', selected.get('name'));
      }
    }
  }
});
