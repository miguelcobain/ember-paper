import Ember from 'ember';
import LayoutRules from '../mixins/layout-rules';

var MdTabContentWrapper = Ember.Component.extend(LayoutRules, {
    tagName: 'md-tabs-content-wrapper'
});

export default MdTabContentWrapper;
