import Ember from 'ember';

export default Ember.Component.extend({
  tagName: '',

  left: Ember.computed.equal('direction', 'left'),
  right: Ember.computed.equal('direction', 'right'),

  style: Ember.computed('leftValue', 'rightValue', function(){
    var left = parseInt(this.get('leftValue'));
    var right = parseInt(this.get('rightValue'));
    return "left: " + left + "px; right: " + right + "px;"
  })
});
