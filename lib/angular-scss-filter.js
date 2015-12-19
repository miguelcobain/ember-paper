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

AngularScssFilter.prototype.processString = function(content, relativePath) {
  return content
    .replace('THEME_NAME', '#{$theme-name}')
    .replace(/'{{.*?}}'/g, function(themeExpression) {
      //remove '{{ and }}'
      themeExpression = themeExpression.substr(0, themeExpression.length - 3).substr(3);
      var params = themeExpression.split('-').map(function(p) {
        return p.trim();
      });


      var colorExp = 'color($' + params[0];

      if (params[1] !== 'color' && params[1] !== undefined) {
        colorExp += ', "' + params[1] + '"';
      }

      colorExp += ')';

      if (params[2] !== undefined) {
        colorExp = 'rgba(' + colorExp + ', ' + params[2] + ')';
      }

      return colorExp;
    });
};

module.exports = AngularScssFilter;
