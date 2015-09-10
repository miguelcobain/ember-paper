import Ember from 'ember';

export default Ember.Component.extend({
  attributeBindings: ['containerStyles:style'],

  containerStyles: Ember.computed(function () {
    return new Ember.Handlebars.SafeString('position: relative;');
  }),

  actions: {
    onCancel() {
      this.get('dialogIsShowing').sendAction('on-cancel');
    }
  }
});
