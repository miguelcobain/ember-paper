import Ember from 'ember';
const { computed, computed: { reads }, Component, Object: EmberObject, run } = Ember;

export default Component.extend({

  tagName: 'md-tabs-wrapper',

  self: computed(function() {
    return EmberObject.create({
      id: this.elementId
    });
  }),

  /* Inherited from {{paper-tabs}} */
  centerTabs: reads('parent.centerTabs'),
  tabs: reads('parent.tabs'),
  noInkBar: reads('parent.noInkBar'),
  selected: reads('parent.selected'),
  lastSelectedIndex: reads('parent.lastSelectedIndex'),
  selectedTab: reads('parent.selectedTab'),
  canvasWidth: reads('parent.canvasWidth'),
  pagingWidth: reads('parent.pagingWidth'),
  shouldPaginate: reads('parent.shouldPaginate'),
  canPageBack: reads('parent.canPageBack'),
  canPageForward: reads('parent.canPageForward'),
  offsetLeft: reads('parent.offsetLeft'),
  shouldCenterTabs: reads('parent.shouldCenterTabs'),
  shouldStretchTabs: reads('parent.shouldStretchTabs'),

  canvasClass: computed('shouldPaginate', function() {
    return this.get('shouldPaginate') ? 'md-paginated' : '';
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
