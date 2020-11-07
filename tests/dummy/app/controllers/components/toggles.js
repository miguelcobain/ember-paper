import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';

export default class extends Controller {
  selectedFruit = 'Apple';
  selectedGraphic = 'graphic-1';
  booleanProp1 = true;
  booleanProp2 = false;
  booleanProp3 = false;
  booleanProp4 = false;
  booleanProp5 = false;
  value1 = true;
  value2 = false;
  value3 = false;
  value4 = false;
  value5 = false;
  value6 = false;

  @tracked
  value7;

  get isIndeterminate() {
    return this.value7 === undefined;
  }

  @action
  toggleValue6() {
    this.value6 = !this.value6;
  }

  @action
  changeBooleanProp(which, newValue) {
    this.set(`booleanProp${which}`, newValue);
  }
}
