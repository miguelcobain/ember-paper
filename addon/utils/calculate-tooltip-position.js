export default function calculateTooltipPosition(tooltip, target, position) {
  let panelBounds = tooltip.getBoundingClientRect();
  let panelWidth = panelBounds.width;
  let panelHeight = panelBounds.height;

  let targetBounds = target.getBoundingClientRect();

  let targetLeft = targetBounds.left;
  let targetRight = targetBounds.right;
  let targetWidth = targetBounds.width;

  let positionStyle = {};

  switch (position) {
    case 'top':
    case 'bottom':
      positionStyle.left = targetLeft + (0.5 * targetWidth) - (0.5 * panelWidth);
      break;
    case 'right':
      positionStyle.left = targetRight;
      break;
    case 'left':
      positionStyle.left = targetLeft - panelWidth;
      break;
  }

  let targetTop = targetBounds.top;
  let targetBottom = targetBounds.bottom;
  let targetHeight = targetBounds.height;

  switch (position) {
    case 'right':
    case 'left':
      positionStyle.top = targetTop + (0.5 * targetHeight) - (0.5 * panelHeight);
      break;
    case 'top':
      positionStyle.top = targetTop - panelHeight;
      break;
    case 'bottom':
      positionStyle.top = targetBottom;
      break;
  }

  return positionStyle;
}