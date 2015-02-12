import Ember from 'ember';

export default Ember.Component.extend({
  tagName:'md-content',
  classNames:['md-content'],
  attributeBindings:['flexAttr:flex','flex-layout:layout'],
  /*
   * Not binding boolean values in Ember 1.8.1?
   * https://github.com/emberjs/ember.js/issues/9595
   */
  flexAttr:function(){
    return this.get('flex') ? 'flex' : null;
  }.property('flex')
});
