/**
 * @module ember-paper
 */
import Component from 'ember-component';
import computed from 'ember-computed';
import { ChildMixin } from 'ember-composability-tools';
import layout from '../templates/components/paper-tabs-wrapper';

/**
 * @class PaperTabsWrapper
 * @extends Component
 * @uses ChildMixin
 */
export default Component.extend(ChildMixin, {

  tagName: 'md-tabs-wrapper',

  layout,

  classNameBindings: [
    'shouldStretchTabs:md-stretch-tabs'
  ],

  /* Inherited from {{paper-tabs}} */
  shouldStretchTabs: computed.readOnly('parentComponent.shouldStretchTabs'),
  shouldPaginate: computed.readOnly('parentComponent.shouldPaginate'),
  shouldCenterTabs: computed.readOnly('parentComponent.shouldCenterTabs'),
  canPageBack: computed.readOnly('parentComponent.canPageBack'),
  canPageForward: computed.readOnly('parentComponent.canPageForward'),

  actions: {
    nextPage() {
      if (this.get('canPageForward')) {
        this.get('parentComponent').send('nextPage');
      }
    },
    previousPage() {
      if (this.get('canPageBack')) {
        this.get('parentComponent').send('previousPage');
      }
    }
  }
});
