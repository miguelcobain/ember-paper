/**
 * @module ember-paper
 */
import Component from 'ember-component';
import computed from 'ember-computed';
import layout from '../templates/components/paper-tabs-canvas';

/**
 * @class PaperTabsCanvas
 * @extends Component
 */
export default Component.extend({

  tagName: 'md-tabs-canvas',

  layout,

  /* Inherited from {{paper-tabs-wrapper}} */
  shouldPaginate: computed.readOnly('parentComponent.shouldPaginate'),
  shouldCenterTabs: computed.readOnly('parentComponent.shouldCenterTabs'),

  classNameBindings: [
    'shouldPaginate:md-paginated',
    'shouldCenterTabs:md-center-tabs'
  ]

});
