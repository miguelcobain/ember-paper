import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('paper-autocomplete', 'Unit | Component | paper autocomplete', {
  // Specify the other units that are required for this test
  needs: [
    'service:util',
    'service:sniffer',
    'service:constants',
    'component:paper-autocomplete-list',
    'component:paper-autocomplete-item',
    'component:paper-autocomplete-highlight',
    'component:paper-progress-linear',
    'component:paper-button',
    'component:paper-icon'
  ],
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  var component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');

});

test('it propagates placeholder to input box', function(assert) {
  assert.expect(1);

  // Creates the component instance
  var component = this.subject({
    placeholder: "Testing"
  });

  this.render();
  assert.equal(component.$().find('input').attr('placeholder'), 'Testing', 'Sets correct placeholder on input box.');
});


