import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('introduction');
  this.route('button');
  this.route('checkbox');
  this.route('radio');
  this.route('switch');
  this.route('typography');
  this.route('list');
  this.route('divider');
  this.route('navigation');
  this.route('textfield');
  this.route('toolbar');
  this.route('icons');
});

export default Router;
