import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { and, not } from '@ember/object/computed';

import PALETTES from 'ember-paper/utils/palettes';
import { computed } from '@ember/object';

export default Controller.extend({
  paperTheme: inject(),

  palettes: computed(function() {
    return Object.keys(PALETTES).map((key) => {
      let palette = PALETTES[key];
      return {
        name: key,
        palette
      };
    });
  }),

  isValid: and('primary', 'accent', 'warn'),
  isInvalid: not('isValid'),

  primary: computed('palettes.@each.name', function() {
    return this.get('palettes').find((p) => p.name === 'pink');
  }),

  accent: computed('palettes.@each.name', function() {
    return this.get('palettes').find((p) => p.name === 'green');
  }),

  warn: computed('palettes.@each.name', function() {
    return this.get('palettes').find((p) => p.name === 'red');
  }),

  actions: {
    // BEGIN-SNIPPET theme.service
    installTheme() {
      this.get('paperTheme').installTheme('main', {
        primary: this.get('primary').palette,
        accent: this.get('accent').palette,
        warn: this.get('warn').palette
      });
    },

    uninstallTheme() {
      this.get('paperTheme').uninstallTheme('main');
    }
    // END-SNIPPET
  }
});
