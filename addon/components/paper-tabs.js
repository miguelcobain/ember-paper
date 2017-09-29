import Ember from 'ember';
import layout from '../templates/components/paper-tabs';
import { ParentMixin } from 'ember-composability-tools';
import ColorMixin from 'ember-paper/mixins/color-mixin';

const { computed, Component, String: { htmlSafe }, inject } = Ember;

export default Component.extend(ParentMixin, ColorMixin, {
  layout,
  tagName: 'md-tabs',

  classNames: ['md-no-tab-content', 'md-default-theme'],
  attributeBindings: ['borderBottom:md-border-bottom'],

  constants: inject.service(),

  selected: 0, // select first tab by default

  _selectedTab: computed('childComponents.@each.value', 'selected', function() {
    return this.get('childComponents').findBy('value', this.get('selected'));
  }),

  _previousSelectedTab: computed('childComponents.@each.value', 'previousSelected', function() {
    return this.get('childComponents').findBy('value', this.get('previousSelected'));
  }),

  noInkBar: false,
  noInk: false,
  ariaLabel: null,
  previousInkBarPosition: 0,
  stretch: 'sm',

  inkBarLeft: computed('_selectedTab.left', function() {
    return this.get('_selectedTab.left') || 0;
  }),

  inkBarRight: computed('wrapperWidth', '_selectedTab.currentWidth', 'inkBarLeft', function() {
    return this.get('wrapperWidth') - this.get('inkBarLeft') - (this.get('_selectedTab.currentWidth') || 0);
  }),

  tabsWidth: computed('childComponents.@each.width', function() {
    return this.get('childComponents').reduce((prev, t) => prev + t.get('width'), 0);
  }),

  shouldPaginate: computed('canvasWidth', function() {
    return this.get('tabsWidth') > this.get('canvasWidth');
  }),

  shouldCenter: computed('shouldPaginate', 'center', function() {
    return !this.get('shouldPaginate') && this.get('center');
  }),

  shouldStretch: computed('shouldPaginate', 'currentStretch', function() {
    return !this.get('shouldPaginate') && this.get('currentStretch');
  }),

  didReceiveAttrs() {
    this._super(...arguments);
    if (this.get('selected') !== this.get('previousSelected')) {
      this.setMovingRight();
      this.fixOffsetIfNeeded();
      this.set('previousSelected', this.get('selected'));
    }
  },

  didInsertElement() {
    this._super(...arguments);

    let updateCanvasWidth = () => {
      this.updateDimensions();
      this.updateStretchTabs();
    };

    window.addEventListener('resize', updateCanvasWidth);
    window.addEventListener('orientationchange', updateCanvasWidth);
    this.updateCanvasWidth = updateCanvasWidth;
  },

  didRender() {
    this._super(...arguments);
    this.updateCanvasWidth();

  },

  willDestroyElement() {
    this._super(...arguments);
    window.removeEventListener('resize', this.updateCanvasWidth);
    window.removeEventListener('orientationchange', this.updateCanvasWidth);
  },

  registerChild(childComponent) {
    this._super(...arguments);
    // automatically set value if not manually set
    if (childComponent.get('value') === undefined) {
      let length = this.childComponents.get('length');
      childComponent.set('value', length - 1);
    }
  },

  setMovingRight() {
    let movingRight = this.get('_previousSelectedTab.left') < this.get('_selectedTab.left');
    this.set('movingRight', movingRight);
  },

  fixOffsetIfNeeded() {
    let canvasWidth = this.get('canvasWidth');
    let currentOffset = this.get('currentOffset');

    let tabRight = this.get('_selectedTab.left') + this.get('_selectedTab.width');
    if (tabRight - currentOffset > canvasWidth) {
      let newOffset = tabRight - canvasWidth;
      this.set('currentOffset', newOffset);
      this.set('paginationStyle', htmlSafe(`transform: translate3d(-${newOffset}px, 0px, 0px);`));
    }

    if (this.get('_selectedTab.left') < currentOffset) {
      let newOffset = this.get('_selectedTab.left');
      this.set('currentOffset', newOffset);
      this.set('paginationStyle', htmlSafe(`transform: translate3d(-${newOffset}px, 0px, 0px);`));
    }
  },

  updateDimensions() {
    let canvasWidth = this.element.querySelector('md-tabs-canvas').offsetWidth;
    let wrapperWidth = this.element.querySelector('md-pagination-wrapper').offsetWidth;
    this.get('childComponents').invoke('updateDimensions');
    this.set('canvasWidth', canvasWidth);
    this.set('wrapperWidth', wrapperWidth);
  },

  updateStretchTabs() {
    let stretch = this.get('stretch');
    let currentStretch;

    // if `true` or `false` is specified, always/never "stretch tabs"
    // otherwise proceed with normal matchMedia test
    if (typeof stretch === 'boolean') {
      currentStretch = stretch;
    } else {
      let mediaQuery = this.get('constants').MEDIA[stretch] || stretch;
      currentStretch = window.matchMedia(mediaQuery).matches;
    }

    this.set('currentStretch', currentStretch);
  },

  currentOffset: 0,
  canPageBack: computed.gt('currentOffset', 0),
  canPageForward: computed('wrapperWidth', 'currentOffset', 'canvasWidth', function() {
    return this.get('wrapperWidth') - this.get('currentOffset') > this.get('canvasWidth');
  }),

  actions: {
    previousPage() {
      let tab = this.get('childComponents').find((t) => {
        return t.get('left') >= this.get('currentOffset');
      });
      if (tab) {
        let left = Math.max(0, tab.get('left') - this.get('canvasWidth'));
        this.set('currentOffset', left);
        this.set('paginationStyle', htmlSafe(`transform: translate3d(-${left}px, 0px, 0px);`));
      }
    },

    nextPage() {
      let tab = this.get('childComponents').find((t) => {
        return t.get('left') + t.get('width') - this.get('currentOffset') > this.get('canvasWidth');
      });
      if (tab) {
        this.set('currentOffset', tab.get('left'));
        this.set('paginationStyle', htmlSafe(`transform: translate3d(-${tab.get('left')}px, 0px, 0px);`));
      }
    },

    onChange(selected) {
      // support non DDAU scenario
      if (this.get('onChange')) {
        this.sendAction('onChange', selected.get('value'));
      } else {
        this.set('selected', selected.get('value'));
      }
    }
  }
});
