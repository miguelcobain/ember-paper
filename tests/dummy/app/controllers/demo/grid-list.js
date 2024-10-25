/* eslint-disable prettier/prettier */
import Controller from '@ember/controller';
import { later } from '@ember/runloop';
import { A } from '@ember/array';
import EObject, { computed } from '@ember/object';
import { buildGridModel, randomColor, randomSpan } from '../../utils/grid-list';

export default Controller.extend({

  init() {
    this._super(...arguments);

    // start timer, which recalculates the color tiles every 10 seconds
    this.setupTimer();
    this.set('colorTiles', this.calculateColorTiles());
  },

  basicRows: 6,

  setupTimer() {
    later(this, () => {
      this.recalculateColorTiles();

      later(this, this.setupTimer);
    }, 10 * 1000);
  },

  tiles: computed(function() {
    let tiles = buildGridModel({
      title: 'Svg-',
      background: ''
    });

    return A(tiles);
  }),

  recalculateColorTiles() {
    let tiles = this.colorTiles;
    for (let i = 0; i < 46; i++) {
      tiles[i].set('colspan', randomSpan());
      tiles[i].set('rowspan', randomSpan());
      tiles[i].set('style', randomColor());
    }
  },

  calculateColorTiles() {
    let tiles = [];
    for (let i = 0; i < 46; i++) {
      tiles.push(EObject.create({
        style: randomColor(),
        colspan: randomSpan(),
        rowspan: randomSpan()
      }));
    }

    return A(tiles);
  },

  colorTiles: computed(function() {
    return A([]);
  })
});
