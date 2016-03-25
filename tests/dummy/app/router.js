import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('introduction');

  this.route('autocomplete');
  this.route('button');
  this.route('card');
  this.route('checkbox');
  this.route('dialog');
  this.route('divider');
  this.route('grid-list');
  this.route('icons');
  this.route('input');
  this.route('list');
  this.route('list-controls');
  this.route('menu');
  this.route('progress-circular');
  this.route('progress-linear');
  this.route('radio');
  this.route('paper-select');
  this.route('sidenav');
  this.route('slider');
  this.route('switch');
  this.route('tabs');
  this.route('toolbar');
  this.route('typography');
});

export default Router;
