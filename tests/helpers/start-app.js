import Ember from 'ember';
import Application from '../../app';
import config from '../../config/environment';

export default function startApp(attrs) {
  let application;

  // use defaults, but you can override.
  // Use assign, if available. TODO: Delete if/when ember-paper requires ember-2.5 or higher.
  // jshint laxbreak: true
  let attributes = Ember.assign
                      ? Ember.assign({}, config.APP, attrs)
                      : Ember.merge(Ember.merge({}, config.APP), attrs);

  Ember.run(() => {
    application = Application.create(attributes);
    application.setupForTesting();
    application.injectTestHelpers();
  });

  return application;
}
