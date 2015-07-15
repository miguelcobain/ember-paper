import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['md-default-theme', 'md-autocomplete-suggestions', 'md-whiteframe-z1'],
  attributeNameBindings: ['role'],
  role: 'presentation',

  mouseEnter (event) {
    this.get('parent').set('noBlur', true);
  },
  mouseLeave (event) {
    this.get('parent').set('noBlur', false);
  },
  mouseUp (event) {
    this.get('parent').get('inputContainer').$().focus();
  },

  didInsertElement () {
    var ul = this.$();
    ul.appendTo('body');
    this.get('parent').set('ulContainer', this);
  }
});
