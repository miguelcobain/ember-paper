import Ember from 'ember';

export default Ember.Controller.extend({
  color: {
    red: Math.floor(Math.random() * 255),
    green: Math.floor(Math.random() * 255),
    blue: Math.floor(Math.random() * 255)
  },

  colorStyle: Ember.computed('color.red', 'color.green', 'color.blue', function() {
    return Ember.String.htmlSafe(`border: 1px solid #333; background: rgb(${this.get('color.red')}, ${this.get('color.green')}, ${this.get('color.blue')})`);
  }),

  rating1: 3,
  rating2: 2,
  rating3: 4,

  disabled1: 0,
  disabled2: 70
});
