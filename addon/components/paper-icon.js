import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-icon',
  classNames: ['paper-icon'],
  classNameBindings: ['iconClass', 'sizeClass', 'spinClass'],

  spin: false,
  reverseSpin: false,

  iconClass: function(){
    return 'ic-'+this.get('icon');
  }.property('icon'),

  spinClass: function(){
    if(this.get('spin')){
      return ' md-spin';
    } else if (this.get('reverseSpin')){
      return ' md-spin-reverse';
    }
  }.property('spin','reverseSpin'),

  sizeClass : function(){
    switch(this.get('size')){
      case 'lg':
        return ' md-lg';
      case 2:
        return ' md-2x';
      case 3:
        return ' md-3x';
      case 4:
        return ' md-4x';
      case 5:
        return ' md-5x';
    }
  }.property('size')
});
