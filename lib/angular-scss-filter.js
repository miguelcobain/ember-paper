'use strict';

const Filter = require('broccoli-filter');

const VAR_RULE_REGEX = /([^\s]*:.*?)'?"?{{\s*([a-zA-Z]+)-(A?\d+|hue-[0-3]|shadow|default|color|contrast)-?(\d\.?\d*)?(contrast)?\s*}}'?"?(.*?)/g;

const LIGHT_DEFAULT_HUES = {
  'accent': {
    'default': 'A200',
    'hue-1': 'A100',
    'hue-2': 'A400',
    'hue-3': 'A700'
  },
  'background': {
    'default': '50',
    'hue-1': 'A100',
    'hue-2': '100',
    'hue-3': '300'
  }
};

/**
 * Convert expressions like:
 *
 * background-color: '{{background-500-0.2}}';
 *
 * to
 *
 * background-color: '{{background-500-0.2}}';
 */
module.exports = class AngularScssFilter extends Filter {
  constructor(inputNode, options) {
    super(inputNode, { annotation: options.annotation });

    this.extensions = ['scss'];
    this.targetExtension = 'scss';
  }

  processString(content) {
    let themeName = 'default';

    return content
      .replace(/.md-THEME_NAME-theme/g, '')
      .replace(VAR_RULE_REGEX, (match, prefix, colorType, hue, opacity, contrast, suffix) => {

        if (colorType === 'foreground') {
          if (hue == 'shadow') {
            return 'color($foreground, "shadow");';
          } else {
            if (['1', '2', '3', '4'].indexOf(hue) === -1) {
              hue = '1';
            }
            return `${prefix} color($foreground, "${hue}") ${suffix}`;
          }
        }

        // `default` is also accepted as a hue-value, because the background palettes are
        // using it as a name for the default hue.
        if (hue.indexOf('hue') === 0 || hue === 'default') {
          hue = LIGHT_DEFAULT_HUES[colorType][hue];
        }

        let colorFunction = contrast ? 'contrastColor' : 'color';
        let params = [`$${colorType}`];

        if (hue === 'color' || hue === 'contrast') {
          colorFunction = hue === 'contrast' ? 'contrastColor' : 'color';
        } else {
          params.push(`"${hue}"`);
        }

        if (opacity) {
          return `${prefix} rgba(${colorFunction}(${params.join(', ')}), ${opacity}) ${suffix}`;
        } else {
          return `${prefix} ${colorFunction}(${params.join(', ')}) ${suffix}`;
        }
      });
  }
}
