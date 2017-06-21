import Ember from 'ember';
import VirtualEachComponent from 'virtual-each/components/virtual-each/component';
import layout from '../templates/components/paper-virtual-repeat';

const {
  computed,
  run,
  get,
  set,
  observer,
  Handlebars,
  RSVP,
  A: emberArray,
  String: { htmlSafe } } = Ember;

const EXTRA_ROW_PADDING = 3;

const VirtualRepeatComponent = VirtualEachComponent.extend({
  layout,
  tagName: 'md-virtual-repeat-container',
  classNames: ['md-virtual-repeat-container'],
  classNameBindings: ['horizontal:md-orient-horizontal'],
  rawVisibleItems: computed.mapBy('visibleItems', 'raw'),
  containerSelector: undefined,

  actions: {
    onScroll(e) {
      this.eventHandlers.scroll.call(this, e);
    }
  },

  defaultAttrs: {
    scrollTimeout: 30,
    height: 48
  },

  size: computed('initialSize', 'items.[]', 'itemHeight', function() {
    let itemSize = this.get('itemHeight');
    let fullSize = this.get('items.length')  * itemSize;

    if (fullSize <= itemSize) {
      return itemSize;
    }
    return Math.min(fullSize, this.get('initialSize'));

  }),

  height: computed('size', 'horizontal', function() {
    if (this.get('horizontal')) {
      return false;
    }
    return this.get('size');
  }),

  // Received coordinates {top, left, right, width} from the dropdown
  // Convert them to style and cache - they usually don't change
  positionStyle: computed('positionCoordinates', function() {
    let coords = this.get('positionCoordinates') || {};
    let style = '';

    // {top, left, right, width}
    Object.keys(coords).forEach((type) => {
      if (coords[type]) {
        style += `${type}: ${coords[type]}; `;
      }
    });

    return style.trim();
  }).readOnly(),

  style: computed('height', 'positionStyle', function() {
    let height = this.get('height') || null;
    let style = this.get('positionStyle');

    if (height !== null && !isNaN(height)) {
      height = Handlebars.Utils.escapeExpression(height);
      style += ` height: ${height}px;`;
    }
    return htmlSafe(style);
  }).readOnly(),

  calculateVisibleItems(positionIndex) {
    run(() => {
      let startAt = get(this, '_startAt');
      let scrolledAmount = this.get('horizontal') ? this.$('.md-virtual-repeat-scroller').scrollLeft() : this.$('.md-virtual-repeat-scroller').scrollTop();
      let visibleStart = isNaN(positionIndex) ? Math.floor(scrolledAmount / this.get('itemHeight')) : Math.max(positionIndex);

      if (visibleStart !== startAt) {
        set(this, '_startAt', visibleStart);
      }
    });
  },

  _marginTop: computed('_totalHeight', '_startAt', '_visibleItemCount', 'itemHeight', function() {
    let itemHeight = this.get('itemHeight');
    let totalHeight = get(this, '_totalHeight');
    let margin = get(this, '_startAt') * itemHeight;
    let visibleItemCount = get(this, '_visibleItemCount');
    let maxMargin = Math.max(0, totalHeight - ((visibleItemCount - 1) * itemHeight) + (EXTRA_ROW_PADDING * itemHeight));

    return Math.min(maxMargin, margin);
  }).readOnly(),

  contentStyle: computed('_marginTop', '_totalHeight', function() {
    let height = Handlebars.Utils.escapeExpression(get(this, '_totalHeight'));
    return htmlSafe(this.get('horizontal') ? `width: ${height}px;` : `height: ${height}px;`);
  }).readOnly(),

  offsetterStyle: computed('_marginTop', 'horizontal', function() {
    let { horizontal, _marginTop } = this.getProperties('_marginTop', 'horizontal');
    let dir = horizontal ? 'X' : 'Y';
    return htmlSafe(`transform: translate${dir}(${_marginTop}px);`);
  }).readOnly(),

  _visibleItemCount: computed('size', 'itemHeight', function() {
    let size = this.get('size');
    return Math.ceil(this.get('itemHeight') ? size / this.get('itemHeight') : 1) + EXTRA_ROW_PADDING;
  }).readOnly(),

  didInsertElement() {
    this._super(...arguments);

    run.scheduleOnce('afterRender', this, function() {
      let element = this.$().get(0);
      let initSize = this.get('horizontal') ? element.clientWidth : element.clientHeight;
      this.set('initialSize', initSize);
    });
  },

  didReceiveAttrs() {
    this._super(...arguments);

    let oldScrollIndex = this.get('_oldScrollIndex');
    let newScrollIndex = this.get('scrollIndex');
    let scrollTop = this.get('scrollTop');

    RSVP.cast(this.getAttr('items')).then((attrItems) => {
      let items = emberArray(attrItems);
      let itemsCount = this.get('totalItemsCount') || get(items, 'length');
      this.setProperties({
        _items: items,
        _positionIndex: this.getAttr('positionIndex'),
        _totalHeight: Math.max(itemsCount * this.get('itemHeight'), 0)
      });

      // Scroll index has changed, load more data & scroll
      if (oldScrollIndex !== newScrollIndex) {
        this.scrollToVirtualItem(newScrollIndex, scrollTop);
      }

      this.set('_oldScrollIndex', newScrollIndex);
    });
  },

  didRender() {
    let itemHeight = this.get('itemHeight');
    let selector = this.getWithDefault('containerSelector', '.md-virtual-repeat-offsetter');
    let offsetter = this.$(selector).get(0);
    if (!offsetter) {
      return;
    }

    let optionElement = offsetter.firstElementChild;
    if (!optionElement) {
      return;
    }

    if (itemHeight) {
      return;
    }

    run.cancel(this._measureHeightHandler);
    this._measureHeightHandler = run.schedule('afterRender', this, function() {
      let itemsCount = this.get('totalItemsCount') || get(this, 'items.length');

      if (this.get('horizontal')) {
        this.setProperties({
          itemHeight: optionElement.offsetWidth,
          _totalHeight: Math.max(itemsCount *  optionElement.offsetWidth, 0)
        });
      } else {
        this.setProperties({
          itemHeight: optionElement.offsetHeight,
          _totalHeight: Math.max(itemsCount * optionElement.offsetHeight, 0)
        });
      }
    });
  },

  endAt: computed('_startAt', '_visibleItemCount', 'items.length', function() {
    let { _startAt, _visibleItemCount } = this.getProperties('_startAt', '_visibleItemCount');
    let totalItemsCount = get(this, 'items.length');
    return Math.min(totalItemsCount, _startAt + _visibleItemCount);

  }).readOnly(),

  visibleItems: computed('_startAt', '_visibleItemCount', '_items', function() {

    let items = get(this, '_items');
    let startAt = get(this, '_startAt');
    let _visibleItemCount = get(this, '_visibleItemCount');
    let itemsLength = get(this, 'totalItemsCount') || get(items, 'length');
    let endAt = Math.min(itemsLength, startAt + _visibleItemCount);
    let onScrollBottomed = this.getAttr('onScrollBottomed');

    if (typeof onScrollBottomed === 'function' && (startAt + _visibleItemCount - EXTRA_ROW_PADDING) >= itemsLength) {
      run.next(this, onScrollBottomed, startAt, endAt);
    }

    let getAtIndex = this.get('getAtIndex');
    if (getAtIndex) {
      for (let i = startAt; i < endAt; i++) {
        if (!items[i]) {
          items[i] = getAtIndex(i);
        }
      }
    }

    return items.slice(startAt, endAt).map((item, index) => (
      {
        raw: item,
        actualIndex: startAt + index,
        virtualIndex: index
      })
    );
  }).readOnly(),

  scrollToVirtualItem(newIndex, toTop = false) {
    let { _startAt, endAt } = this.getProperties('_startAt', 'endAt');

    if (newIndex < _startAt || newIndex > endAt) {
      let { _visibleItemCount, _items } = this.getProperties('_visibleItemCount', '_items');
      let itemsLength = _items.get('length');

      let maxVisibleItemTop = Math.max(0, (itemsLength - _visibleItemCount + EXTRA_ROW_PADDING));
      let sanitizedIndex = Math.min(_startAt, maxVisibleItemTop);
      this.calculateVisibleItems(sanitizedIndex);
    }

    let itemHeight = this.get('itemHeight');
    let itemOffset = (newIndex + 1) * itemHeight;
    let offset = itemOffset - this.get('size');

    if (toTop) {
      offset = newIndex * itemHeight;
    }
    if (this.get('horizontal')) {
      this.$('.md-virtual-repeat-scroller').scrollLeft(offset);
    } else {
      this.$('.md-virtual-repeat-scroller').scrollTop(offset);
    }
  },

  lengthObserver: observer('items.length', function() {
    let totalLength = this.get('length') ? this.get('length') : this.get('items.length');
    this.set('_totalHeight', Math.max(totalLength * this.get('itemHeight'), 0));
  })

});

VirtualRepeatComponent.reopenClass({
  positionalParams: ['items']
});

export default VirtualRepeatComponent;
