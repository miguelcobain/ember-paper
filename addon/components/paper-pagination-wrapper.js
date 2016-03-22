import Ember from 'ember';
const { computed } = Ember;

export default Ember.Component.extend({
  tagName: 'md-pagination-wrapper',

  /* Inherited */
  tabs: computed.reads('parent.tabs'),
  centerTabs: computed.reads('parent.centerTabs'),
  selected: computed.reads('parent.selected'),
  lastSelectedIndex: computed.reads('parent.lastSelectedIndex'),
  selectedTab: computed.reads('parent.selectedTab'),
  noInkBar: computed.reads('parent.noInkBar'),

  showInkBar: computed('noInkBar', 'tabs.[]', function() {
    if (!this.get('noInkBar') && (this.get('tabs.length') > 0)) {
      return true;
    }
    return false;
  }),

  inkBarDirection: computed('lastSelectedIndex', 'selected', function() {
    return (this.get('lastSelectedIndex') > this.get('selected')) ? 'left' : 'right';
  }),

  classNameBindings: ['centerTabs:md-center-tabs'],
  attributeBindings: ['styleAttr:style'],
  styleAttr: computed('widthStyle', function() {
    return this.get('widthStyle');
  }),

  widthStyle: computed('width', function() {
    if (this.get('shouldStrechTabs')) {
      return '';
    } else {
      return (this.get('width')) ? `width: ${this.get('width')}px;` : 'width: 0px';
    }
  }),

  inkBarLeftPosition: computed('selectedTab.left', function() {
    let leftOffset = this.$().offset().left;
    return this.get('selectedTab.left') - leftOffset;
  }),
  inkBarRightPosition: computed('inkBarLeftPosition', 'selectedTab.width', 'width', function() {
    let leftOffset = this.$().offset().left;
    let position = this.get('width');// - this.get('selectedTab.left');
    position -= this.get('inkBarLeftPosition');
    position -= this.get('selectedTab.width');
    return position;
    // return (this.get('parent.selectedTab.left') + this.get('parent.selectedTab.width')) - this.get('wrapperWidth');
  }),

  shouldStrechTabs: false, // todo: implement computed property

  width: computed('tabs.[].id', 'shouldStretchTabs', function() {
    let context = this;
    let width = 0;
    this.get('tabs').forEach(function(tab) {
      if (tab.id) {
        let element = document.getElementById(tab.id);
        width += Math.max(element.offsetWidth, element.getBoundingClientRect().width);
      }
    });
    return Math.ceil(width);
  })
});
