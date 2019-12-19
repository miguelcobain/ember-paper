import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

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
  });

  this.route('layout', function() {
    this.route('introduction');
    this.route('layout-containers');
    this.route('layout-children');
    this.route('child-alignment');
  });
});
