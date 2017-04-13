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

var THEME_COLOR_TYPES = ['primary', 'accent', 'warn', 'background'];

// A color in a theme will use these hues by default, if not specified by user.
var LIGHT_DEFAULT_HUES = {
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

var DARK_DEFAULT_HUES = {
  'background': {
    'default': 'A400',
    'hue-1': '800',
    'hue-2': '900',
    'hue-3': 'A200'
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

AngularScssFilter.prototype.processString = function(content, relativePath) {
  // Get theme name from config?
  var themeName = 'default';

  var newRule = content
    .replace(/THEME_NAME/g, themeName)
    .replace(/'{{(.*?)}}'/g, function(originalExpression, themeExpression) {
      var params = themeExpression.split('-').map(function(p) {
        return p.trim();
      });

      var colorType = params[0];
      var hue = params[1];

      if (hue === 'color' || hue === 'default') {
        // Get the default value
        // TODO: Support for dark themes?
        hue = LIGHT_DEFAULT_HUES[colorType]['default'];
      }

      if (hue === 'hue') {
        hue = params[1] + '-' + params[2];
        hue = LIGHT_DEFAULT_HUES[colorType][hue]
      }

      var colorExp = 'color($' + colorType;

      // Find and replace simple variables where we use a specific hue
      if (hue !== 'color' && hue !== undefined) {
        colorExp += ', "' + hue + '"' + ')';
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
