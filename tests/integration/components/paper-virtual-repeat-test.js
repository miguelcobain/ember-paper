import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-virtual-repeat', 'Integration | Component | paper virtual repeat', {
  integration: true
});

test('it renders', function(assert) {
  
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });" + EOL + EOL +

  this.render(hbs`{{paper-virtual-repeat}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:" + EOL +
  this.render(hbs`
    {{#paper-virtual-repeat}}
      template block text
    {{/paper-virtual-repeat}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
