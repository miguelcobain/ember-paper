import Ember from 'ember';
import layout from '../templates/components/paper-nav-bar';

const { computed, Component } = Ember;

export default Component.extend({
  layout,
  tagName: 'md-nav-bar',

  selectedNavItem: null, // name of item
  _selectedNavItem: null, // component object

  noInkBar: false,
  ariaLabel: null,
  previousInkBarPosition: 0,

  movingRight: true,

  inkBarLeft: computed('_selectedNavItem.left', function() {
    return this.get('_selectedNavItem.left') || 0;
  }),

  inkBarWidth: computed('_selectedNavItem.width', function() {
    return this.get('_selectedNavItem.width') || 0;
  }),

  actions: {
    onChange(selected) {
      let previous = this.get('_selectedNavItem');
      if (previous) {
        let movingRight = previous.get('left') < selected.get('left');
        this.set('movingRight', movingRight);
      }

      this.set('_selectedNavItem', selected);
      this.get('onChange')(selected.get('name'));
    }
  }
});
