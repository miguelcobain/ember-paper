import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, click } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | paper-toaster', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.set('paperToaster', {
      cancelToast() {
      }
    });
  });

  test('it can show an action', async function(assert) {
    assert.expect(2);

    this.set('paperToaster.activeToast', {
      show: true,
      position: 'bottom left',
      duration: 500,
      action: {
        label: 'label',
        primary: true,
        onClick() {
          assert.ok(true, 'onClick is called');
        }
      }
    });

    await render(hbs`{{paper-toaster paperToaster=paperToaster}}`);

    assert.dom('md-toast .md-button').hasText('label');

    await click('md-toast .md-button');
  });

  test('it shows a primary action', async function(assert) {
    this.set('paperToaster.activeToast', {
      show: true,
      position: 'bottom left',
      duration: 500,
      action: {
        label: 'label',
        primary: true,
        onClick: () => {}
      }
    });

    await render(hbs`{{paper-toaster paperToaster=paperToaster}}`);

    assert.dom('md-toast .md-button').hasClass('md-primary');
  });

  test('it shows a accent action', async function(assert) {
    this.set('paperToaster.activeToast', {
      show: true,
      position: 'bottom left',
      duration: 500,
      action: {
        label: 'label',
        accent: true,
        onClick: () => {}
      }
    });

    await render(hbs`{{paper-toaster paperToaster=paperToaster}}`);

    assert.dom('md-toast .md-button').hasClass('md-accent');
  });

  test('it shows a warn action', async function(assert) {
    this.set('paperToaster.activeToast', {
      show: true,
      position: 'bottom left',
      duration: 500,
      action: {
        label: 'label',
        warn: true,
        onClick: () => {}
      }
    });

    await render(hbs`{{paper-toaster paperToaster=paperToaster}}`);

    assert.dom('md-toast .md-button').hasClass('md-warn');
  });
});
