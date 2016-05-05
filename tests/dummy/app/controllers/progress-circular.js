import Ember from 'ember';
const { Controller, run } = Ember;

export default Controller.extend({
  mode: 'query',
  determinateValue: 0,
  timer: null,

  start() {
    this.set('determinateValue', 30);
    this.setupTimer();
  },

  setupTimer() {
    this.set('timer', run.later(this, function() {
      let value = this.incrementProperty('determinateValue', 1);
      if (value > 100) {
        this.set('determinateValue', 30);
      }
      this.setupTimer();
    }, 100));
  },

  stop() {
    run.cancel(this.get('timer'));
  }

});
