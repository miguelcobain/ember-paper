import Component from '@ember/component';
import template from './template';

import { action } from '@ember/object';
import { or } from '@ember/object/computed';

import { tagName, layout } from '@ember-decorators/component';

@tagName('')
@layout(template)
class PaperMenuItem extends Component {

  @or('onClick', 'href')
  shouldRenderButton;

  @action
  handleClick() {
    this.dropdown.actions.close();
    if (typeof this.onClick === 'function') {
      this.onClick(...arguments);
    }
  }

  @action
  handleMouseEnter(event) {
    if (!this.disabled) {
      let button = event.target.querySelector('button');
      if (button) {
        button.focus();
      }
    }
  }
}

export default PaperMenuItem;
