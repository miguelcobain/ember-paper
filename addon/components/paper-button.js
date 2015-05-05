import Ember from 'ember';
import BaseFocusableMixin from '../mixins/base-focusable';
import RippleMixin from '../mixins/ripple-mixin';

export default Ember.Component.extend(BaseFocusableMixin, RippleMixin,{
  attributeBindings: ['target', 'action'],
  tagName: 'button',
  classNames: ['md-button','md-default-theme'],
  classNameBindings: ['raised:md-raised'],

  /* RippleMixin overrides */
  center: false,
  dimBackground: true,

  click: function(){
    var target = this.get('target');

    if (target) {
      this.get('target').send(this.get('action'));
    } else {
      this.sendAction();
    }

    return typeof this.get('bubbles') === 'undefined' || this.get('bubbles') === true;
  }
});
