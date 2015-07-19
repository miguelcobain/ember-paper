import Ember from 'ember';

export default Ember.Controller.extend({
  mode: 'query',
  determinateValue: 30,

  init: function () {
    this.setupTimer();
  },

  setupTimer: function() {
    Ember.run.later(this, function() {
      this.incrementProperty('determinateValue', 1);
      if (this.get('determinateValue') > 100) {
        this.set('determinateValue', 30);
      }

      Ember.run.later(this, this.setupTimer);

    }, 100);
  }
});
