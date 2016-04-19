import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('paper-autocomplete-list', 'Unit | Component | paper autocomplete list', {
  // Specify the other units that are required for this test
  needs: ['service:util'],
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);

  Ember.$('#qunit-fixture').append('<div id="elId"></div>');

  // Creates the component instance
  let component = this.subject({
    wrapToElementId: 'elId'
  });
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('it sets positional styles on component when toggling hidden attribute', function(assert) {

  // Creates the component instance
  let component = this.subject({
    wrapToElementId: 'elId'
  });
  Ember.$('#qunit-fixture').append('<div id="elId"></div>');

  this.$();
  Ember.run(function() {
    component.set('hidden', false);
  });

  assert.ok(component.$().attr('style'), 'Has styles set by hideSuggestionObserver');

});
