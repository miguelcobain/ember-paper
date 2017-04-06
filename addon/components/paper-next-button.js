/**
 * @module ember-paper
 */
import Component from 'ember-component';
import layout from '../templates/components/paper-next-button';

/**
 * @class PaperNextButton
 * @extends Component
 */
export default Component.extend({

  tagName: 'md-next-button',

  layout,

  classNameBindings: [
    'disabled:md-disabled'
  ]

});
