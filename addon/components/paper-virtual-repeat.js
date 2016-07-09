import Ember from 'ember';
import VirtualEachComponent from 'virtual-each/components/virtual-each';

const { computed, run, get, set, Handlebars, RSVP } = Ember;

const EXTRA_ROW_PADDING = 3;

export default VirtualEachComponent.extend({
	tagName: 'md-virtual-repeat-container',
	classNames: ['md-virtual-repeat-container'],
	classNameBindings: ['horizontal:md-orient-horizontal'],
	visibleItemsRaw: computed.mapBy('visibleItems','raw'),
	
	actions: {
		onScroll(e) {
			this.eventHandlers.scroll.call(this,e);
		}
	},
	defaultAttrs: {
		scrollTimeout: 30
	},
	calculateVisibleItems(positionIndex) {
	    run(() => {
	      const startAt = get(this, '_startAt');
	      const scrolledAmount = this.get('horizontal') ? this.$('.md-virtual-repeat-scroller').scrollLeft() : this.$('.md-virtual-repeat-scroller').scrollTop();
	      const visibleStart = isNaN(positionIndex) ? Math.floor(scrolledAmount / this.get('itemHeight')) : Math.max(positionIndex);

	      if (visibleStart !== startAt) {
	        set(this, '_startAt', visibleStart);
	      }
	    });
  },
  _marginTop: computed('_totalHeight', '_startAt', '_visibleItemCount', 'itemHeight', {
    get() {
      const itemHeight = this.get('itemHeight');
      const totalHeight = get(this, '_totalHeight');
      const margin = get(this, '_startAt') * itemHeight;
      const visibleItemCount = get(this, '_visibleItemCount');
      const maxMargin = Math.max(0, totalHeight - ((visibleItemCount - 1) * itemHeight) + (EXTRA_ROW_PADDING * itemHeight));

      return Math.min(maxMargin, margin);
    }
  }).readOnly(),
  contentStyle: computed('_marginTop', '_totalHeight', {
    get() {
      
      const height = Handlebars.Utils.escapeExpression(get(this, '_totalHeight'));

      return new Handlebars.SafeString(this.get('horizontal') ? `width: ${height}px;` : `height: ${height}px;`);
    }
  }).readOnly(),
  _visibleItemCount: computed('height', 'itemHeight', {
    get() {
      const height = this.get('height');

      return Math.ceil(this.get('itemHeight') ? height / this.get('itemHeight') : 1) + EXTRA_ROW_PADDING;
    }
  }).readOnly(),
  didRender() {
  	if (!this.get('itemHeight')) {
  		let elem = this.$('.md-virtual-repeat-offsetter')[0].firstElementChild;
  		if (elem) {
  			this.set('itemHeight',this.get('horizontal')? elem.offsetWidth : elem.offsetHeight);
  			this.set('_totalHeight',Math.max((this.get('length') ? this.get('length') : get(this.get('items'), 'length')) * this.get('itemHeight'), 0))
  			// this.rerender();
  		}
  	}
  	this.set('height',this.get('horizontal') ? this.$()[0].clientWidth : this.$()[0].clientHeight);
  	
  },
  visibleItems: computed('_startAt', '_visibleItemCount', '_items', {
    get() {
      let items = get(this, '_items');
      const startAt = get(this, '_startAt');
      const _visibleItemCount = get(this, '_visibleItemCount');
      const itemsLength = this.get('length') ? this.get('length') : get(items, 'length');
      const endAt = Math.min(itemsLength, startAt + _visibleItemCount);
      const onScrollBottomed = this.attrs.onScrollBottomed;

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
      return items.slice(startAt, endAt).map((item, index) => {
        return {
          raw: item,
          actualIndex: startAt + index,
          virtualIndex: index
        };
      });
    }
  }).readOnly(),
  didReceiveAttrs() {
    this._super(...arguments);

    RSVP.cast(this.getAttr('items')).then((attrItems) => {
      const items = Ember.A(attrItems);

      this.setProperties({
        _items: items,
        _positionIndex: this.getAttr('positionIndex'),
        _totalHeight: Math.max((this.get('length') ? this.get('length') : get(items, 'length')) * this.get('itemHeight'), 0)
      });
    });
  },


});
