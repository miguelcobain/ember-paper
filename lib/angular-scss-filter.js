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

function colorMixinExpression(colorTypeExpression, hueExpression, opacity) {
  var colorSegments = [colorTypeExpression, hueExpression].filter(function(segment) { return !!segment && segment.length > 0; });
  var result;
  if (hueExpression === '"contrast"') {
    result = 'contrastColor(' + colorTypeExpression + ')';
  } else if (opacity === 'contrast') {
    return 'contrastColor(' + colorTypeExpression + ', ' + hueExpression + ')';
  } else {
    result = 'color(' + colorSegments.join(', ') + ')';
  }
  if (opacity !== undefined) {
    result = 'rgba(' + result + ', ' + opacity + ')';
  }
  return result;
}

AngularScssFilter.prototype.processString = function(content, _relativePath) {
  var themeName = 'default';

  var newRule = content
    .replace(/THEME_NAME/g, themeName)
    .replace(/'{{(.*?)}}'/g, function(originalExpression, themeExpression) {
      var params = themeExpression.split('-').map(function(p) {
        return p.trim();
      });

      var colorType = params[0];
      var hue = params[1];
      var opacity = params[2];

      var colorTypeExpression = '$' + colorType;

      var hueExpression;
      if (hue === 'color' || hue === 'hue') {
        hueExpression = null;
      } else {
        hueExpression = '"' + hue + '"';
      }

      return colorMixinExpression(colorTypeExpression, hueExpression, opacity);
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
