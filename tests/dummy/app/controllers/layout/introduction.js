import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  @tracked box1Height = 20;
  @tracked direction = 'row';
  @tracked hideBox = true;
}
