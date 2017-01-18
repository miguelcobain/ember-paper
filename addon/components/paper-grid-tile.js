/**
 * @module ember-paper
 */
import Ember from 'ember';
import layout from '../templates/components/paper-grid-tile';
import PaperGridList from './paper-grid-list';

const { Component, computed, inject, get } = Ember;

/**
 * @class PaperGridTile
 * @extends Ember.Component
 */
export default Component.extend({
  layout,
  tagName: 'md-grid-tile',

  constants: inject.service(),

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

  gridList: computed(function() {
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
      if (get(this, attrName)) {
        this.set(`old${attrName}`, get(this, attrName));

        this.addObserver(attrName, checkObserverValues);
      }

      for (let mediaName in this.get('constants.MEDIA')) {
        let normalizedName = `${attrName}-${mediaName}`;
        if (get(this, normalizedName)) {
          this.set(`old${normalizedName}`, get(this, normalizedName));

          this.addObserver(normalizedName, checkObserverValues);
        }
      }

    });
  }

});
