import Controller from '@ember/controller';
import { action, set } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class DemoTooltipController extends Controller {
  @tracked position = 'bottom';
  @tracked showSourceCode = false;

  @action
  toggle(propName) {
    set(this, propName, !this[propName]);
  }
}
