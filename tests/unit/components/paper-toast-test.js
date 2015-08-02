import { moduleForComponent, test } from 'ember-qunit';


moduleForComponent('paper-toast', 'Unit | Component | paper toast', {
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

test('it sets positional classes', function(assert) {
  assert.expect(4);

  var component =  this.subject({
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

test('it sets md-toast-open-top on parent element if top is true', function(assert) {
  assert.expect(1);

  var component =  this.subject({
    top: true
  });
  this.render();

  assert.equal(component.$().parent().hasClass('md-toast-open-top'), true, 'Has md-toast-open-top class assigned to parent element');
});

test('it disregards md-toast-open-* on parent if align-fab is false', function(assert) {
  assert.expect(1);

  var component =  this.subject({
    top: true,
    'align-fab': false
  });
  this.render();

  assert.equal(component.$().parent().hasClass('md-toast-open-top'), false, 'It disregards md-toast-open-top if align-fab = true');
});
