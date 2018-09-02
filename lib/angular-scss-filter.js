'use strict';

const Filter = require('broccoli-filter');

const LINE_RULE_REGEX = /.*{{.*}}.*/g;
const EXPRESSION_REGEX = /(?:'|"|'\\'){{\s*([a-zA-Z]+)-(A?\d+|hue-[0-3]|shadow|default|color|contrast)-?(\d\.?\d*)?(contrast)?\s*}}(?:'|"|\\'')/g;

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

module.exports = class AngularScssFilter extends Filter {
  constructor(inputNode, options) {
    super(inputNode, { annotation: options.annotation });

    this.extensions = ['scss'];
    this.targetExtension = 'scss';
  }

  replaceExpression(match, colorType, hue, opacity, contrast) {
    // `default` is also accepted as a hue-value, because the background palettes are
    // using it as a name for the default hue.
    if (hue.indexOf('hue') === 0 || hue === 'default') {
      hue = LIGHT_DEFAULT_HUES[colorType][hue];
    }

    if (hue === 'color') {
      hue = '500';
    }

    let colorFunction = hue === 'contrast' || contrast ? 'paper-contrast-color' : 'paper-color';
    let params = [`$${colorType}`];

    if (hue !== 'contrast' && !contrast) {
      params.push(`"${hue}"`);
    }

    if (opacity) {
      return `rgba(paper-color(${params.join(', ')}), ${opacity})`;
    } else {
      return `${colorFunction}(${params.join(', ')})`;
    }
  }

  replaceExpressionCssVar(match, colorType, hue, opacity, contrast) {
    // `default` is also accepted as a hue-value, because the background palettes are
    // using it as a name for the default hue.
    if (hue.indexOf('hue') === 0 || hue === 'default') {
      hue = LIGHT_DEFAULT_HUES[colorType][hue];
    }

    if (hue === 'contrast') {
      contrast = true;
    }

    if (hue === 'color' || hue === 'contrast') {
      hue = '500';
    }

    // special case for foreground since this "palette" has the
    // full valid color and not "r, g, b" values. So we need to
    // use the variable directly without RGB or RGBA functions.
    if (colorType === 'foreground') {
      return `var(--foreground-${hue})`;
    }

    if (opacity) {
      return `RGBA(var(--${colorType}-${hue}${contrast ? '-contrast' : ''}), ${opacity})`;
    } else {
      return `RGB(var(--${colorType}-${hue}${contrast ? '-contrast' : ''}))`;
    }
  }

  sanitizeLine(line) {
    line = line.trim();

    if (line.charAt(line.length - 1) !== ';') {
      line = `${line};`;
    }

    return line;
  }

  processString(content) {
    return content
      // remove theme selectors (we don't use them for theming)
      .replace(/.md-THEME_NAME-theme/g, '')
      .replace(LINE_RULE_REGEX, (line) => {

        // sanitize line. Some lines do not end with ; like they should
        // and that causes css/sass errors
        line = this.sanitizeLine(line);

        // replace expressions with fallback values and css variables for dynamic theming
        return `
          ${line.replace(EXPRESSION_REGEX, this.replaceExpression)}
          ${line.replace(EXPRESSION_REGEX, this.replaceExpressionCssVar)}
        `;
      })
      // remove unquote from mixins.scss since we need the proper
      // sass variable and not a string
      .replace('color: unquote($color);', 'color: $color;');
  }
}
