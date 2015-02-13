import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-icon',
  classNames: ['paper-icon'],
  classNameBindings: ['iconClass'],
  iconClass: function(){
    return 'ic-'+this.get('icon');
  }.property('icon')
});
