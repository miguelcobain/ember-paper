/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-icon';
import ColorMixin from 'ember-paper/mixins/color-mixin';

const { Component, computed, String: Str } = Ember;

/**
 * @class PaperIcon
 * @extends Ember.Component
 * @uses ColorMixin
 */
let PaperIconComponent = Component.extend(ColorMixin, {
  layout,
  tagName: 'md-icon',
  classNameBindings: ['spinClass'],
  classNames: ['paper-icon', 'md-font', 'material-icons', 'md-default-theme'],
  attributeBindings: ['aria-label', 'title', 'iconStyle:style', 'iconClass:md-font-icon'],

  icon: '',
  spin: false,
  reverseSpin: false,

  'aria-label': computed.reads('iconClass'),

  iconClass: computed('icon', 'positionalIcon', function() {
    let icon = this.getWithDefault('positionalIcon', this.get('icon'));
    return icon;
  }),

  spinClass: computed('spin', 'reverseSpin', function() {
    if (this.get('spin')) {
      return 'md-spin';
    } else if (this.get('reverseSpin')) {
      return 'md-spin-reverse';
    }
  }),

  iconStyle: computed('size', 'color', function() {
    let style = '';
    let size = this.get('size');
    let color = this.get('color');

    if (color) {
      style += `color: ${color};`;
    }

    if (size) {
      style += `height: ${size}px; min-height: ${size}px; min-width: ${size}px; font-size: ${size}px; line-height: ${size}px;`
    }

    if (style) {
      return Str.htmlSafe(style);
    }
  })
});

PaperIconComponent.reopenClass({
  positionalParams: ['positionalIcon']
});

export default PaperIconComponent;
