import Controller from '@ember/controller';
import { computed } from '@ember/object';
import RSVP from 'rsvp';
import { A } from '@ember/array';
import { run } from '@ember/runloop';

export default Controller.extend({

  states: computed(function() {
    return A('AL AK AZ AR CA CO CT DE FL GA HI ID IL IN IA KS KY LA ME MD MA MI MN MS MO MT NE NV NH NJ NM NY NC ND OH OK OR PA RI SC SD TN TX UT VT VA WA WV WI WY'
      .split(' ').map((state) => ({ abbrev: state })));
  }),

  userState: computed(function() {
    return this.get('states').objectAt(4);
  }),

  sizes: A([
    'small (12-inch)',
    'medium (14-inch)',
    'large (16-inch)',
    'insane (42-inch)'
  ]),

  vegetables: A([
    { name: 'Corn', checked: false },
    { name: 'Onions', checked: false },
    { name: 'Kale', checked: false },
    { name: 'Arugula', checked: false },
    { name: 'Peas', checked: false },
    { name: 'Zucchini', checked: false }
  ]),
  /*
   * Fake promise to fetch data, here you would use ember-data, jQuery.ajax or whatever you want.
   */
  users: computed(function() {
    return new RSVP.Promise((resolve) => {
      // Just wait for 800ms to 2 seconds for a fake progress, so it feels like a query.
      let waitMS = Math.floor(Math.random() * 2000) + 800;

      let dataFromServer = A([
        { id: 1, name: 'Scooby Doo' },
        { id: 2, name: 'Shaggy Rodgers' },
        { id: 3, name: 'Fred Jones' },
        { id: 4, name: 'Daphne Blake' },
        { id: 5, name: 'Velma Dinkley' }
      ]);

      run.later(() => {
        /*
         * Two arguments to the resolve:
         * - data from the server
         * - callback to be able to get the 'label'.
         */
        resolve(dataFromServer);
      }, waitMS);

    });
  }),
  groupedToppings: Object.freeze([
    { groupName: 'Meats', options: ['Pepperoni', 'Sausage', 'Ground Beef', 'Bacon'] },
    { groupName: 'Veg', options: ['Mushrooms', 'Onion', 'Green Pepper', 'Green Olives'] }
  ])
});
