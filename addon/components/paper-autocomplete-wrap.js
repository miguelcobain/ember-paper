import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-autocomplete-wrap',
  classNameBindings: ['notFloating:md-whiteframe-z1', 'notHidden:md-menu-showing'],
  attributeBindings: ['role', 'layoutAttr:layout'],
  role: 'listbox',
  layoutAttr: 'row',


  notFloating: Ember.computed.not('parent.floatingLabel'),
  notHidden: Ember.computed.not('parent.hidden'),

  actions: {
    clear: function () {
      this.get('parent').set('model', null);
      this.get("parent").set('searchText', '');
    },

    pickItem: function (item) {
      this.set('model', item);
    }
  }

});
