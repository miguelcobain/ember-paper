/**
 * @module ember-paper
 */
import Ember from 'ember';

const { NAME_KEY, Component, String: { htmlSafe } } = Ember;

/**
 * @class PaperSidenavContainer
 * @extends Ember.Component
 */
const PaperComponent = Component.extend({
  classNames: ['flex', 'layout-row'],
  attributeBindings: ['style'],
  style: htmlSafe('overflow: hidden')
});

PaperComponent[NAME_KEY] = 'paper-sidenav-container';

export default PaperComponent;
