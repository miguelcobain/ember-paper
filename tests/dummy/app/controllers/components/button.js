import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class extends Controller {
  @action
  click() {
    alert('You pressed a target button.');
  }
}
