import Component from '@glimmer/component';
import { action } from '@ember/object';

export default class PaperAutocompleteResetButton extends Component {
  @action handleClick(onReset, e) {
    if (onReset) {
      onReset(e);
    }
  }
}
