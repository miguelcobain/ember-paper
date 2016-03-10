import { moduleForComponent, test } from 'ember-qunit';
import Ember from 'ember';

moduleForComponent('paper-autocomplete', 'Unit | Component | paper autocomplete', {
  // Specify the other units that are required for this test
  needs: [
    'service:util',
    'service:sniffer',
    'service:constants',
    'component:paper-autocomplete-list',
    'component:paper-autocomplete-item',
    'component:paper-autocomplete-highlight',
    'component:paper-progress-linear',
    'component:paper-button',
    'component:paper-icon'
  ],
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

test('it propagates placeholder to input box', function(assert) {
  assert.expect(1);

  // Creates the component instance
  var component = this.subject({
    placeholder: "Testing"
  });

  this.render();
  assert.equal(component.$().find('input').attr('placeholder'), 'Testing', 'Sets correct placeholder on input box.');
});

test('full-text search', function(assert) {
  assert.expect(1);

  // Creates the component instance
  let component = this.subject();
  // Renders the component to the page
  this.render();
  Ember.run(()=>{
    component.set('source', [
      {
        name:'full-text search'
      },
      {
        name:'not full-text search'
      },
      {
        name:'search'
      }
    ]);
    component.set('fullTextSearch',true);
    component.set('lookupKey','name');
    component.set('searchText','search');
    component.set('debouncedSearchText','search');
  });
  assert.equal(component.get('suggestions').length,3);
});

test('non full-text search', function(assert) {
  assert.expect(1);

  // Creates the component instance
  let component = this.subject();
  // Renders the component to the page
  this.render();
  Ember.run(()=>{
    component.set('source', [
      {
        name:'full-text search'
      },
      {
        name:'not full-text search'
      },
      {
        name:'search'
      }
    ]);
    component.set('fullTextSearch',false);
    component.set('lookupKey','name');
    component.set('searchText','search');
    component.set('debouncedSearchText','search');
  });
  assert.equal(component.get('suggestions').length,1);
});

