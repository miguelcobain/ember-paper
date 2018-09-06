import tinycolor from 'tinycolor2';

// Utility function to combine two rgb objects via Multiply
function multiply(rgb1, rgb2) {
  rgb1.b = Math.floor(rgb1.b * rgb2.b / 255);
  rgb1.g = Math.floor(rgb1.g * rgb2.g / 255);
  rgb1.r = Math.floor(rgb1.r * rgb2.r / 255);
  return tinycolor(`rgb ${rgb1.r} ${rgb1.g} ${rgb1.b}`);
}

export default function generatePalette(base) {
  let baseLight = tinycolor('#ffffff');
  let baseDark = multiply(tinycolor(base).toRgb(), tinycolor(base).toRgb());
  let baseTriad = tinycolor(base).tetrad();

  let palette = {
    '50': tinycolor.mix(baseLight, base, 12),
    '100': tinycolor.mix(baseLight, base, 30),
    '200': tinycolor.mix(baseLight, base, 50),
    '300': tinycolor.mix(baseLight, base, 70),
    '400': tinycolor.mix(baseLight, base, 85),
    '500': tinycolor.mix(baseLight, base, 100),
    '600': tinycolor.mix(baseDark, base, 87),
    '700': tinycolor.mix(baseDark, base, 70),
    '800': tinycolor.mix(baseDark, base, 54),
    '900': tinycolor.mix(baseDark, base, 25),
    'A100': tinycolor.mix(baseDark, baseTriad[4], 15).saturate(80).lighten(65),
    'A200': tinycolor.mix(baseDark, baseTriad[4], 15).saturate(80).lighten(55),
    'A400': tinycolor.mix(baseDark, baseTriad[4], 15).saturate(100).lighten(45),
    'A700': tinycolor.mix(baseDark, baseTriad[4], 15).saturate(100).lighten(40)
  };

  let contrastDarkColors = [];
  let contrastStrongLightColors = [];

  Object.keys(palette).forEach((key) => {
    let color = palette[key];

    // compute the contrast of this color
    if (color.isLight()) {
      contrastDarkColors.push(key);
    } else {
      contrastStrongLightColors.push(key);
    }

    // convert color to string representation, prefer hex.
    if (color.getAlpha() === 1) {
      palette[key] = color.toHexString();
    } else {
      palette[key] = color.toRgbString();
    }
  });

  palette.contrastDarkColors = contrastDarkColors;
  palette.contrastStrongLightColors = contrastStrongLightColors;

  return palette;
}
