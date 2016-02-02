var Filter = require('broccoli-filter');

function AngularScssFilter(inputNode, options) {
  Filter.call(this, inputNode, {
    annotation: options.annotation
  });
}

AngularScssFilter.prototype = Object.create(Filter.prototype);
AngularScssFilter.prototype.constructor = AngularScssFilter;
AngularScssFilter.prototype.extensions = ['scss'];
AngularScssFilter.prototype.targetExtension = 'scss';

var PALETTES;
var THEMES;

var DARK_FOREGROUND = {
  name: 'dark',
  '1': 'rgba(0,0,0,0.87)',
  '2': 'rgba(0,0,0,0.54)',
  '3': 'rgba(0,0,0,0.26)',
  '4': 'rgba(0,0,0,0.12)'
};
var LIGHT_FOREGROUND = {
  name: 'light',
  '1': 'rgba(255,255,255,1.0)',
  '2': 'rgba(255,255,255,0.7)',
  '3': 'rgba(255,255,255,0.3)',
  '4': 'rgba(255,255,255,0.12)'
};

var DARK_SHADOW = '1px 1px 0px rgba(0,0,0,0.4), -1px -1px 0px rgba(0,0,0,0.4)';
var LIGHT_SHADOW = 'none';

var DARK_CONTRAST_COLOR = 'rgba(0,0,0,0.87)';
var LIGHT_CONTRAST_COLOR = 'rgba(255,255,255,0.87)';
var STRONG_LIGHT_CONTRAST_COLOR = 'rgb(255,255,255)';

var THEME_COLOR_TYPES = ['primary', 'accent', 'warn', 'background'];
var DEFAULT_COLOR_TYPE = 'primary';


// A color in a theme will use these hues by default, if not specified by user.
var LIGHT_DEFAULT_HUES = {
  'accent': {
    'default': 'A200',
    'hue-1': 'A100',
    'hue-2': 'A400',
    'hue-3': 'A700'
  },
  'background': {
    'default': 'A100',
    'hue-1': '300',
    'hue-2': '800',
    'hue-3': '900'
  }
};

var DARK_DEFAULT_HUES = {
  'background': {
    'default': '800',
    'hue-1': '600',
    'hue-2': '300',
    'hue-3': '900'
  }
};

THEME_COLOR_TYPES.forEach(function(colorType) {
  // Color types with unspecified default hues will use these default hue values
  var defaultDefaultHues = {
    'default': '500',
    'hue-1': '300',
    'hue-2': '800',
    'hue-3': 'A100'
  };
  if (!LIGHT_DEFAULT_HUES[colorType]) {
    LIGHT_DEFAULT_HUES[colorType] = defaultDefaultHues;
  }
  if (!DARK_DEFAULT_HUES[colorType]) {
    DARK_DEFAULT_HUES[colorType] = defaultDefaultHues;
  }
});

var VALID_HUE_VALUES = [
  '50', '100', '200', '300', '400', '500', '600',
  '700', '800', '900', 'A100', 'A200', 'A400', 'A700'
];

AngularScssFilter.prototype.processString = function(content, relativePath) {

  // Get theme name from config?
  var themeName = 'default';

  var newRule = content
    .replace(/THEME_NAME/g, themeName)
    .replace(/'{{.*?}}'/g, function(themeExpression) {
      //remove '{{ and }}'
      themeExpression = themeExpression.substr(0, themeExpression.length - 3).substr(3);
      var params = themeExpression.split('-').map(function(p) {
        return p.trim();
      });

      var colorType = params[0];
      var hue = params[1];

      if (hue === 'color') {
        // Get the default value
        // TODO: Support for dark themes?
        hue = LIGHT_DEFAULT_HUES[colorType]['default'];
      }

      var colorExp = 'color($' + colorType;

      // Find and replace simple variables where we use a specific hue
      if (hue !== 'color' && hue !== undefined) {

        // TODO: Support for dark themes?
        // find and replace simple variables where we use a specific hue
        if (colorType === 'foreground') {
          if (hue === 'shadow') {
            colorExp = LIGHT_SHADOW;
          } else {
            colorExp = DARK_FOREGROUND[hue] || DARK_FOREGROUND['1'];
          }
        } else {
          colorExp += ', "' + hue + '"' + ')';
        }

      } else {
        colorExp += ')';
      }

      if (params[2] !== undefined) {
        colorExp = 'rgba(' + colorExp + ', ' + params[2] + ')';
      }

      return colorExp;
    });

  if (themeName === 'default') {
    var themeRuleRegex = /((?:(?:(?: |>|\.|\w|-|:|\(|\)|\[|\]|"|'|=)+) )?)((?:(?:\w|\.|-)+)?)\.md-default-theme((?: |>|\.|\w|-|:|\(|\)|\[|\]|"|'|=)*)/g;
    newRule = newRule.replace(themeRuleRegex, function(match, prefix, target, suffix) {
      return match + ', ' + prefix + target + suffix;
    });

  }

  return newRule;

};

module.exports = AngularScssFilter;
