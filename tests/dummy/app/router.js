import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('introduction');
  this.route('typography');
  this.route('theme');
  this.route('cookbook');

  this.route('demo', { path: 'components' }, function() {
    this.route('autocomplete');
    this.route('button');
    this.route('card');
    this.route('checkbox');
    this.route('dialog');
    this.route('divider');
    this.route('grid-list');
    this.route('icons', { path: 'icon' });
    this.route('input');
    this.route('list');
    this.route('list-controls');
    this.route('menu');
    this.route('progress-circular');
    this.route('progress-linear');
    this.route('radio');
    this.route('select');
    this.route('sidenav');
    this.route('slider');
    this.route('switch');
    this.route('toolbar');
    this.route('tabs');
  });

  this.route('layout', function() {
    this.route('introduction');
    this.route('layout-containers');
    this.route('layout-children');
    this.route('child-alignment');
  });
});

export default Router;
