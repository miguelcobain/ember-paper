import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-datepicker-content', 'Integration | Component | paper datepicker content', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{paper-datepicker-content}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#paper-datepicker-content}}
      template block text
    {{/paper-datepicker-content}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
