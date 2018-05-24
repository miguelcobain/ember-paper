import { A } from '@ember/array';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { click, find, findAll, fillIn, keyEvent } from 'ember-native-dom-helpers';
import $ from 'jquery';

moduleForComponent('paper-chips', 'Integration | Component | paper chips', {
  integration: true,
  beforeEach() {
    this.addItem = (item) => {
      this.get('content').pushObject(item);
    },
    this.removeItem = (item) => {
      this.get('content').removeObject(item);
    };
  }
});

test('renders with correct placeholder', function(assert) {
  assert.expect(1);

  this.render(hbs`{{paper-chips placeholder="Things" onChange=dummyOnChange}}`);

  assert.equal(find('input').placeholder, 'Things');
});

test('arbitrary items should be added by pressing the enter key when no options are given, and should be removable', function(assert) {
  assert.expect(4);

  this.set('content', A([]));

  this.render(hbs`{{#paper-chips
    content=content 
    removeItem=removeItem
    addItem=addItem
    placeholder="Add a name" as |item|
  }}
    {{item}}
  {{/paper-chips}}
  `);

  let input = find('input');
  fillIn(input, 'Gary');
  keyEvent(input, 'keyup', 13);
  assert.equal(findAll('md-chip').length, 1);

  fillIn(input, 'Todd');
  keyEvent(input, 'keyup', 13);

  assert.equal(findAll('md-chip').length, 2);

  // remove a chip
  click(find('button', find('md-chip-remove-container', find('md-chip'))));
  assert.equal(findAll('md-chip').length, 1);

  assert.equal(input.placeholder, 'Add a name');
});

test('arbitrary items should be added and matching options should appear from partial matches when options are given and requireMatch is false', function(assert) {
  assert.expect(7);

  this.set('content', A([]));

  this.set('options', A([
    'Jerry',
    'Janice',
    'Pauline'
  ]));

  this.render(hbs`{{#paper-chips
    content=content 
    options=options
    requireMatch=false
    removeItem=removeItem
    addItem=addItem
    noMatchesMessage="Not found. Click to add."
    placeholder="Add a name" as |item|
  }}
    {{item}}
  {{/paper-chips}}
  `);

  // enter key for a non-option will not add the item
  let input = find('input');
  fillIn(input, 'Gary');
  keyEvent(input, 'keyup', 13);
  assert.equal(findAll('md-chip').length, 0);

  // enter key for a valid option will not add the item
  fillIn(input, 'Janice');
  keyEvent(input, 'keyup', 13);
  assert.equal(findAll('md-chip').length, 0);

  // while we are typing, a partial match should be presented
  fillIn(input, 'Jan');
  let janSuggestions = $('.md-autocomplete-suggestions');
  assert.equal(janSuggestions.find('li')[0].textContent.trim(), 'Janice');

  // clicking the suggestion adds a valid option
  fillIn(input, 'Jane');
  let janeSuggestions = $('.md-autocomplete-suggestions');

  // check the noMatches message
  assert.equal(janeSuggestions.find('li')[0].textContent.trim(), 'Not found. Click to add.');

  // click the message to add "Jane"
  click(janeSuggestions.find('li')[0]);
  assert.equal(findAll('md-chip').length, 1);
  assert.equal(find('.md-chip-content', find('md-chip')).textContent.trim(), 'Jane');

  assert.equal(input.placeholder, 'Add a name');
});

test('only items in the options property should be added when options are given and requireMatch is true', function(assert) {
  assert.expect(5);

  this.set('content', A([]));

  this.set('options', A([
    'Jerry',
    'Janice',
    'Pauline'
  ]));

  this.render(hbs`{{#paper-chips
    content=content 
    options=options
    requireMatch=true
    removeItem=removeItem
    addItem=addItem
    placeholder="Add a name" as |item|
  }}
    {{item}}
  {{/paper-chips}}
  `);

  // enter key for a non-option will not add the item
  let input = find('input');
  fillIn(input, 'Gary');
  keyEvent(input, 'keyup', 13);
  assert.equal(findAll('md-chip').length, 0);

  // enter key for a valid option will not add the item
  fillIn(input, 'Janice');
  keyEvent(input, 'keyup', 13);
  assert.equal(findAll('md-chip').length, 0);

  // clicking the suggestion adds a valid option
  fillIn(input, 'Janice');
  let suggestions = $('.md-autocomplete-suggestions');

  click(suggestions.find('li')[0]);
  assert.equal(findAll('md-chip').length, 1);
  assert.equal(find('.md-chip-content', find('md-chip')).textContent.trim(), 'Janice');

  assert.equal(input.placeholder, 'Add a name');
});
