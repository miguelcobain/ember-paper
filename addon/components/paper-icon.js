import Ember from 'ember';
import ColorMixin from 'ember-paper/mixins/color-mixin';

export default Ember.Component.extend(ColorMixin, {
  tagName: 'md-icon',
  classNames: ['paper-icon', 'md-font', 'material-icons', 'md-default-theme'],
  classNameBindings: ['iconClass', 'sizeClass', 'spinClass'],

  icon: '',
  spin: false,
  reverseSpin: false,

  iconClass: Ember.computed('icon', function() {
    return Ember.String.dasherize(this.get('icon'));
  }),

  spinClass: Ember.computed('spin', 'reverseSpin', function() {
    if (this.get('spin')) {
      return ' md-spin';
    } else if (this.get('reverseSpin')) {
      return ' md-spin-reverse';
    }
  }),

  sizeClass : Ember.computed('size', function() {
    switch(this.get('size')) {
      case 'lg':
        return ' md-lg';
      case 'sm':
        return ' md-sm';
      case 2:
        return ' md-2x';
      case 3:
        return ' md-3x';
      case 4:
        return ' md-4x';
      case 5:
        return ' md-5x';
    }
  }),

  /*click() {
    if (this.get('action')) {
      this.sendAction('action', this.get('param'));
    }
  }*/
});
