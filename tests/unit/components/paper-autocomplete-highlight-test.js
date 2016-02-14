import { moduleForComponent, test } from 'ember-qunit';

moduleForComponent('paper-autocomplete-highlight', 'Unit | Component | paper autocomplete highlight', {
  // Specify the other units that are required for this test
  // needs: ['component:foo', 'helper:bar'],
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  let component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('should highlight correct text', function(assert) {
  assert.expect(2);

  let component = this.subject({
    searchText: 'ed S',
    label: 'United States'
  });

  this.render();

  let el = this.$();

  assert.equal(el.html(), 'Unit<span class="highlight">ed S</span>tates', 'Sets correct html with highlight based on searchText');

  assert.equal(component.get('highlight'), 'Unit<span class="highlight">ed S</span>tates', 'Sets highlight based on searchText');

});
