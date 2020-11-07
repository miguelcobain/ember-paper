import Controller from '@ember/controller';
import { action } from '@ember/object';
import { A } from '@ember/array';

export default class extends Controller {
  items = A([
    { name: 'Afghanistan', code: 'AF' },
    { name: 'Åland Islands', code: 'AX' },
    { name: 'Albania', code: 'AL' },
    { name: 'Algeria', code: 'DZ' },
    { name: 'American Samoa', code: 'AS' },
    { name: 'AndorrA', code: 'AD' },
    { name: 'Angola', code: 'AO' },
    { name: 'Anguilla', code: 'AI' },
    { name: 'Antarctica', code: 'AQ' },
    { name: 'Antigua and Barbuda', code: 'AG' }
  ]);

  @action
  basicSubmitAction() {
    this.set('firstName', '');
    this.set('lastName', '');
    this.set('age', '');
    this.set('selectedCountry', null);
  }

  @action
  disabledSubmitAction() {
    this.set('favoriteLetter', '');
  }

  @action
  customSubmitAction() {
    this.set('favoriteNumber', '');
  }
}
