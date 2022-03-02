/* eslint-disable ember/no-classic-components */
import Component from '@ember/component';
import layout from '../templates/components/paper-reset-button';

export default Component.extend({
  tagName: '',
  layout,

  handleClick(onReset, e) {
    if (onReset) { onReset(e) }
  }
});
