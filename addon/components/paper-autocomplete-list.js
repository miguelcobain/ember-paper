import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['md-default-theme', 'md-autocomplete-suggestions', 'md-whiteframe-z1'],
  attributeNameBindings: ['role'],
  role: 'presentation',

  mouseEnter () {
    this.get('parent').set('noBlur', true);
  },
  mouseLeave () {
    this.get('parent').set('noBlur', false);
  },
  mouseUp () {
    this.get('parent').$().find('input').focus();
  },

  didInsertElement () {
    var ul = this.$();
    ul.appendTo('body');
    this.get('parent').set('ulContainer', this);
  }
});
