import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class PaperSelectEpsTrigger extends Component {
  get isPlaceholder() {
    return (
      (this.args.placeholder || this.args.extra.label) &&
      !this.args.select.selected
    );
  }

  @action clear(e) {
    e.stopPropagation();
    this.args.select.actions.select(null);
    if (e.type === 'touchstart') {
      return false;
    }
  }
}
