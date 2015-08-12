import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  attributeBindings: ['layoutAttr:layout', 'flex'],
  layoutAttr: 'row',
  sideBar: null

});
