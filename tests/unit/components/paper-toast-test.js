import { moduleForComponent, test } from 'ember-qunit';


moduleForComponent('paper-toast', 'Unit | Component | paper toast', {
  unit: true,
  needs: ['service:transition-events']
});

test('it renders', function(assert) {
  assert.expect(2);

  // Creates the component instance
  const component = this.subject();
  assert.equal(component._state, 'preRender');

  // Renders the component to the page
  this.render();
  assert.equal(component._state, 'inDOM');
});

test('it sets positional classes', function(assert) {
  assert.expect(4);

  const component =  this.subject({
    left: true,
    right: true,
    top: true,
    bottom: true
  });
  this.render();

  assert.equal(component.$().hasClass('md-left'), true, 'Has md-left class assigned');
  assert.equal(component.$().hasClass('md-right'), true, 'Has md-right class assigned');
  assert.equal(component.$().hasClass('md-top'), true, 'Has md-top class assigned');
  assert.equal(component.$().hasClass('md-bottom'), true, 'Has md-bottom class assigned');
});
