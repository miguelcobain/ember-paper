import Ember from 'ember';
import AnimateMixin from 'ember-paper/mixins/animate-mixin';

export default Ember.Component.extend(AnimateMixin, {
  tagName: 'md-toast',
  classNames: ['md-default-theme'],
  classNameBindings: ['right:md-right', 'left:md-left', 'bottom:md-bottom', 'top:md-top'],
  animated: true,

  didInsertElement () {
    if (this.get('hide-delay')) {
      Ember.run.later(function () {
        this.sendAction('on-close');
      }.bind(this), this.get('hide-delay'));
    }
  },

  actions: {
    buttonAction: function () {
      this.sendAction('on-button');
    }
  }

});
