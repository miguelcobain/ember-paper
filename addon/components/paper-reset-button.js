/* eslint-disable ember/no-classic-components */
import Component from '@ember/component';

export default Component.extend({
  tagName: '',

  handleClick(onReset, e) {
    if (onReset) {
      onReset(e);
    }
  },
});
