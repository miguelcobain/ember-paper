/**
 * @module ember-paper
 */
import Component from 'ember-component';
import computed from 'ember-computed';
import run from 'ember-runloop';
import layout from '../templates/components/paper-tab-content';

/**
 * @class PaperTabContent
 * @extends Component
 */
export default Component.extend({

  tagName: 'md-tab-content',

  layout,

  classNameBindings: [
    'isActive:md-active',
    'isLeft:md-left',
    'isRight:md-right'
  ],

  /* Inherited from `{{paper-tab}}` */
  isActive: computed.readOnly('parentComponent.isActive'),
  isLeft: computed.readOnly('parentComponent.isLeft'),
  isRight: computed.readOnly('parentComponent.isRight'),

  // necessary for paper-tabs to know when the tab's content is actually rendered
  didInsertElement() {
    this._super(...arguments);
    run.schedule('afterRender', this, function() {
      this.get('parentComponent').trigger('onRendered');
    });
  }

});
