import Ember from 'ember';
const { computed, Component, Object: EmberObject, String: EmberString, run } = Ember;

export default Component.extend({
  init() {
    this._super();
  },

  tagName: 'md-tabs-wrapper',

  self: computed(function() {
    return EmberObject.create({
      id: this.elementId
    });
  }),

  /* Inherited from {{paper-tabs}} */
  centerTabs: computed.reads('parent.centerTabs'),
  tabs: computed.reads('parent.tabs'),
  noInkBar: computed.reads('parent.noInkBar'),
  selected: computed.reads('parent.selected'),
  lastSelectedIndex: computed.reads('parent.lastSelectedIndex'),
  selectedTab: computed.reads('parent.selectedTab'),
  canvasWidth: computed.reads('parent.canvasWidth'),
  pagingWidth: computed.reads('parent.pagingWidth'),
  shouldPaginate: computed.reads('parent.shouldPaginate'),
  canPageBack: computed.reads('parent.canPageBack'),
  canPageForward: computed.reads('parent.canPageForward'),
  offsetLeft: computed.reads('parent.offsetLeft'),
  shouldCenterTabs: computed.reads('parent.shouldCenterTabs'),
  shouldStretchTabs: computed.reads('parent.shouldStretchTabs'),

  canvasClass: computed('shouldPaginate', function() {
    return EmberString.htmlSafe(this.get('shouldPaginate') ? '' : 'md-paginated');
  }),

  didInsertElement() {
    let self = this.get('self');
    self.set('height', this.$().outerHeight());
    self.set('offset', this.$().offset().left);
    run.scheduleOnce('afterRender', function() {
      this.get('parent').identifyTabsWrapper(self);
    }.bind(this));
  },

  actions: {
    nextPage() {
      this.get('parent').send('nextPage');
    },
    previousPage() {
      this.get('parent').send('previousPage');
    }
  }
});
