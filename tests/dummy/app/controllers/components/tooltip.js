import Controller from '@ember/controller';
import { action } from '@ember/object';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  @tracked position = 'bottom';

  @action
  toggle(propName) {
    this.toggleProperty(propName);
  }
}
