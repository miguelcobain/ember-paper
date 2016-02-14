import {
  moduleForComponent,
  test
} from 'ember-qunit';

moduleForComponent('paper-button', 'PaperButtonComponent', {
  needs: ['service:util'],
  unit: true
});

test('it renders', function(assert) {
  assert.expect(2);

  // creates the component instance
  let component = this.subject();
  assert.equal(component._state, 'preRender');

  // appends the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');

});
