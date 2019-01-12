import { inject as service } from '@ember/service';
import { gt } from '@ember/object/computed';
import { computed, observer } from '@ember/object';
import Component from '@ember/component';
import { htmlSafe } from '@ember/string';
import { scheduleOnce, next } from '@ember/runloop';
import layout from '../templates/components/paper-tabs';
import { ParentMixin } from 'ember-composability-tools';
import ColorMixin from 'ember-paper/mixins/color-mixin';
import { invokeAction } from 'ember-invoke-action';

export default Component.extend(ParentMixin, ColorMixin, {
  layout,
  tagName: 'md-tabs',

  classNames: ['md-no-tab-content', 'md-default-theme'],
  attributeBindings: ['borderBottom:md-border-bottom'],

  constants: service(),

  selected: 0, // select first tab by default

  _selectedTab: computed('childComponents.@each.isSelected', function() {
    return this.get('childComponents').findBy('isSelected');
  }),

  _selectedTabDidChange: observer('_selectedTab', function() {
    let selectedTab = this.get('_selectedTab');

    let previousSelectedTab = this.get('_previousSelectedTab');

    if (selectedTab === previousSelectedTab) {
      return;
    }

    this.setMovingRight();

    this.fixOffsetIfNeeded();

    this.set('_previousSelectedTab', selectedTab);
  }),

  noInkBar: false,
  noInk: false,
  ariaLabel: null,
  stretch: 'sm',

  inkBar: computed('noInkBar', '_selectedTab.{width,left}', 'wrapperWidth', function() {
    if (this.get('noInkBar')) {
      return null;
    }

    let selectedTab = this.get('_selectedTab');
    if (!selectedTab || selectedTab.get('left') === undefined) {
      return null;
    }

    return {
      left: selectedTab.get('left'),
      right: this.get('wrapperWidth') - selectedTab.get('left') - selectedTab.get('width')
    };
  }),

  shouldPaginate: true,

  shouldCenter: computed('shouldPaginate', 'center', function() {
    return !this.get('shouldPaginate') && this.get('center');
  }),

  shouldStretch: computed('shouldPaginate', 'currentStretch', function() {
    return !this.get('shouldPaginate') && this.get('currentStretch');
  }),

  didInsertElement() {
    this._super(...arguments);

    let updateCanvasWidth = () => {
      this.updateDimensions();
      this.updateStretchTabs();
      this.fixOffsetIfNeeded();
    };

    window.addEventListener('resize', updateCanvasWidth);
    window.addEventListener('orientationchange', updateCanvasWidth);
    this.updateCanvasWidth = updateCanvasWidth;

    // trigger updateDimensions to calculate shouldPaginate early on
    this.updateDimensions();
    scheduleOnce('afterRender', () => {
      next(() => {
        // here the previous and next buttons should already be renderd
        // and hence the offsets are correctly calculated
        if (!this.isDestroyed && !this.isDestroying) {
          this.updateDimensions();
          this.fixOffsetIfNeeded();
        }
      });
    });
  },

  didRender() {
    this._super(...arguments);
    // this makes sure that the tabs react to stretch and center changes
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

    let tabLeftOffset = this.get('_selectedTab.left');
    let tabRightOffset = tabLeftOffset + this.get('_selectedTab.width');

    let newOffset;
    if (canvasWidth < this.get('_selectedTab.width')) {
      // align with selectedTab if canvas smaller than selected tab
      newOffset = tabLeftOffset;
    } else if (tabRightOffset - currentOffset > canvasWidth) {
      // ensure selectedTab is not partially hidden on the right side
      newOffset = tabRightOffset - canvasWidth;
    } else if (tabLeftOffset < currentOffset) {
      // ensure selectedTab is not partially hidden on the left side
      newOffset = tabLeftOffset;
    } else {
      newOffset = 0;
    }

    if (newOffset === currentOffset) {
      return;
    }

    this.set('currentOffset', newOffset);
    this.set('paginationStyle', htmlSafe(`transform: translate3d(-${newOffset}px, 0px, 0px);`));
  },

  updateDimensions() {
    let canvasWidth = this.element.querySelector('md-tabs-canvas').offsetWidth;
    let wrapperWidth = this.element.querySelector('md-pagination-wrapper').offsetWidth;
    this.get('childComponents').invoke('updateDimensions');
    this.set('canvasWidth', canvasWidth);
    this.set('wrapperWidth', wrapperWidth);

    if (wrapperWidth <= canvasWidth) {
      this.set('shouldPaginate', false);
    }
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
  canPageBack: gt('currentOffset', 0),
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
        invokeAction(this, 'onChange', selected.get('value'));
      } else {
        this.set('selected', selected.get('value'));
      }
    }
  }
});
