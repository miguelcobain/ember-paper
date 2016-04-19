import Ember from 'ember';
import PaperGridList from './paper-grid-list';

export default Ember.Component.extend({
  tagName: 'md-grid-tile',

  constants: Ember.inject.service(),

  didInsertElement() {
    this._super(...arguments);

    this.get('gridList').registerGridTile(this);
    this.get('gridList').send('invalidateTiles');

    this._watchResponsiveAttributes(['md-colspan', 'md-rowspan'], (mediaName) => {
      this.get('gridList').send('invalidateLayout', mediaName);
    });
  },

  willDestroyElement() {
    this._super(...arguments);

    this.get('gridList').send('invalidateLayout');
  },

  gridList: Ember.computed(function() {
    return this.nearestOfType(PaperGridList);
  }),

  _watchResponsiveAttributes(attrNames, watchFn) {

    let checkObserverValues = (sender, key) => {
      let oldValue = this.get(`old${key}`);
      let newValue = sender.get(key);

      if (oldValue !== newValue) {
        watchFn();
      }
    };

    attrNames.forEach((attrName) => {
      if (Ember.get(this, attrName)) {
        this.set(`old${attrName}`, Ember.get(this, attrName));

        this.addObserver(attrName, checkObserverValues);
      }

      for (let mediaName in this.get('constants.MEDIA')) {
        let normalizedName = `${attrName}-${mediaName}`;
        if (Ember.get(this, normalizedName)) {
          this.set(`old${normalizedName}`, Ember.get(this, normalizedName));

          this.addObserver(normalizedName, checkObserverValues);
        }
      }

    });
  }

});
