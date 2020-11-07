import Controller from '@ember/controller';
import { htmlSafe } from '@ember/string';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  @tracked red = Math.floor(Math.random() * 255);
  @tracked green =  Math.floor(Math.random() * 255);
  @tracked blue =  Math.floor(Math.random() * 255);

  rating1 = 3;
  rating2 = 2;
  rating3 = 4;

  disabled1 = 22;
  disabled2 = 70;

  descreteDisabled1 = 2;
  discreteDisabled2 = 6;

  isSliderDisabled = true;

  get colorStyle() {
    return htmlSafe(`border: 1px solid #333; background: rgb(${this.red}, ${this.green}, ${this.blue})`);
  }
}
