import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  toggle(propName) {
    this.toggleProperty(propName);
  }
}
