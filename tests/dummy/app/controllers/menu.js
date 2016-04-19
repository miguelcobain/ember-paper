import Ember from 'ember';

export default Ember.Controller.extend({

  options: Ember.A([1,2,3,4,5]),

  items: Ember.A([
    {
      icon: 'access_alarms',
      title: 'Alarm',
      isFirst: true
    },
    {
      icon: 'airplay',
      title: 'Airplay'
    },

    {
      icon: 'airplanemode_active',
      title: 'Airplane mode'
    }
  ]),

  actions: {
    openSomething() {
      alert('Some action handler.');
    }
  }
});
