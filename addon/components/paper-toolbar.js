/**
 * @module ember-paper
 */
import Component from '@ember/component';

import layout from '../templates/components/paper-toolbar';
import ColorMixin from 'ember-paper/mixins/color-mixin';

/**
 * @class PaperToolbar
 * @extends Ember.Component
 * @uses ColorMixin
 */
export default Component.extend(ColorMixin, {
  layout,
  tagName: 'md-toolbar',
  classNames: ['md-default-theme'],
  tall: false,
  classNameBindings: ['tall:md-tall']
});
