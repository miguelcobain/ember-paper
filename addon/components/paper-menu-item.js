/**
 * @module ember-paper
 */
import Component from '@ember/component';
import { or } from '@ember/object/computed';

import layout from '../templates/components/paper-menu-item';
import ChildMixin from 'ember-paper/mixins/child-mixin';
import { invokeAction } from 'ember-invoke-action';

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
    handleClick(e) {
      this.get('dropdown.actions').close();
      invokeAction(this, 'onClick', e);
    }
  },

  mouseEnter() {
    if (!this.get('disabled')) {
      let button = this.element.querySelector('button');
      if (button) {
        button.focus();
      }
    }
  }
});
