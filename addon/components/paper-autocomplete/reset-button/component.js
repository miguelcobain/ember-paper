import Component from '@ember/component';
import TransitionMixin from 'ember-css-transitions/mixins/transition-mixin';

import { tagName, attribute } from '@ember-decorators/component';

@tagName('button')
class PaperAutocompleteResetButton extends Component.extend(TransitionMixin) {

  @attribute
  type = 'button';

  @attribute
  tabindex = '-1';

  transitionClass = 'ng';
  onReset = null;

  mouseUp(e) {
    let onReset = this.get('onReset');
    if (onReset === null) {
      return;
    }
    onReset(e);
  }

  didTransitionOut() {
    super.didTransitionOut(...arguments);
    if (this.onDidTransitionOut) {
      this.onDidTransitionOut();
    }
  }
}

export default PaperAutocompleteResetButton;
