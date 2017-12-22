/**
 * @module ember-paper
 */
import Component from '@ember/component';
import { or } from '@ember/object/computed';

import layout from '../templates/components/paper-menu-item';
import ChildMixin from 'ember-paper/mixins/child-mixin';

/**
 * @class PaperMenuItem
 * @extends Ember.Component
 * @uses ChildMixin
 */
export default Component.extend(ChildMixin, {
  layout,
  tagName: 'md-menu-item',
  disabled: false,

  shouldRenderButton: or('onClick', 'href'),

  actions: {
    handleClick(event) {
      this.get('dropdown.actions').close();
      this.sendAction('onClick', event);
    }
  },

  mouseEnter() {
    if (!this.get('disabled')) {
      this.$('button').focus();
    }
  }
});
