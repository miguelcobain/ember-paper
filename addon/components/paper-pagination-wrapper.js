import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'md-pagination-wrapper',

  // inherited
  tabs: computed.reads('parent.tabs'),
  centerTabs: computed.reads('parent.centerTabs'),

  classNameBindings: ['centerTabs:md-center-tabs'],
  attributeBindings: ['styleAttr:style'],
  styleAttr: computed('widthStyle', function() {
    return this.get('widthStyle');
  }),

  widthStyle: computed('width', function() {
    if (this.get('shouldStrechTabs')) {
      return '';
    } else {
      return (this.get('width')) ? this.get('width') + 'px;' : '0px';
    }
  }),

  shouldStrechTabs: false, // todo: implement computed property

  width: computed('tabs.[].id', 'shouldStrechTabs', function(){
    var context = this;
    var width = 1;
    this.get('tabs').forEach(function(tab){
      if (tab.id) {
        var element = document.getElementById(tab.id);
        width += Math.max(element.offsetWidth, element.getBoundingClientRect().width);
      }
    });
    return Math.ceil(width);
  })
});
