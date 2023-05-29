/* eslint-disable ember/no-actions-hash */
import Controller from '@ember/controller';
import { later, cancel } from '@ember/runloop';

export default Controller.extend({
  mode: 'query',
  determinateValue: 0,
  timer: null,

  start() {
    this.set('determinateValue', 30);
    this.setupTimer();
  },

  setupTimer() {
    this.set('timer', later(this, function() {
      let value = this.incrementProperty('determinateValue', 1);
      if (value > 100) {
        this.set('determinateValue', 30);
      }
      this.setupTimer();
    }, 100));
  },

  stop() {
    cancel(this.timer);
  },

  sliderDiameter: 100,
  sliderValue: null,
  isIndeterminate: true,
  strokeRatio: 0.1,

  actions: {
    setValue(v) {
      this.set('isIndeterminate', false);
      this.set('sliderValue', v);
    },

    setIndeterminate(value) {
      if (value) {
        this.set('isIndeterminate', true);
        this.set('sliderValue', null);
      } else {
        this.set('isIndeterminate', false);
        this.set('sliderValue', 50);
      }
    }
  }

});
