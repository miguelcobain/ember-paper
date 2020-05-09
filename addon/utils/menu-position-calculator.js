
import { assert } from '@ember/debug';

const MENU_EDGE_MARGIN = 8;

function firstVisibleChild(node) {
    for (let i = 0; i < node.children.length; ++i) {
        if (window.getComputedStyle(node.children[i]).display !== 'none') {
            return node.children[i];
        }
    }
}

/**
 * Calculates the menu position
 */
class MenuPositionCalculator {

    /**
     * Creates an instance of menu position calculator.
     * @param trigger HTMLElement of menu's trigger
     * @param content  HTMLElement of the menu's content
     * @param positionMode Mode to use when calculating position {top: string, left: string}
     * @param offsets Top and left offsets {top: number, left: number}
     * @param didAnimateScale True when the menu has already animated.
     */
    constructor(trigger, content, positionMode, offsets, didAnimateScale) {
        this.trigger = trigger;
        this.content = content;
        this.positionMode = positionMode;
        this.didAnimateScale = didAnimateScale;
        this.offsets = offsets;
        this.position = {};
        this.verticalTransformOrigin = "top"
        this.horizontalTransformOrigin = "";

        this.calcTopPositionMode();
        this.calcLeftPositionMode();
        this.addOffsets();
        this.clampPosition();
    }

    /**
     * Element of the menu originiation
     */
    get originNode() {
        return this.trigger;
    }

    /**
     * Client rec of origin node
     */
    get originNodeRect() {
        return this.originNode.getBoundingClientRect();
    }

    /**
     * Element of menu container
     */
    get containerNode() {
        return this.content;
    }

    /**
     * Element of open menu
     */
    get openMenuNode() {
        return this.content.firstElementChild;
    }

    /**
     * Client rect of open menu
     */
    get openMenuNodeRect() {
        return this.openMenuNode.getBoundingClientRect();
    }

    /**
     * Element in open menu to use for aligning positiong
     */
    get alignTarget() {
        let alignTarget;

        if (this.positionMode.top === 'target' || this.positionMode.left === 'target' || this.positionMode.left === 'target-right') {
            alignTarget = firstVisibleChild(this.openMenuNode);
            if (alignTarget) {
                // TODO: Allow centering on an arbitrary node, for now center on first menu-item's child
                alignTarget = alignTarget.firstElementChild || alignTarget;
                alignTarget = alignTarget.querySelector('md-icon') || alignTarget.querySelector('.md-menu-align-target') || alignTarget;
            }
        }

        return alignTarget;
    }

    /**
     * Client rect
     */
    get alignTargetRect() {
        return this.alignTarget ? this.alignTarget.getBoundingClientRect() : { top: 0, left: 0, right: 0, bottom: 0 };
    }

    /**
     * Element for calculating boundry
     */
    get boundryNode() {
        return document.body;
    }

    /**
     * Client rect of boundry node
     */
    get boundryNodeRect() {
        return this.boundryNode.getBoundingClientRect();
    }

    /**
     * Bounds for menu position
     */
    get bounds() {
        return {
            left: this.boundryNodeRect.left + MENU_EDGE_MARGIN,
            top: Math.max(this.boundryNodeRect.top, 0) + MENU_EDGE_MARGIN,
            bottom: Math.max(this.boundryNodeRect.bottom, Math.max(this.boundryNodeRect.top, 0) + this.boundryNodeRect.height) - MENU_EDGE_MARGIN,
            right: this.boundryNodeRect.right - MENU_EDGE_MARGIN
        };
    }

    /**
     * Transform origin for dropdown position
     */
    get transformOrigin() {
        return this.verticalTransformOrigin + " " + this.horizontalTransformOrigin;
    }

    /**
     * Transofrm for dropdown position
     */
    get transform() {
        let scaleX = Math.round(100 * Math.min(this.originNodeRect.width / this.containerNode.offsetWidth, 1.0)) / 100;
        let scaleY = Math.round(100 * Math.min(this.originNodeRect.height / this.containerNode.offsetHeight, 1.0)) / 100;

        return !this.didAnimateScale ? `scale(${scaleX}, ${scaleY})` : undefined;
    }

    /**
     * Returns the dropdown position used by ember basic dropdown
     */
    get drowdownPosition() {
        let style = {
            top: Math.round(this.position.top),
            left: Math.round(this.position.left),
            // Animate a scale out if we aren't just repositioning
            transform: this.transform,
            'transform-origin': this.transformOrigin
        };

        return { style, horizontalPosition: '', verticalPosition: '' };
    }

    /**
     * Calcs top position based on the top position mode
     */
    calcTopPositionMode() {
        let menuStyle = window.getComputedStyle(this.openMenuNode);

        switch (this.positionMode.top) {
            case 'target':
                this.position.top = this.originNodeRect.top - this.alignTarget.offsetTop;
                break;
            case 'cascade':
                this.position.top = this.originNodeRect.top - parseFloat(menuStyle.paddingTop) - this.originNode.style.top;
                break;
            case 'bottom':
                this.position.top = this.originNodeRect.top + this.originNodeRect.height;
                break;
            default:
                assert(`Invalid target mode '${this.positionMode.top}' specified for paper-menu on Y axis.`);
        }
    }

    /**
     * Calcs left position based on the left position mode
     */
    calcLeftPositionMode() {
        switch (this.positionMode.left) {
            case 'target': {
                this.position.left = this.originNodeRect.left - this.alignTarget.offsetLeft;
                this.horizontalTransformOrigin += 'left';
                break;
            }
            case 'target-left': {
                this.position.left = this.originNodeRect.left;
                this.horizontalTransformOrigin += 'left';
                break;
            }
            case 'target-right': {
                this.position.left = this.originNodeRect.right - this.openMenuNodeRect.width + (this.openMenuNodeRect.right - this.alignTargetRect.right);
                this.horizontalTransformOrigin += 'right';
                break;
            }
            case 'cascade': {
                let willFitRight = (this.originNodeRect.right + this.openMenuNodeRect.width) < this.bounds.right;
                this.position.left = willFitRight ? this.originNodeRect.right - this.originNode.style.left : this.originNodeRect.left - this.originNode.style.left - this.openMenuNodeRect.width;
                this.horizontalTransformOrigin += willFitRight ? 'left' : 'right';
                break;
            }
            case 'right': {
                this.position.left = this.originNodeRect.right - this.openMenuNodeRect.width;
                this.horizontalTransformOrigin += 'right';
                break;
            }
            case 'left': {
                this.position.left = this.originNodeRect.left;
                this.horizontalTransformOrigin += 'left';
                break;
            }
            default: {
                assert(`Invalid target mode '${this.positionMode.left}' specified for paper-menu on X axis.`);
            }
        }
    }

    /**
     * Adds offsets to position
     */
    addOffsets() {
        this.position.top += this.offsets.top;
        this.position.left + this.offsets.left
    }

    /**
     * Clamp position to bounds to handle when menu doesn't fit on the screen
     */
    clampPosition() {
        this.position.top = Math.max(Math.min(this.position.top, this.bounds.bottom - this.containerNode.offsetHeight), this.bounds.top);
        this.position.left = Math.max(Math.min(this.position.left, this.bounds.right - this.containerNode.offsetWidth), this.bounds.left);
    }
}

export default MenuPositionCalculator;
