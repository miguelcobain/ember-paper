import Ember from 'ember';
import BasicTrigger from 'ember-basic-dropdown/components/basic-dropdown/trigger';

const { NAME_KEY, computed } = Ember;

const PaperComponent = BasicTrigger.extend({
  tagName: 'md-select',
  attributeBindings: ['disabledAttr:disabled', 'required'],
  disabledAttr: computed('disabled', function() {
    return this.get('disabled') ? 'disabled' : null;
  })
});

PaperComponent[NAME_KEY] = 'paper-select-menu-trigger';

export default PaperComponent;
