/**
 * @module ember-paper
 */
let defaultAnimator = GridTileAnimator;

/**
 * Publish layout function
 */
function GridLayout(colCount, tileSpans) {
  let self, layoutInfo, gridStyles, layoutTime, mapTime, reflowTime;

  layoutInfo = calculateGridfor(colCount, tileSpans);

  return self = {

    /*
     * An array of objects describing each tile's position in the grid.
     */
    layoutInfo() {
      return layoutInfo;
    },

    /*
     * Maps grid positioning to an element and a set of styles using the
     * provided updateFn.
     */
    map(updateFn) {
      let info = self.layoutInfo();
      gridStyles = updateFn(info.positioning, info.rowCount);

      return self;
    },

    /*
     * Default animator simply sets the element.css( <styles> ). An alternate
     * animator can be provided as an argument. The function has the following
     * signature:
     *
     *    function({grid: {element: JQLite, style: Object}, tiles: Array<{element: JQLite, style: Object}>)
         */
    reflow(animatorFn) {
      let animator = animatorFn || defaultAnimator;
      animator(gridStyles.grid, gridStyles.tiles);
      return self;
    },

    /*
     * Timing for the most recent layout run.
     */
    performance() {
      return {
        tileCount: tileSpans.length,
        layoutTime,
        mapTime,
        reflowTime,
        totalTime: layoutTime + mapTime + reflowTime
      };
    }
  };
}

/*
 * Default Gridlist animator simple sets the css for each element;
 * NOTE: any transitions effects must be manually set in the CSS.
 * e.g.
 *
 *  md-grid-tile {
   *    transition: all 700ms ease-out 50ms;
   *  }
 *
 */
function GridTileAnimator(grid, tiles) {
  grid.element.css(grid.style);
  tiles.forEach(function(t) {
    t.element.css(t.style);
  });
}

/*
 * Calculates the positions of tiles.
 *
 * The algorithm works as follows:
 *    An Array<Number> with length colCount (spaceTracker) keeps track of
 *    available tiling positions, where elements of value 0 represents an
 *    empty position. Space for a tile is reserved by finding a sequence of
 *    0s with length <= than the tile's colspan. When such a space has been
 *    found, the occupied tile positions are incremented by the tile's
 *    rowspan value, as these positions have become unavailable for that
 *    many rows.
 *
 *    If the end of a row has been reached without finding space for the
 *    tile, spaceTracker's elements are each decremented by 1 to a minimum
 *    of 0. Rows are searched in this fashion until space is found.
 */
function calculateGridfor(colCount, tileSpans) {
  let curCol = 0;
  let curRow = 0;
  let spaceTracker = newSpaceTracker();

  return {
    positioning: tileSpans.map(function(spans, i) {
      return {
        spans,
        position: reserveSpace(spans, i)
      };
    }),
    rowCount: curRow + Math.max(...spaceTracker)
  };

  function reserveSpace(spans, i) {
    if (spans.col > colCount) {
      throw `md-grid-list: Tile at position ${i} has a colspan
      (${spans.col}) that exceeds the column count
      (${colCount})`;
    }

    let start = 0;
    let end = 0;

    // TODO(shyndman): This loop isn't strictly necessary if you can
    // determine the minimum number of rows before a space opens up. To do
    // this, recognize that you've iterated across an entire row looking for
    // space, and if so fast-forward by the minimum rowSpan count. Repeat
    // until the required space opens up.
    while (end - start < spans.col) {
      if (curCol >= colCount) {
        nextRow();
        continue;
      }

      start = spaceTracker.indexOf(0, curCol);
      if (start === -1 || (end = findEnd(start + 1)) === -1) {
        start = end = 0;
        nextRow();
        continue;
      }

      curCol = end + 1;
    }

    adjustRow(start, spans.col, spans.row);
    curCol = start + spans.col;

    return {
      col: start,
      row: curRow
    };
  }

  function nextRow() {
    curCol = 0;
    curRow++;
    adjustRow(0, colCount, -1); // Decrement row spans by one
  }

  function adjustRow(from, cols, by) {
    for (let i = from; i < from + cols; i++) {
      spaceTracker[i] = Math.max(spaceTracker[i] + by, 0);
    }
  }

  function findEnd(start) {
    let i;
    for (i = start; i < spaceTracker.length; i++) {
      if (spaceTracker[i] !== 0) {
        return i;
      }
    }

    if (i === spaceTracker.length) {
      return i;
    }
  }

  function newSpaceTracker() {
    let tracker = [];
    for (let i = 0; i < colCount; i++) {
      tracker.push(0);
    }
    return tracker;
  }
}

export default GridLayout;
