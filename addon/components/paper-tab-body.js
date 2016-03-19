import Ember from 'ember';
const { computed } = Ember;
export default Ember.Component.extend({
  tagName: '',

  wormhole: computed.readOnly('parent.wormhole'),
  activeState: computed.readOnly('parent.activeState'),
  selected: computed.readOnly('parent.selected'),
  index: computed.readOnly('parent.index'),

  actions: {
    setContent(id) {
      this.get('parent').send('setContent', id);
    },
    setHeight(value) {
      this.get('parent').send('setHeight', value);
    },
    identifyTabContent(object) {
      this.get('parent').send('identifyTabContent', object);
    }
  }
});
