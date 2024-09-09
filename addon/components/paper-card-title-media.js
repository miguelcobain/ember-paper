/* eslint-disable ember/no-classic-components, ember/require-tagless-components */
/**
 * @module ember-paper
 */
import Component from '@ember/component';

import { tagName, layout } from '@ember-decorators/component';
import template from '../templates/components/paper-card-title-media';

/**
 * @class PaperCardTitleMedia
 * @extends Ember.Component
 */
@tagName('md-card-title-media')
@layout(template)
export default class PaperCardTitleMedia extends Component {
  size = 'md';
}
