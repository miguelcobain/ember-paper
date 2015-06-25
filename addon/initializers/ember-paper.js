import EventBus from '../services/paper-eventbus';

export function initialize(container, application) {
  var eventBus = EventBus.create();
  application.register('paper-event-bus:current', eventBus, {
    instantiate: false
  });

  application.inject('component', 'paper-eventbus', 'paper-event-bus:current');
}
export default {
  name: 'ember-paper',
  initialize: initialize
};
