import PowerSelectOptions from 'ember-power-select/components/power-select/options';

import template from './template';

import { tagName, layout } from '@ember-decorators/component';

@tagName('')
@layout(template)
class PaperAutocompleteOptions extends PowerSelectOptions {

}

export default PaperAutocompleteOptions;
