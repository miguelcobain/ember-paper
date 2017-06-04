import Ember from 'ember';
import LayoutRules from '../mixins/layout-rules';

var MdTabItem = Ember.Component.extend(LayoutRules, {
    tagName: 'md-tab-item',

    attributeBindings: ['tab', 'role', 'label', 'tabWidthStyle:style'],
    classNameBindings: ['isActive:md-active', 'isFocused:md-focus', 'isDisabled:md-disabled'],

    tabWrapperComponent: Ember.computed.alias('parentView'),
    tabsComponent: Ember.computed.alias('tabWrapperComponent.parentView'),

    tabWidth: null,

    didInsertElement() {
        this._super(...arguments);
        this.get('tabsComponent').attachRipple(this.$());
    },

    click() {
        this.get('tabsComponent').select(this.get('tab').getIndex());
    },

    tabWidthStyle: Ember.computed('tabWidth', function() {
      var tabWidth = this.get('tabWidth');

      if (tabWidth) {
        return new Ember.Handlebars.SafeString(`max-width: ${tabWidth}px;`);
      }

      return new Ember.Handlebars.SafeString('max-width: none;');
    }),

    isActive: Ember.computed('tabsComponent.selectedIndex', function() {
        return this.get('tab').isActive();
    }),

    isFocused: Ember.computed('tabsComponent.selectedIndex', function() {
        return this.get('tab').hasFocus();
    }),

    isDisabled: Ember.computed('tab.disabled', function() {
        return this.get('tab.disabled');
    })

});

export default MdTabItem;
