import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';
import { run } from '@ember/runloop';

export default class extends Controller {
  @tracked mode = 'query';
  @tracked determinateValue = 0;
  @tracked determinateValue2 = 0;
  @tracked timer = null;
  @tracked timer2 = null;
  @tracked sliderDiameter = 100;
  @tracked sliderValue = null;
  @tracked isIndeterminate = true;
  @tracked strokeRatio = 0.1;

  start() {
    this.determinateValue = 30;
    this.determinateValue = 30;
    this.setupTimer();
    this.setupTimer2();
  }

  setupTimer() {
    this.timer = run.later(this, function() {
      this.determinateValue += 1;
      this.determinateValue2 += 1.5;
      if (this.determinateValue > 100) {
        this.determinateValue = 30;
        this.determinateValue2 = 30;
      }
      this.setupTimer();
    }, 100);
  }

  setupTimer2() {
    this.timer2 = run.later(this, function() {
      this.mode = this.mode === 'query' ? 'determinate' : 'query';
      this.determinateValue = 30;
      this.determinateValue2 = 30;
      run.later(this, this.setupTimer2);
    }, 7200);
  }

  stop() {
    run.cancel(this.timer);
    run.cancel(this.timer2);
  }

  @action
  setValue(v) {
    this.isIndeterminate = false;
    this.sliderValue = v;
  }

  @action
  setIndeterminate(value) {
    if (value) {
      this.isIndeterminate = true;
      this.sliderValue = null;
    } else {
      this.isIndeterminate = false;
      this.sliderValue = 50;
    }
  }
}
