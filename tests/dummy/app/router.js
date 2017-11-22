import Ember from 'ember';
import config from './config/environment';

const { Router: ERouter } = Ember;

const Router = ERouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('introduction');
  this.route('forms');
  this.route('typography');
  this.route('theme');
  this.route('cookbook');
  this.route('addons');

  this.route('demo', { path: 'components' }, function() {
    this.route('autocomplete');
    this.route('button');
    this.route('card');
    this.route('checkbox');
    this.route('chips');
    this.route('dialog');
    this.route('divider');
    this.route('grid-list');
    this.route('icons', { path: 'icon' });
    this.route('input');
    this.route('list');
    this.route('menu');
    this.route('tabs', function() {
      this.route('nested-route');
    });
    this.route('progress-circular');
    this.route('progress-linear');
    this.route('radio');
    this.route('select');
    this.route('sidenav');
    this.route('slider');
    this.route('speed-dial');
    this.route('switch');
    this.route('toast');
    this.route('toolbar');
    this.route('tooltip');
    this.route('virtual-repeat');
  });

  this.route('layout', function() {
    this.route('introduction');
    this.route('layout-containers');
    this.route('layout-children');
    this.route('child-alignment');
  });
});

export default Router;
