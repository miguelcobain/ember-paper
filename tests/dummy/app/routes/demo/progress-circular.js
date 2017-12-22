import Route from '@ember/routing/route';
import { on } from '@ember/object/evented';

export default Route.extend({

  onActivate: on('activate', function() {
    this.controllerFor('demo.progress-circular').start();
  }),

  onDeactivate: on('deactivate', function() {
    this.controllerFor('demo.progress-circular').stop();
  })

});
