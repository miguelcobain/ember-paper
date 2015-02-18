import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-icon',
  classNames: ['paper-icon'],
  classNameBindings: ['iconClass'],

  spin: false,
  reverseSpin: false,

  iconClass: function(){
    var iconClasses = 'ic-'+this.get('icon');

    if(this.get('spin')){
      iconClasses +=' md-spin';
    } else if (this.get('reverseSpin')){
      iconClasses +=' md-spin-reverse';
    }

    switch(this.get('size')){
      case 'lg':
        iconClasses += ' md-lg';
        break;
      case 2:
        iconClasses += ' md-2x';
        break;
      case 3:
        iconClasses += ' md-3x';
        break;
      case 4:
        iconClasses += ' md-4x';
        break;
      case 5:
        iconClasses += ' md-5x';
        break;
    }

    return iconClasses;
  }.property('icon')
});
