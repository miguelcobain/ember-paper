import PowerOptions from 'ember-power-select/components/power-select/options';

export default PowerOptions.extend({
  tagName: 'md-content',
  init() {
    this._super(...arguments);
    if (this.get('role') === 'group') {
      this.set('tagName', '');
    } else if (this.get('searchEnabled')) {
      this.set('tagName', 'md-optgroup');
    }
  }
});