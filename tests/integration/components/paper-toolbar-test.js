import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('paper-toolbar', 'Integration | Component | paper toolbar', {
  integration: true
});

test('should bind class names correctly', function(assert) {
  // Template block usage:
  this.render(hbs`
    {{#paper-toolbar tall=true}}
      <h2 class="md-toolbar-tools">
        <span>Toolbar: tall, accent</span>
      </h2>
    {{/paper-toolbar}}
  `);

  assert.ok(this.$('md-toolbar').hasClass('md-tall'));
  assert.ok(this.$('md-toolbar').hasClass('md-default-theme'));
});
