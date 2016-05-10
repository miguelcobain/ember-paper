import Ember from 'ember';
import ColorMixin from 'ember-paper/mixins/color-mixin';

const { Component, computed, String: Str } = Ember;

let PaperIconComponent = Component.extend(ColorMixin, {
  tagName: 'md-icon',
  classNames: ['paper-icon', 'md-font', 'material-icons', 'md-default-theme'],
  classNameBindings: ['spinClass'],
  attributeBindings: ['aria-label', 'title', 'sizeStyle:style'],

  icon: '',
  spin: false,
  reverseSpin: false,

  iconClass: computed('icon', 'positionalIcon', function() {
    let icon = this.getWithDefault('positionalIcon', this.get('icon'));
    return icon;
  }),

  'aria-label': computed.reads('iconClass'),

  spinClass: computed('spin', 'reverseSpin', function() {
    if (this.get('spin')) {
      return 'md-spin';
    } else if (this.get('reverseSpin')) {
      return 'md-spin-reverse';
    }
  }),

  sizeStyle: computed('size', function() {
    let size = this.get('size');

    if (size) {
      return Str.htmlSafe(`height: ${size}px; font-size: ${size}px;`);
    }
  })
});

PaperIconComponent.reopenClass({
  positionalParams: ['positionalIcon']
});

export default PaperIconComponent;
