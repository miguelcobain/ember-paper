import Ember from 'ember';
import ColorMixin from 'ember-paper/mixins/color-mixin';

let PaperIconComponent = Ember.Component.extend(ColorMixin, {
  tagName: 'md-icon',
  classNames: ['paper-icon', 'md-font', 'material-icons', 'md-default-theme'],
  classNameBindings: ['sizeClass', 'spinClass'],
  attributeBindings: ['aria-label', 'title'],

  icon: '',
  spin: false,
  reverseSpin: false,

  iconClass: Ember.computed('icon', 'positionalIcon', function() {
    let icon = this.getWithDefault('positionalIcon', this.get('icon'));
    return icon;
  }),

  'aria-label': Ember.computed.reads('iconClass'),

  spinClass: Ember.computed('spin', 'reverseSpin', function() {
    if (this.get('spin')) {
      return 'md-spin';
    } else if (this.get('reverseSpin')) {
      return 'md-spin-reverse';
    }
  }),

  sizeClass: Ember.computed('size', function() {
    let size = this.get('size');
    if (size) {
      return `md-icon-size-${size}`;
    }
  })
});

PaperIconComponent.reopenClass({
  positionalParams: ['positionalIcon']
});

export default PaperIconComponent;
