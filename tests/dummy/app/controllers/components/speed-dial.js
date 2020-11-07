import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  animation = 'fling';
  direction = 'down';

  @action
  toggle(propName) {
    this.toggleProperty(propName);
  }
}
