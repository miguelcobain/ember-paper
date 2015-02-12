export function initialize(container, application) {
  var customEvents = application.get('customEvents') || {};
  Ember.String.w('toggle expand collapse').forEach(function (prefix) {
    var name = Ember.String.fmt("%@Sidenav", prefix);
    customEvents[name] = name;
  });
  application.set('customEvents', customEvents);
}

export default {
  name: 'events',
  initialize: initialize
};
