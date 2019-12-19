/**
 * @module ember-paper
 */

import Component from '@ember/component';
import RippleMixin from 'ember-paper/mixins/ripple-mixin';
import template from './template';

import { tagName, layout } from '@ember-decorators/component';


/**
 * @class PaperOption
 * @extends PaperMenuItem
 * @uses RippleMixin
 */
@tagName('md-option')
@layout(template)
class PaperSelectOption extends Component.extend(RippleMixin) {
  rippleContainerSelector = null;
}

export default PaperSelectOption;
