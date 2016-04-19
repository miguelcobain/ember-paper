import Ember from 'ember';

const { Component, computed } = Ember;

export default Component.extend({
  tagName: 'span',
  classNameBindings: ['mdType'],

  type: '',

  mdType: computed('type', function() {
    let type = this.get('type');
    return type.length ? `md-${type}` : '';
  })
});
