import Controller from '@ember/controller';
import { A } from '@ember/array';

export default Controller.extend({
  items: A([
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
  ]),

  actions: {
    basicSubmitAction() {
      this.set('firstName', '');
      this.set('lastName', '');
      this.set('age', '');
      this.set('selectedCountry', null);
    },
    disabledSubmitAction() {
      this.set('favoriteLetter', '');
    },
    customSubmitAction() {
      this.set('favoriteNumber', '');
    }
  }
});
