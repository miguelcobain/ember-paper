import Controller from '@ember/controller';
import { tracked } from '@glimmer/tracking';

export default class extends Controller {
  @tracked layoutDirection = 'row';
  @tracked mainDirection = 'center';
  @tracked perpDirection = 'center';

  get layoutClass() {
    return `layout-${this.layoutDirection}`;
  }

  get layoutAlignClass() {
    const { mainDirection, perpDirection } = this;

    if (!mainDirection && !perpDirection) {
      return 'layout-align';
    } else if (mainDirection && !perpDirection) {
      return `layout-align-${mainDirection}`;
    } else if (!mainDirection && perpDirection) {
      return `layout-align-start-${perpDirection}`;
    } else if (mainDirection && perpDirection) {
      return `layout-align-${mainDirection}-${perpDirection}`;
    }

    return '';
  }
}
