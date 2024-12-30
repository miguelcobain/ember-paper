/**
 * @module ember-paper
 */
import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { action } from '@ember/object';
import { guidFor } from '@ember/object/internals';
import { assert } from '@ember/debug';
import Validation from 'ember-paper/lib/validation';
import clamp from 'ember-paper/utils/clamp';

const SELECT_EDGE_MARGIN = 8;

function getOffsetRect(node) {
  return node
    ? {
        left: node.offsetLeft,
        top: node.offsetTop,
        width: node.offsetWidth,
        height: node.offsetHeight,
      }
    : { left: 0, top: 0, width: 0, height: 0 };
}

/**
 * @class PaperSelect
 * @extends Component
 */
export default class PaperSelect extends Component {
  /**
   * tracks the validity of an input.
   *
   * @type {Validation}
   * @private
   */
  validation;

  /**
   * The parent this component is bound to.
   *
   * @type {PaperRadioGroup|PaperForm|PaperItem|PaperTabs}
   * @private
   */
  #parent;
  /**
   * Marks whether the component should register itself to the supplied parent.
   *
   * @type {Boolean}
   * @public
   */
  shouldRegister;

  /**
   * true after having animated scaling out the element.
   *
   * @type {boolean}
   */
  @tracked didAnimateScale;
  /**
   * true when the element is currently focused.
   *
   * @type {boolean}
   */
  @tracked isFocused;

  constructor(owner, args) {
    super(owner, args);

    this.didAnimateScale = false;
    this.isFocused = false;

    const elementId =
      this.args.elementId || this.args.inputElementId || guidFor(this);

    // Construct Input Validation and pass through of custom attributes.
    this.validation = new Validation(
      elementId,
      this.args.onValidityChange || null,
      this.args.validations,
      this.args.customValidations,
      this.args.errors,
      this.args.errorMessages,
      this.args.isTouched
    );

    if (this.shouldRegister) {
      assert(
        'A parent component should be supplied to <PaperInput> when shouldRegister=true',
        this.args.parentComponent
      );
      this.#parent = this.args.parentComponent;
    }

    assert(
      '<PaperSelect> requires an `onChange` action or null for no action.',
      this.args.onChange !== undefined
    );
  }

  /**
   * Performs any required DOM setup.
   *
   * @param {HTMLElement} element - the node that has been added to the DOM.
   */
  @action didInsertNode() {
    // setValue ensures that the input value is the same as this.value
    this.validation.value = this.args.selected;

    if (this.shouldRegister) {
      this.#parent.registerChild(this);
    }
  }

  /**
   * didUpdateNode is called when tracked component attributes change.
   */
  @action didUpdateNode() {
    // update validation checking
    if (this.args.errors) {
      this.validation.errors = this.args.errors;
    }

    this.validation.value = this.args.selected;
    this.validation.validate(this.args);
    this.validation.notifyOnChange();
  }

  /**
   * Performs any required DOM teardown.
   *
   * @param {HTMLElement} element - the node to be removed from the DOM.
   */
  @action willDestroyNode() {
    // noop
  }

  /**
   * lifecycle hook to perform non-DOM related teardown.
   */
  willDestroy() {
    super.willDestroy(...arguments);

    if (this.shouldRegister) {
      this.#parent.unregisterChild(this);
    }
  }

  get isFocusedAndSelected() {
    return this.isFocused && this.args.isSelected;
  }

  @action handleClose() {
    this.didAnimateScale = false;

    this.validation.isTouched = true;
    this.validation.value = this.args.selected;
    this.validation.validate(this.args);
    this.validation.notifyOnValidityChange();
  }

  @action handleOpen() {
    this.didAnimateScale = false;

    this.validation.notifyOnValidityChange();
  }

  @action handleFocus() {
    this.isFocused = true;
  }

  @action handleBlur() {
    this.isFocused = false;
  }

  @action calculatePosition(trigger, content) {
    let opts = {
      target: trigger,
      parent: document.body,
      selectEl: content.querySelector('md-select-menu'),
      contentEl: content.querySelector('md-content'),
    };

    let containerNode = content;
    let targetNode = opts.target.firstElementChild; // target the label
    let parentNode = opts.parent;
    let selectNode = opts.selectEl;
    let contentNode = opts.contentEl;
    let parentRect = parentNode.getBoundingClientRect();
    let targetRect = targetNode.getBoundingClientRect();
    let shouldOpenAroundTarget = false;
    let bounds = {
      left: parentRect.left + SELECT_EDGE_MARGIN,
      top: SELECT_EDGE_MARGIN,
      bottom: parentRect.height - SELECT_EDGE_MARGIN,
      right: parentRect.width - SELECT_EDGE_MARGIN,
    };
    let spaceAvailable = {
      top: targetRect.top - bounds.top,
      left: targetRect.left - bounds.left,
      right: bounds.right - (targetRect.left + targetRect.width),
      bottom: bounds.bottom - (targetRect.top + targetRect.height),
    };
    let maxWidth = parentRect.width - SELECT_EDGE_MARGIN * 2;
    let selectedNode = selectNode.querySelector('md-option[selected]');
    let optionNodes = selectNode.getElementsByTagName('md-option');
    let optgroupNodes = selectNode.getElementsByTagName('md-optgroup');

    let centeredNode, left, top, transformOrigin;

    // If a selected node, center around that
    if (selectedNode) {
      centeredNode = selectedNode;
      // If there are option groups, center around the first option group
    } else if (optgroupNodes.length) {
      centeredNode = optgroupNodes[0];
      // Otherwise, center around the first optionNode
    } else if (optionNodes.length) {
      centeredNode = optionNodes[0];
      // In case there are no options, center on whatever's in there... (eg progress indicator)
    } else {
      centeredNode = contentNode.firstElementChild || contentNode;
    }

    if (contentNode.offsetWidth > maxWidth) {
      contentNode.style['max-width'] = `${maxWidth}px`;
    }
    if (shouldOpenAroundTarget) {
      contentNode.style['min-width'] = `${targetRect.width}px`;
    }

    // Remove padding before we compute the position of the menu

    let focusedNode = centeredNode;
    if ((focusedNode.tagName || '').toUpperCase() === 'MD-OPTGROUP') {
      focusedNode =
        optionNodes[0] || contentNode.firstElementChild || contentNode;
      centeredNode = focusedNode;
    }

    // Get the selectMenuRect *after* max-width is possibly set above
    containerNode.style.display = 'block';
    let selectMenuRect = selectNode.getBoundingClientRect();
    let centeredRect = getOffsetRect(centeredNode);

    if (centeredNode) {
      let centeredStyle = window.getComputedStyle(centeredNode);
      centeredRect.paddingLeft = parseInt(centeredStyle.paddingLeft, 10) || 0;
      centeredRect.paddingRight = parseInt(centeredStyle.paddingRight, 10) || 0;
    }

    // Get scrollHeight/offsetHeight *after* container is set with display:block
    let isScrollable = contentNode.scrollHeight > contentNode.offsetHeight;
    if (isScrollable) {
      let scrollBuffer = contentNode.offsetHeight / 2;
      contentNode.scrollTop =
        centeredRect.top + centeredRect.height / 2 - scrollBuffer;

      if (spaceAvailable.top < scrollBuffer) {
        contentNode.scrollTop = Math.min(
          centeredRect.top,
          contentNode.scrollTop + scrollBuffer - spaceAvailable.top
        );
      } else if (spaceAvailable.bottom < scrollBuffer) {
        contentNode.scrollTop = Math.max(
          centeredRect.top + centeredRect.height - selectMenuRect.height,
          contentNode.scrollTop - scrollBuffer + spaceAvailable.bottom
        );
      }
    }

    if (shouldOpenAroundTarget) {
      left = targetRect.left;
      top = targetRect.top + targetRect.height;
      transformOrigin = '50% 0';
      if (top + selectMenuRect.height > bounds.bottom) {
        top = targetRect.top - selectMenuRect.height;
        transformOrigin = '50% 100%';
      }
    } else {
      left = targetRect.left + centeredRect.left - centeredRect.paddingLeft + 2;
      top =
        Math.floor(
          targetRect.top +
            targetRect.height / 2 -
            centeredRect.height / 2 -
            centeredRect.top +
            contentNode.scrollTop
        ) + 2;

      transformOrigin = `${centeredRect.left + targetRect.width / 2}px
        ${
          centeredRect.top + centeredRect.height / 2 - contentNode.scrollTop
        }px 0px`;

      containerNode.style.minWidth = `${
        targetRect.width + centeredRect.paddingLeft + centeredRect.paddingRight
      }px`;
    }

    let containerRect = containerNode.getBoundingClientRect();

    let dropdownTop = clamp(
      bounds.top,
      top,
      bounds.bottom - containerRect.height
    );
    let dropdownLeft = clamp(
      bounds.left,
      left,
      bounds.right - containerRect.width
    );

    let scaleX = Math.min(targetRect.width / selectMenuRect.width, 1.0);
    let scaleY = Math.min(targetRect.height / selectMenuRect.height, 1.0);
    let style = {
      top: dropdownTop,
      left: dropdownLeft,
      // Animate a scale out if we aren't just repositioning
      transform: !this.didAnimateScale
        ? `scale(${scaleX}, ${scaleY})`
        : undefined,
      'transform-origin': transformOrigin,
    };

    this.didAnimateScale = true;

    return { style, horizontalPosition: '', verticalPosition: '' };
  }
}
