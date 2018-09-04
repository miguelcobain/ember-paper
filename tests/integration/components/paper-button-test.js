import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, triggerEvent } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper button', function(hooks) {
  setupRenderingTest(hooks);

  test('renders block label', async function(assert) {
    await render(hbs`
      {{#paper-button}}
        Block label
      {{/paper-button}}
    `);
    assert.equal(this.$('button').text().trim(), 'Block label');
  });

  test('renders inline label', async function(assert) {
    await render(hbs`
      {{paper-button label='Inline label'}}
    `);
    assert.equal(this.$('button').text().trim(), 'Inline label');
  });

  test('renders type button by default', async function(assert) {
    await render(hbs`
      {{paper-button label='Inline label'}}
    `);
    assert.equal(this.$('button').attr('type'), 'button');
  });

  test('triggers onClick function when attribute is present', async function(assert) {
    assert.expect(1);

    this.set('foo', () => {
      assert.ok(true);
    });
    await render(hbs`
      {{#paper-button onClick=foo}}
        A label
      {{/paper-button}}
    `);
    this.$('.md-button').click();
  });

  test('does nothing onClick if attribute is not present', async function(assert) {
    assert.expect(0);

    await render(hbs`
      {{#paper-button}}
        A label
      {{/paper-button}}
    `);
    this.$('.md-button').click();
  });

  test('uses md-raised class when raised=true', async function(assert) {
    await render(hbs`
      {{#paper-button raised=true}}
        A label
      {{/paper-button}}
    `);
    assert.ok(this.$('.md-button').hasClass('md-raised'));
  });

  test('triggers onClick function if attribute touchable is true and touchend event is fired', async function(assert) {

    assert.expect(1);

    this.set('foo', () => {
      assert.ok(true);
    });

    await this.render(hbs`
      {{#paper-button onClick=foo touchable=true}}
        A label
      {{/paper-button}}
    `);

    await triggerEvent('.md-button', 'touchend');

  });

  test('does nothing onClick if attribute touchable is false and touchend event is fired', async function(assert) {

    assert.expect(0);

    this.set('foo', () => {
      assert.ok(true);
    });

    await this.render(hbs`
      {{#paper-button onClick=foo touchable=false}}
        A label
      {{/paper-button}}
    `);

    await triggerEvent('.md-button', 'touchend');

  });

  test('uses md-raised class when raised=true', function(assert) {
    this.render(hbs`
    {{#paper-button raised=true}}
      A label
    {{/paper-button}}
  `);
    assert.ok(this.$('.md-button').hasClass('md-raised'));
  });

  test('uses md-icon-button class when iconButton=true', async function(assert) {
    await render(hbs`
      {{#paper-button iconButton=true}}
        A label
      {{/paper-button}}
    `);
    assert.ok(this.$('.md-button').hasClass('md-icon-button'));
  });

  test('uses md-fab class when fab=true', async function(assert) {
    await render(hbs`
      {{#paper-button fab=true}}
        A label
      {{/paper-button}}
    `);
    assert.ok(this.$('.md-button').hasClass('md-fab'));
  });

  test('uses md-mini and md-fab class when mini=true', async function(assert) {
    await render(hbs`
      {{#paper-button mini=true}}
        A label
      {{/paper-button}}
    `);
    assert.ok(this.$('.md-button').is('.md-fab', '.md-mini'));
  });

  test('uses a tag when href is specified', async function(assert) {
    await render(hbs`
      {{#paper-button href="http://example.com"}}
        A label
      {{/paper-button}}
    `);
    assert.ok(this.$('.md-button').is('a'));
    assert.ok(this.$('.md-button').attr('href') === 'http://example.com');
  });

  test('renders target', async function(assert) {
    await render(hbs`
      {{#paper-button href="http://example.com" target="_blank"}}
        A label
      {{/paper-button}}
    `);
    assert.ok(this.$('.md-button').is('a'));
    assert.ok(this.$('.md-button').attr('target') === '_blank');
  });
});
