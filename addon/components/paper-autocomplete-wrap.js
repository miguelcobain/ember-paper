import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'md-autocomplete-wrap',
  classBindings: ['notFloating:md-whiteframe-z1', 'notHidden:md-menu-showing'],
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
  },

  didInsertElement () {
    var ul = this.$().find('ul');
    ul.appendTo('body');
    this.get('parent').set('ulContainer', ul);
  },
  didDestroyElement () {
    this.get('parent').get('ulContainer').remove();
  }

});
