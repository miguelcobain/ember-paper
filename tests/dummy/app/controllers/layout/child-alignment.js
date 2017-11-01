import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  layoutClass: computed('layoutDirection', function() {
    return `layout-${this.get('layoutDirection')}`;
  }),

  layoutAlignClass: computed('mainDirection', 'perpDirection', function() {
    let { mainDirection, perpDirection } = this.getProperties('mainDirection', 'perpDirection');

    if (!mainDirection && !perpDirection) {
      return 'layout-align';
    } else if (mainDirection && !perpDirection) {
      return `layout-align-${mainDirection}`;
    } else if (!mainDirection && perpDirection) {
      return `layout-align-start-${perpDirection}`;
    } else if (mainDirection && perpDirection) {
      return `layout-align-${mainDirection}-${perpDirection}`;
    }

    return '';
  }),

  layoutDirection: 'row',
  mainDirection: 'center',
  perpDirection: 'center'
});
