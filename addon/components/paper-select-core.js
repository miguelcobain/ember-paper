import Ember from 'ember';
import PaperMenuAbstract from './paper-menu-abstract';

var SELECT_EDGE_MARGIN = 8;


function clamp(min, n, max) {
  return Math.max(min, Math.min(n, max));
}

function getOffsetRect(node) {
  return node ? {
    left: node.offsetLeft,
    top: node.offsetTop,
    width: node.offsetWidth,
    height: node.offsetHeight
  } : { left: 0, top: 0, width: 0, height: 0 };
}



export default PaperMenuAbstract.extend({
  tagName: 'md-select',
  placeholder: null,

  classNames: ['md-default-theme'],

  attributeBindings: ['tabindex', 'readonlyAttr:readonly', 'multipleAttr:multiple', 'disabledAttr:disabled'],
  disabledAttr: Ember.computed('disabled', function() {
    return this.get('disabled') ? 'disabled' : null;
  }),

  tabindex: Ember.computed('readonly', function() {
    return this.get('readonly') ? -1 : 0;
  }),
  readonly: null,
  multiple: null,

  readonlyAttr: Ember.computed('readonly', function() {
    return this.get('readonly') ? 'readonly' : null;
  }),
  multipleAttr: Ember.computed('multiple', function() {
    return this.get('multiple') ? 'multiple' : null;
  }),

  preventMenuOpen: Ember.computed('disabled', function() {
    return !!this.get('disabled');
  }),

  label: Ember.computed('model', 'itemLabelCallback', function() {
    if (!this.get('model')) {
      return null;
    }
    if (this.get('itemLabelCallback')) {
      return this.get('itemLabelCallback').call(this, this.get('model'));
    }
    return this.get('model');
  }),

  click () {
    this.send('toggleMenu');
  },

  actions: {
    selectOption (model) {
      this.set('model', model);
    },
    deselectOption () {
      this.set('model', null);
    }
  },

  /* @todo move to util */
  floatingScrollbars: Ember.computed(function() {
    var tempNode = Ember.$('<div style="width: 100%; z-index: -1; position: absolute; height: 35px; overflow-y: scroll"><div style="height: 60;"></div></div>');
    Ember.$('body').append(tempNode[0]);
    var hasFloating = (tempNode[0].offsetWidth === tempNode[0].childNodes[0].offsetWidth);
    tempNode.remove();
    return hasFloating;
  }),

  keyDown (e) {
    var KeyCodes = this.get('constants').KEYCODE;
    var allowedCodes = [
      KeyCodes.get('SPACE'),
      KeyCodes.get('ENTER'),
      KeyCodes.get('UP_ARROW'),
      KeyCodes.get('DOWN_ARROW')
    ];

    if (allowedCodes.indexOf(e.keyCode) !== -1 ) {
      // prevent page scrolling on interaction
      e.preventDefault();
      this.send('toggleMenu');
    } else {
      if (e.keyCode <= 90 && e.keyCode >= 31) {
        e.preventDefault();
        /* todo. use paper-select-menu's optNodeForKeyboardSearch.
        var node = this.optNodeForKeyboardSearch(e);
        if (!node) return;
        this.set('focusedNode', node || this.get('focusedNode'));
        if (node) {
          node.focus();
        }*/
      }
    }
  },




  /**
   * Select menu have other animations then "md-menu", so we override the positionMenu here.
   */
  positionMenu(element) {
    if (!this.get('isOpen')) {
      return;
    }
    var _self = this,
      opts = {
      target: this.$(),
      parent: Ember.$('body'),
      selectEl: element.find('md-select-menu'),
      contentEl: element.find('md-content')
    };

    var containerNode = element[0],
      targetNode = opts.target[0].firstElementChild, // target the label
      parentNode = opts.parent[0],
      selectNode = opts.selectEl[0],
      contentNode = opts.contentEl[0],
      parentRect = parentNode.getBoundingClientRect(),
      targetRect = targetNode.getBoundingClientRect(),
      shouldOpenAroundTarget = false,
      bounds = {
        left: parentRect.left + SELECT_EDGE_MARGIN,
        top: SELECT_EDGE_MARGIN,
        bottom: parentRect.height - SELECT_EDGE_MARGIN,
        right: parentRect.width - SELECT_EDGE_MARGIN - (this.get('floatingScrollbars') ? 16 : 0)
      },
      spaceAvailable = {
        top: targetRect.top - bounds.top,
        left: targetRect.left - bounds.left,
        right: bounds.right - (targetRect.left + targetRect.width),
        bottom: bounds.bottom - (targetRect.top + targetRect.height)
      },
      maxWidth = parentRect.width - SELECT_EDGE_MARGIN * 2,
      isScrollable = contentNode.scrollHeight > contentNode.offsetHeight,
      selectedNode = selectNode.querySelector('md-option[selected]'),
      optionNodes = selectNode.getElementsByTagName('md-option'),
      optgroupNodes = selectNode.getElementsByTagName('md-optgroup');


    var centeredNode;
    // If a selected node, center around that
    if (selectedNode) {
      centeredNode = selectedNode;
      // If there are option groups, center around the first option group
    } else if (optgroupNodes.length) {
      centeredNode = optgroupNodes[0];
      // Otherwise, center around the first optionNode
    } else if (optionNodes.length){
      centeredNode = optionNodes[0];
      // In case there are no options, center on whatever's in there... (eg progress indicator)
    } else {
      centeredNode = contentNode.firstElementChild || contentNode;
    }

    if (contentNode.offsetWidth > maxWidth) {
      contentNode.style['max-width'] = maxWidth + 'px';
    }
    if (shouldOpenAroundTarget) {
      contentNode.style['min-width'] = targetRect.width + 'px';
    }

    // Remove padding before we compute the position of the menu
    if (isScrollable) {
      selectNode.classList.add('md-overflow');
    }

    var focusedNode = centeredNode;
    if ((focusedNode.tagName || '').toUpperCase() === 'MD-OPTGROUP') {
      focusedNode = optionNodes[0] || contentNode.firstElementChild || contentNode;
      centeredNode = focusedNode;
    }

    // Get the selectMenuRect *after* max-width is possibly set above
    var selectMenuRect = selectNode.getBoundingClientRect();
    var centeredRect = getOffsetRect(centeredNode);


    if (centeredNode) {
      var centeredStyle = window.getComputedStyle(centeredNode);
      centeredRect.paddingLeft = parseInt(centeredStyle.paddingLeft, 10) || 0;
      centeredRect.paddingRight = parseInt(centeredStyle.paddingRight, 10) || 0;
    }


    if (isScrollable) {
      var scrollBuffer = contentNode.offsetHeight / 2;
      contentNode.scrollTop = centeredRect.top + centeredRect.height / 2 - scrollBuffer;

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

    var left, top, transformOrigin;
    if (shouldOpenAroundTarget) {
      left = targetRect.left;
      top = targetRect.top + targetRect.height;
      transformOrigin = '50% 0';
      if (top + selectMenuRect.height > bounds.bottom) {
        top = targetRect.top - selectMenuRect.height;
        transformOrigin = '50% 100%';
      }
    } else {
      left = (targetRect.left + centeredRect.left - centeredRect.paddingLeft) + 2;
      top = Math.floor(targetRect.top + targetRect.height / 2 - centeredRect.height / 2 -
          centeredRect.top + contentNode.scrollTop) + 2;


      transformOrigin = (centeredRect.left + targetRect.width / 2) + 'px ' +
        (centeredRect.top + centeredRect.height / 2 - contentNode.scrollTop) + 'px 0px';

      containerNode.style.minWidth = targetRect.width + centeredRect.paddingLeft +
        centeredRect.paddingRight + 'px';
    }

    // Keep left and top within the window
    var containerRect = containerNode.getBoundingClientRect();
    containerNode.style.left = clamp(bounds.left, left, bounds.right - containerRect.width) + 'px';
    containerNode.style.top = clamp(bounds.top, top, bounds.bottom - containerRect.height) + 'px';
    selectNode.style[this.get('constants').get('CSS').TRANSFORM_ORIGIN] = transformOrigin;

    selectNode.style[this.get('constants').get('CSS').TRANSFORM] = 'scale(' +
      Math.min(targetRect.width / selectMenuRect.width, 1.0) + ',' +
      Math.min(targetRect.height / selectMenuRect.height, 1.0) +
      ')';


    window.requestAnimationFrame(function() {
      element.addClass('md-active');
      selectNode.style[_self.get('constants').get('CSS').TRANSFORM] = '';
      if (focusedNode && !focusedNode.hasAttribute('disabled')) {
        _self.set('focusedNode', focusedNode);
        focusedNode.focus();
      }
    });
  }



});
