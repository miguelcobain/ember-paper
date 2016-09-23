import Ember from 'ember';
import VirtualEachComponent from 'virtual-each/components/virtual-each/component';

const {
  computed,
  run,
  get,
  set,
  Handlebars,
  RSVP,
  A: emberArray,
  String: { htmlSafe } } = Ember;

const EXTRA_ROW_PADDING = 3;

const VirtualRepeatComponent = VirtualEachComponent.extend({
  tagName: 'md-virtual-repeat-container',
  classNames: ['md-virtual-repeat-container'],
  classNameBindings: ['horizontal:md-orient-horizontal'],
  visibleItemsRaw: computed.mapBy('visibleItems', 'raw'),
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

  height: computed('initialSize', 'items.length', 'itemHeight', {
    get() {
      let itemSize = this.get('itemHeight');
      let fullSize = this.get('items.length')  * itemSize;

      if (fullSize <= itemSize) {
        return itemSize;
      }
      return Math.min(fullSize, this.get('initialSize'));
    }
  }).readOnly(),

  // Received coordinates {top, left, right, width} from the dropdown
  // Convert them to style and cache - they usually don't change
  positionStyle: computed('positionCoordinates', {
    get() {
      let coords = this.get('positionCoordinates') || {};
      let style = '';

      // {top, left, right, width}
      Object.keys(coords).forEach((type) => {
        if (coords[type]) {
          style += `${type}: ${coords[type]}; `;
        }
      });

      return style.trim();
    }
  }).readOnly(),

  style: computed('height', 'positionStyle', {
    get() {
      let height = this.get('height') || null;
      let style = this.get('positionStyle');

      if (height !== null && !isNaN(height)) {
        height = Handlebars.Utils.escapeExpression(height);
        style += ` height: ${height}px;`;
      }
      return htmlSafe(style);
    }
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

  _marginTop: computed('_totalHeight', '_startAt', '_visibleItemCount', 'itemHeight', {
    get() {
      let itemHeight = this.get('itemHeight');
      let totalHeight = get(this, '_totalHeight');
      let margin = get(this, '_startAt') * itemHeight;
      let visibleItemCount = get(this, '_visibleItemCount');
      let maxMargin = Math.max(0, totalHeight - ((visibleItemCount - 1) * itemHeight) + (EXTRA_ROW_PADDING * itemHeight));

      return Math.min(maxMargin, margin);
    }
  }).readOnly(),

  contentStyle: computed('_marginTop', '_totalHeight', {
    get() {
      let height = Handlebars.Utils.escapeExpression(get(this, '_totalHeight'));
      return htmlSafe(this.get('horizontal') ? `width: ${height}px;` : `height: ${height}px;`);
    }
  }).readOnly(),

  offsetterStyle: computed('_marginTop', 'horizontal', {
    get() {
      let { horizontal, _marginTop } = this.getProperties('_marginTop', 'horizontal');
      let dir = horizontal ? 'X' : 'Y';
      return htmlSafe(`transform: translate${dir}(${_marginTop}px);`);
    }
  }).readOnly(),

  _visibleItemCount: computed('height', 'itemHeight', {
    get() {
      let height = this.get('height');
      return Math.ceil(this.get('itemHeight') ? height / this.get('itemHeight') : 1) + EXTRA_ROW_PADDING;
    }
  }).readOnly(),

  didInsertElement() {
    this._super(...arguments);

    run.scheduleOnce('afterRender', this, function() {
      let [element] = this.$();
      this.initialSize = this.get('horizontal') ? element.clientWidth : element.clientHeight;
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
      if (this.get('horizontal')) {
        this.setProperties({
          itemHeight: optionElement.offsetWidth
        });
      } else {
        this.setProperties({
          itemHeight: optionElement.offsetHeight
        });
      }
    });
  },

  endAt: computed('_startAt', '_visibleItemCount', 'items.length', {
    get() {
      let { _startAt, _visibleItemCount } = this.getProperties('_startAt' , '_visibleItemCount');
      let totalItemsCount = get(this, 'items.length');

      return Math.min(totalItemsCount, _startAt + _visibleItemCount);
    }
  }).readOnly(),

  visibleItems: computed('_startAt', '_visibleItemCount', '_items', {
    get() {
      let items = get(this, '_items');
      let startAt = get(this, '_startAt');
      let _visibleItemCount = get(this, '_visibleItemCount');
      let itemsLength = get(items, 'length');
      let endAt = Math.min(itemsLength, startAt + _visibleItemCount);
      let onScrollBottomed = this.getAttr('onScrollBottomed');

      if (typeof onScrollBottomed === 'function' && (startAt + _visibleItemCount - EXTRA_ROW_PADDING) >= itemsLength) {
        onScrollBottomed(startAt, endAt);
      }
      let getAtIndex = this.get('getAtIndex');
      if (getAtIndex) {
        for (let i = startAt; i < endAt; i++) {
          if (!items[i]) {
            items[i] = getAtIndex(i);
          }
        }
      }
      // console.log('Visible items - changed. StartAt: ', startAt, ' endAt: ', endAt);
      return items.slice(startAt, endAt).map((item, index) => {
        return {
          raw: item,
          actualIndex: startAt + index,
          virtualIndex: index
        };
      });
    }
  }).readOnly(),

  didReceiveAttrs(changes) {
    this._super(...arguments);
    let { newAttrs, oldAttrs={} } = changes;

    RSVP.cast(this.getAttr('items')).then((attrItems) => {
      let items = emberArray(attrItems);
      this.setProperties({
        _items: items,
        _positionIndex: this.getAttr('positionIndex'),
        _totalHeight: Math.max(get(items, 'length') * this.get('itemHeight'), 0)
      });

      // Scroll index has changed, load more data & scroll
      if (oldAttrs.scrollItemIndex && newAttrs.scrollItemIndex !== oldAttrs.scrollItemIndex) {
        this.scrollToVirtualItem(newAttrs.scrollItemIndex);
      }
    });
  },

  scrollToVirtualItem(newIndex) {
    let {
      itemHeight,
      _visibleItemCount,
      _startAt,
      endAt,
      _items,
      height
      } = this.getProperties(
      'itemHeight',
      '_visibleItemCount',
      '_startAt',
      'endAt',
      '_items',
      'height');

    let itemsLength = _items.get('length');

    // Already loaded, just scroll
    if (newIndex < _startAt || newIndex > endAt) {

      let maxVisibleItemTop = Math.max(0, (itemsLength - _visibleItemCount + EXTRA_ROW_PADDING));
      let sanitizedIndex = Math.min(_startAt, maxVisibleItemTop);
      this.calculateVisibleItems(sanitizedIndex);
    }

    let topOffset = (newIndex + 1) * itemHeight;
    let topScroll = topOffset - height;
    this.$('.md-virtual-repeat-scroller').scrollTop(topScroll);
  }
});

VirtualRepeatComponent.reopenClass({
  positionalParams: ['items']
});

export default VirtualRepeatComponent;
