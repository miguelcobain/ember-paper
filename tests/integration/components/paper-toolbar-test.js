import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-toolbar', 'Integration | Component | paper toolbar', {
  integration: true
});

test('uses md-tall class tall=true', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#paper-toolbar tall=true}}
    {{/paper-toolbar}}
  `);

  assert.ok(this.$('md-toolbar').hasClass('md-tall'));
});

test('paper-toolbar-tools uses .md-toolbar-tools class', function(assert) {
  assert.expect(1);

  this.render(hbs`
    {{#paper-toolbar tall=true}}
      {{#paper-toolbar-tools}}
      {{/paper-toolbar-tools}}
    {{/paper-toolbar}}
  `);

  assert.equal(this.$('.md-toolbar-tools').length, 1);
});
