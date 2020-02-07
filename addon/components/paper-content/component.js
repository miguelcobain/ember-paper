/**
 * @module ember-paper
 */
import Component from '@ember/component';
import { tagName, layout } from '@ember-decorators/component';
import template from './template';

/**
 * @class PaperContent
 * @extends Component
 */
@tagName('')
@layout(template)
class PaperContent extends Component {}

export default PaperContent;
