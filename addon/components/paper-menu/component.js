/* eslint-disable ember/no-classic-components, ember/no-computed-properties-in-native-classes */
import { layout, tagName } from '@ember-decorators/component';
import Component from '@ember/component';
import { action, computed } from '@ember/object';
import MenuPositionCalculator from 'ember-paper/utils/menu-position-calculator';
import template from './template';

@tagName('')
@layout(template)
class PaperMenu extends Component {

  @action
  close() {
    this.didAnimateScale = false;
  }

  @action
  open() {
    this.didAnimateScale = false;
  }

  position = 'target';

  // If attachment is a single item, duplicate it for our second value.
  // ie. 'target' -> 'target target'
  @computed('position')
  get positionMode() {
    let position = this.position || 'target';
    let [left, top] = position.split(' ').map((s) => s.trim());
    top = top || left;

    return { left, top };
  }

  offset = '0 0';

  @computed('offset')
  get offsets() {
    let offset = this.offset || '0 0';
    let [left, top] = offset.split(' ').map((s) => s.trim()).map(parseFloat);
    top = top || left;

    return { left, top };
  }

  @action
  calculatePosition(trigger, content) {
    let positionCalculator = new MenuPositionCalculator(trigger, content, this.positionMode, this.offsets, this.didAnimateScale);
    this.didAnimateScale = true;

    return positionCalculator.drowdownPosition;
  }
}

export default PaperMenu;
