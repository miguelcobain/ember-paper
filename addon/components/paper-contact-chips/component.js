import Component from '@ember/component';
import template from './template';

import { tagName, layout } from '@ember-decorators/component';

@tagName('')
@layout(template)
class PaperContactChips extends Component {
  requireMatch = true;
  searchField = 'email';
  emailField = 'email';
  nameField = 'name';
  imageField = 'image';
}

export default PaperContactChips;
