// ...

// searchText is received from the autocomplete component, this is
// what the user typed in the input field.
dataFromPromise: Ember.computed('filterText', function() {
  let filterText = this.get('filterText');
  return this.store.query('country', {
    name: filterText
  });
}),
actions: {
  updateFilter(str) {
    this.set('filterText', str);
  }
}

// ...
