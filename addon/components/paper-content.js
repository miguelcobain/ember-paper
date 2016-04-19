import Ember from 'ember';
import FlexMixin from '../mixins/flex-mixin';

export default Ember.Component.extend(FlexMixin, {
  tagName: 'md-content',
  classNames: ['md-default-theme'],
  attributeBindings: ['layout-padding', 'scroll-y:md-scroll-y'],
  classNameBindings: ['padding:md-padding']
});
