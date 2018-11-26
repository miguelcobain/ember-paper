import Service from '@ember/service';
import { assert } from '@ember/debug';
import { assign } from '@ember/polyfills';

import PALETTES from 'ember-paper/utils/palettes';
import CONTRASTS from 'ember-paper/utils/contrasts';

import tinycolor from 'tinycolor2';

export default Service.extend({

  init() {
    this._super(...arguments);
    this._themes = {};
  },

  installTheme(name = 'default', theme, selector = ':root') {
    if (this._themes[name]) {
      this.uninstallTheme(name);
    }

    // let's not make the background palette mandatory as it will be the `grey`
    // palette most of the time
    theme = assign({ background: PALETTES.grey }, theme);

    let vars = this.generateCssVariables(theme);

    let css = `
      ${selector} {
        ${vars}
      }
    `;

    let styleElement = document.createElement('style');
    styleElement.setAttribute('id', `paper-theme-${name}`);
    styleElement.type = 'text/css';
    document.head.appendChild(styleElement);
    styleElement.sheet.insertRule(css, 0);

    this._themes[name] = styleElement;
  },

  uninstallTheme(name) {
    assert(`A name is required. \`${name}\` was passed to \`uninstallTheme()\``, !!name);

    let styleElement = this._themes[name];

    assert(`No installed theme with name \`${name}\` was found.`, !!styleElement);

    document.head.removeChild(styleElement);
    delete this._themes[name];
  },

  /**
   * This is essentially a port of the paper-contrast-color sass function.
   *
   * @param {Palette} palette
   * @param {string} hue
   */
  getContrastColor({ contrastDarkColors, contrastLightColors, contrastStrongLightColors, contrastDefaultColor }, hue) {
    if (contrastDarkColors && contrastDarkColors.includes(hue)) {
      return CONTRASTS['dark-contrast-color'];
    } else if (contrastLightColors && contrastLightColors.includes(hue)) {
      return CONTRASTS['light-contrast-color'];
    } else if (contrastStrongLightColors && contrastStrongLightColors.includes(hue)) {
      return CONTRASTS['strong-light-contrast-color'];
    } else {
      return contrastDefaultColor;
    }
  },

  generateCssVariables(theme) {
    return ['primary', 'accent', 'warn', 'background'].reduce((vars, intention) => {
      let palette = theme[intention];

      assert(`A theme must have a \`${intention}\` key containing a palette.`, !!palette);

      let hues = Object.keys(palette).filter((hue) => {
        return hue.indexOf('contrast') === -1;
      });

      return vars += hues.map((hue) => {
        let color = tinycolor(palette[hue]).toRgb();
        let contrast = tinycolor(this.getContrastColor(palette, hue)).toRgb();

        return `
          --${intention}-${hue}: ${color.r}, ${color.g}, ${color.b};
          --${intention}-${hue}-contrast: ${contrast.r}, ${contrast.g}, ${contrast.b};
        `;
      }).join('');
    }, '');
  }
});
