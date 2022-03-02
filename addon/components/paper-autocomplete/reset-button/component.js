/* eslint-disable ember/no-classic-components */
import Component from '@ember/component';

import template from './template';
import { tagName, layout } from '@ember-decorators/component';

@tagName('')
@layout(template)
export default class PaperAutocompleteResetButton extends Component {

  handleClick(onReset, e) {
    if (onReset) { onReset(e) }
  }
}
