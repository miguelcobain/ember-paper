import Route from '@ember/routing/route';
import { on } from '@ember/object/evented';

export default Route.extend({

  onActivate: on('activate', function() {
    this.controllerFor('demo.progress-linear').start();
  }),

  onDeactivate: on('deactivate', function() {
    this.controllerFor('demo.progress-linear').stop();
  })

});
