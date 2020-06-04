import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function() {
  this.route('components', function() {
    this.route('autocomplete');
    this.route('button');
    this.route('card');
    this.route('checkbox');
    this.route('chips');
    this.route('dialog');
    this.route('divider');
    this.route('forms');
    this.route('grid-list');
    this.route('icon');
    this.route('input');
    this.route('list');
    this.route('menu');
    this.route('tabs', function() {
      this.route('nested-route');
    });
    this.route('loading');
    this.route('toggles');
    this.route('select');
    this.route('sidenav');
    this.route('slider');
    this.route('speed-dial');
    this.route('toast');
    this.route('toolbar');
    this.route('tooltip');
  });
  this.route('layout');
  this.route('theme');
  this.route('addons');
});
