import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

export default Router.map(function() {
  this.route('introduction');
  this.route('button');
  this.route('card');
  this.route('checkbox');
  this.route('radio');
  this.route('switch');
  this.route('typography');
  this.route('list');
  this.route('divider');
  this.route('sidenav');
  this.route('textfield');
  this.route('toolbar');
  this.route('icons');
  this.route('slider');
});
