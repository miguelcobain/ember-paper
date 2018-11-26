import Controller from '@ember/controller';
import { computed } from '@ember/object';
import { htmlSafe } from '@ember/string';

let color = {
  red: Math.floor(Math.random() * 255),
  green: Math.floor(Math.random() * 255),
  blue: Math.floor(Math.random() * 255)
};

export default Controller.extend({
  color,

  colorStyle: computed('color.{red,green,blue}', function() {
    return htmlSafe(`border: 1px solid #333; background: rgb(${this.get('color.red')}, ${this.get('color.green')}, ${this.get('color.blue')})`);
  }),

  rating1: 3,
  rating2: 2,
  rating3: 4,

  disabled1: 22,
  disabled2: 70,

  descreteDisabled1: 2,
  discreteDisabled2: 6,

  isSliderDisabled: true
});
