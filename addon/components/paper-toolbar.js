import Ember from 'ember';
import ColorMixin from 'ember-paper/mixins/color-mixin';

export default Ember.Component.extend(ColorMixin, {
  tagName: 'md-toolbar',
  classNames: ['md-default-theme']
});
