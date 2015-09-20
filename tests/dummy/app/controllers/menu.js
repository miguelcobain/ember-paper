import Ember from 'ember';

export default Ember.Controller.extend({

  options: Ember.A([1,2,3,4,5]),

  items: Ember.A([
    {
      icon: 'access-alarms',
      title: 'Alarm',
      isFirst: true
    },
    {
      icon: 'airplay',
      title: 'Airplay'
    },

    {
      icon: 'airplanemode-active',
      title: 'Airplane mode'
    }
  ]),


  actions: {
    openSomething: function () {
      alert("Some action handler.");
    }
  }
});
