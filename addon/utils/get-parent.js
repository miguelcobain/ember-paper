import Ember from 'ember';
const { get, ViewUtils } = Ember;

// taken from https://github.com/kaliber5/ember-bootstrap/blob/master/addon/utils/get-parent.js
export default function getParent(view) {
  if (get(view, 'tagName') === '') {
    // Beware: use of private API! :(
    if (ViewUtils && ViewUtils.getViewBounds) {
      return ViewUtils.getViewBounds(view).parentElement;
    } else {
      return view._renderNode.contextualElement;
    }
  } else {
    return get(view, 'element').parentNode;
  }
}