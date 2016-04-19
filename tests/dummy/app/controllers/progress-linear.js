import Ember from 'ember';

export default Ember.Controller.extend({

  mode: 'query',
  determinateValue: 30,
  determinateValue2: 30,

  init() {
    this.setupTimer();
    this.setupTimer2();
  },

  setupTimer() {
    Ember.run.later(this, function() {
      this.incrementProperty('determinateValue', 1);
      this.incrementProperty('determinateValue2', 1.5);
      if (this.get('determinateValue') > 100) {
        this.set('determinateValue', 30);
        this.set('determinateValue2', 30);
      }

      Ember.run.later(this, this.setupTimer);

    }, 100);
  },

  setupTimer2() {
    Ember.run.later(this, function() {
      this.set('mode', this.get('mode') === 'query' ? 'determinate' : 'query');
      Ember.run.later(this, this.setupTimer2);
    }, 7200);
  }

});
