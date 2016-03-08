import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  attributeBindings: ['containerStyles:style'],

  containerStyles: Ember.computed(function() {
    return new Ember.Handlebars.SafeString('position: relative;');
  }),

  actions: {
    onCancel() {
      this.get('dialogIsShowing').sendAction('onCancel');
    }
  }
});
