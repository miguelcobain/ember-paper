/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-toolbar';
import ColorMixin from 'ember-paper/mixins/color-mixin';

const { NAME_KEY, Component } = Ember;

/**
 * @class PaperToolbar
 * @extends Ember.Component
 * @uses ColorMixin
 */
const PaperComponent = Component.extend(ColorMixin, {
  layout,
  tagName: 'md-toolbar',
  classNames: ['md-default-theme'],
  tall: false,
  classNameBindings: ['tall:md-tall']
});

PaperComponent[NAME_KEY] = 'paper-toolbar';

export default PaperComponent;
