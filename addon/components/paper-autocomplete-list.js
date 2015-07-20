import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'ul',
  classNames: ['md-default-theme', 'md-autocomplete-suggestions', 'md-whiteframe-z1'],
  attributeNameBindings: ['role'],
  role: 'presentation',

  mouseEnter () {
    this.get('target').set('noBlur', true);
  },
  mouseLeave () {
    this.get('target').set('noBlur', false);
    if (this.get('hasFocus') === false) {
      this.get('target').set('hidden', true);
    }
  },
  mouseUp () {
    this.get('target').$().find('input').focus();
  },

  didInsertElement () {
    var ul = this.$();
    ul.appendTo('body');
    this.get('target').set('ulContainer', this);
  }
});
