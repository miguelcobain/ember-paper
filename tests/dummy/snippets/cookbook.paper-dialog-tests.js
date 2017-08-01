moduleForComponent('your-component', 'Integration | Component | your component', {
  integration: true,
  beforeEach() {
    this.$dialog = (selector) => document.querySelector('#paper-wormhole').querySelector(selector);
  }
});

test('it displays dialog title', function(assert) {
  this.render(hbs`<div id="paper-wormhole"></div>{{your-component}}`);

  assert.equal(this.$dialog('h1').text(), 'Dialog title', 'Check h1 in paper-dialog');
});
