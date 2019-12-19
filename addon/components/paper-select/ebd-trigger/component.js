import Component from '@ember/component';
import template from './template';

import { tagName, layout } from '@ember-decorators/component';
import { and } from '@ember/object/computed';

@tagName('')
@layout(template)
class PaperSelectEbdTrigger extends Component {

  @and('label', 'selected')
  shouldShowLabel;

}

export default PaperSelectEbdTrigger;
