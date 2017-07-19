import Ember from 'ember';
import layout from '../templates/components/paper-tabs';
import { ParentMixin } from 'ember-composability-tools';
import ColorMixin from 'ember-paper/mixins/color-mixin';

const { computed, Component } = Ember;

export default Component.extend(ParentMixin, ColorMixin, {
  layout,
  tagName: 'md-tabs',

  classNames: ['md-no-tab-content'],
  attributeBindings: ['borderBottom:md-border-bottom'],

  selected: null, // key of item

  _selectedTab: computed('childComponents.@each.name', 'selected', function() {
    return this.get('childComponents').findBy('name', this.get('selected'));
  }),

  _previousSelectedTab: computed('childComponents.@each.name', 'previousSelectedNavItem', function() {
    return this.get('childComponents').findBy('name', this.get('previousSelected'));
  }),

  noInkBar: false,
  noInk: false,
  ariaLabel: null,
  previousInkBarPosition: 0,

  inkBarLeft: computed('_selectedTab.left', function() {
    return this.get('_selectedTab.left') || 0;
  }),

  inkBarRight: computed('_selectedTab.width', 'inkBarLeft', function() {
    let { width } = this.element.querySelector('md-pagination-wrapper').getBoundingClientRect();
    return width - this.get('inkBarLeft') - (this.get('_selectedTab.width') || 0);
  }),

  setMovingRight() {
    let movingRight = this.get('_previousSelectedTab.left') < this.get('_selectedTab.left');
    this.set('movingRight', movingRight);
  },

  didReceiveAttrs() {
    this._super(...arguments);
    if (this.get('selected') !== this.get('previousSelected')) {
      this.setMovingRight();
      this.set('previousSelected', this.get('selectedNavItem'));
    }
  },

  actions: {
    onChange(selected) {
      // support non DDAU scenario
      if (this.get('onChange')) {
        this.sendAction('onChange', selected.get('name'));
      } else {
        this.set('selected', selected.get('name'));
      }
    }
  }
});
