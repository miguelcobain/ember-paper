/**
 * @module ember-paper
 */
import Component from 'ember-component';
import layout from '../templates/components/paper-prev-button';

/**
 * @class PaperPrevButton
 * @extends Component
 */
export default Component.extend({

  tagName: 'md-prev-button',

  layout,

  classNameBindings: [
    'disabled:md-disabled'
  ]

});
