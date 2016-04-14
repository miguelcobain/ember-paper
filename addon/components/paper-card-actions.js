import Ember from 'ember';
import FlexMixin from '../mixins/flex-mixin';

const { Component, computed, String: Str } = Ember;

export default Component.extend({
  tagName: '',

  layout: 'row',
  layoutAlign: 'end center',

  layoutAlignClassName: computed('layoutAlign', function() {
    return Str.dasherize(this.get('layoutAlign'));
  })
});
