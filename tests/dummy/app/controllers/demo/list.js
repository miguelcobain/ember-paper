import Ember from 'ember';

const { Controller, computed } = Ember;

export default Controller.extend({
  names: [
    'Marina Augustine',
    'Oddr Sarno',
    'Nick Giannopoulos'
  ],

  listData: computed.map('names', function(c, index) {
    let [firstName, lastName] = c.split(' ');
    return {
      name: c,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.com`,
      img: `http://lorempixel.com/50/50/people?${index}`
    };
  }),

  phoneNumbers: [
    {
      number: '(555) 251-1234',
      type: 'Home'
    },
    {
      number: '(555) 786-9841',
      type: 'Mobile'
    },
    {
      number: '(555) 314-1592',
      type: 'Office'
    }
  ]

});
