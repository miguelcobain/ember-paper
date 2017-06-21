/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-menu-item';
import ChildMixin from 'ember-paper/mixins/child-mixin';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperMenuItem
 * @extends Ember.Component
 * @uses ChildMixin
 */
const PaperComponent = Component.extend(ChildMixin, {
  layout,
  tagName: 'md-menu-item',
  disabled: false,

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

PaperComponent[NAME_KEY] = 'paper-menu-item';

export default PaperComponent;
