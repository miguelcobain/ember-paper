import Ember from 'ember';
import config from './config/environment';

var Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('introduction');
  this.route('autocomplete');
  this.route('button');
  this.route('card');
  this.route('checkbox');
  this.route('progress-circular');
  this.route('progress-linear');
  this.route('radio');
  this.route('switch');
  this.route('typography');
  this.route('list');
  this.route('list-controls');
  this.route('divider');
  this.route('sidenav');
  this.route('input');
  this.route('toolbar');
  this.route('icons');
  this.route('slider');
  this.route('paper-select');
  this.route('menu');
  this.route('grid-list');
  this.route('fab-speed-dial');
});

export default Router;
