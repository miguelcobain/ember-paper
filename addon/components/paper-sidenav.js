/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-sidenav';

const { NAME_KEY, Component, computed } = Ember;

/**
 * @class
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  layout,
  tagName: '',

  name: 'default',
  position: 'left',
  lockedOpen: 'gt-sm',
  open: false,
  closed: computed.not('open'),
  closeOnClick: true,

  actions: {
    onToggle() {
      this.sendAction('onToggle', ...arguments);
    },
    onBackdropTap() {
      this.sendAction('onToggle', false);
    }
  }
});

PaperComponent[NAME_KEY] = 'paper-sidenav';

export default PaperComponent;
