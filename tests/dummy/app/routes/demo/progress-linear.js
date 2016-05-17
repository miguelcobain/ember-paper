import Ember from 'ember';

const { Route, on } = Ember;

export default Route.extend({

  onActivate: on('activate', function() {
    this.controllerFor('demo.progress-linear').start();
  }),

  onDeactivate: on('deactivate', function() {
    this.controllerFor('demo.progress-linear').stop();
  })

});
