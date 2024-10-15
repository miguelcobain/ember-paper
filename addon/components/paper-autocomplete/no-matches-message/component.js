/* eslint-disable ember/no-classic-components, prettier/prettier */
import Component from '@ember/component';

import template from './template';

import { tagName, layout } from '@ember-decorators/component';

@tagName('')
@layout(template)
export default class PaperAutocompleteNoMatchesMessage extends Component {

}
