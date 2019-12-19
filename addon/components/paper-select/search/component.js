import PowerBeforeBeforeOptions from 'ember-power-select/components/power-select/before-options';

import template from './template';

import { tagName, layout } from '@ember-decorators/component';

@tagName('')
@layout(template)
class PaperSelectOptions extends PowerBeforeBeforeOptions {

}

export default PaperSelectOptions;
