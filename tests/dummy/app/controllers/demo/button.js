import Ember from 'ember';
const { Controller } = Ember;

export default Controller.extend({
  api: [
    ['onClick', 'closure', 'Action sent when the button is clicked.'],
    ['type', 'string', 'Sets the html5 `type` attribute. Defaults to `"button"`, except for `<a>` link buttons.'],
    ['bubbles', 'boolean', 'Determines whether the Ember click event handler bubbles. Default is `undefined`, which bubbles.'],
    ['disabled', 'boolean', 'Whether the button is displayed as disabled and does not accept clicks.']
  ],
  link: [
    'Link buttons',
    ['href', 'string', 'Displays the button as an `<a>` link to the specified destination URL.'],
    ['target', 'string', 'Sets the `<a>` link target attribute, such as `"_blank"`.']
  ],
  appearance: [
    'Appearance',
    ['fab', 'boolean', 'Display as a Floating Action Button.'],
    ['iconButton', 'boolean', 'Set when the contents contains an icon and adjusts CSS appropriately.'],
    ['label', 'string', 'Set the content of the button when used as a blockless component.'],
    ['mini', 'boolean', 'Display as a mini-sized button. Implies `fab`, unless `fab` is explicity set falsy.'],
    ['noInk', 'boolean', 'Suppresses the ripple effect when clicked.'],
    ['primary', 'boolean', 'Display as the primary button, more prominent that other buttons.'],
    ['raised', 'boolean', 'Display button with a 3-D effect.']
  ],

  actions: {
    raisedButton() {
      alert('You pressed a raised button.');
    },

    flatButton() {
      alert('You pressed a flat button.');
    },

    targetButton() {
      alert('You pressed a target button.');
    }
  }
});
