import PaperChips from 'ember-paper/components/paper-chips/component';
import template from './template';

import { tagName, layout } from '@ember-decorators/component';

@tagName('')
@layout(template)
class PaperContactChips extends PaperChips {
  requireMatch = true;
  searchField = 'email';
  emailField = 'email';
  nameField = 'name';
  imageField = 'image';
}

export default PaperContactChips;
