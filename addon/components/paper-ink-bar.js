/**
 * @module ember-paper
 */
import Component from 'ember-component';
import computed from 'ember-computed';
import { htmlSafe } from 'ember-string';
import layout from '../templates/components/paper-ink-bar';

/**
 * @class PaperInkBar
 * @extends Component
 */
export default Component.extend({

  tagName: 'md-ink-bar',

  layout,

  classNameBindings: ['barClass'],

  attributeBindings: ['barStyle:style'],

  barClass: computed('direction', function() {
    let direction = this.get('direction');
    if (direction) {
      return `md-${direction}`;
    }
  }),

  barStyle: computed('leftPosition', 'rightPosition', function() {
    let left = parseInt(this.get('leftPosition'));
    let right = parseInt(this.get('rightPosition'));
    return htmlSafe(`left:${left}px;right:${right}px;`);
  })

});
