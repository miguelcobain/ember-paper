import Controller from '@ember/controller';
import { run } from '@ember/runloop';

export default Controller.extend({

  mode: 'query',
  determinateValue: 0,
  determinateValue2: 0,
  timer: null,
  timer2: null,

  start() {
    this.set('determinateValue', 30);
    this.set('determinateValue2', 30);
    this.setupTimer();
    this.setupTimer2();
  },

  setupTimer() {
    this.set('timer', run.later(this, function() {
      let value = this.incrementProperty('determinateValue', 1);
      this.incrementProperty('determinateValue2', 1.5);
      if (value > 100) {
        this.set('determinateValue', 30);
        this.set('determinateValue2', 30);
      }

      this.setupTimer();

    }, 100));
  },

  setupTimer2() {
    this.set('timer2', run.later(this, function() {
      this.set('mode', this.get('mode') === 'query' ? 'determinate' : 'query');
      this.set('determinateValue', 30);
      this.set('determinateValue2', 30);
      run.later(this, this.setupTimer2);
    }, 7200));
  },

  stop() {
    run.cancel(this.get('timer'));
    run.cancel(this.get('timer2'));
  }

});
