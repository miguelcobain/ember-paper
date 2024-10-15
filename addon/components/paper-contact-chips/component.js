/* eslint-disable ember/no-classic-components */
import Component from '@ember/component';
import template from './template';

import { tagName, layout } from '@ember-decorators/component';

@tagName('')
@layout(template)
export default class PaperContactChips extends Component {
  requireMatch = true;
  searchField = 'email';
  emailField = 'email';
  nameField = 'name';
  imageField = 'image';
}
