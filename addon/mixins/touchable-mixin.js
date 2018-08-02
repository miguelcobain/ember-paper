import Mixin from '@ember/object/mixin';
import { get, set } from '@ember/object';

export default Mixin.create({

  useCapture: true,
  draggedOut: false,
  touchable: false,

  didInsertElement(){

    this._super(...arguments);

    if(typeof FastBoot === 'undefined' && get(this, 'touchable')){

      const options = {
        capture: get(this, 'useCapture'),
        passive: false
      };

      this._touchStart = function() {
        this.element.addEventListener('touchmove', get(this, 'didTouchMove').bind(this), {capture: true, passive: true});
      }.bind(this);

      this.element.addEventListener('touchstart', this._touchStart);

      this.element.addEventListener('touchend', get(this, 'didTouchEnd').bind(this), options);

    }

  },

  /*
  * Check on touchmove if the first placed finger is still inside this.element area
  * */
  didTouchMove(e){

    //this.element
    let elemRect = this.element.getBoundingClientRect();
    let { x, y, width: w, height: h } = elemRect;
    let xPlusWidth = x + w;
    let yPlusHeight = y + h;

    //event gesture

    let { pageX, pageY } = e.changedTouches[0];

    // console.log(
    //   `
    //    BOUNDING RECT \n
    //    x: ${x}\n
    //    y: ${y}\n
    //    w: ${w}\n
    //    h: ${h}\n
    //
    //    PLUS\n
    //    xPlusWidth: ${xPlusWidth}\n
    //    yPlusHeight: ${yPlusHeight}\n
    //
    //    TOUCHES\n
    //    pageX: ${pageX}\n
    //    pageY: ${pageY}\n
    //
    //   `
    // );

    //if its already dragged out, ignore
    if(!get(this, 'draggedOut')){
      //Verify if the current touch finger is outside the clientRect
      if( !(pageX >= x && pageX <= xPlusWidth && pageY >= y && pageY <= yPlusHeight) ){
        set(this, 'draggedOut', true);
      }
    }

  },

  /*
  * Verify if the user didn't 'draggedOut' the first placed finger, if so...
  * Stop by all means the event bubbling to avoid ghost clicks
  * and trigger an instantaneous click on the element (to prevent waiting for the default 300ms)
  * */
  didTouchEnd(e){

    this.element.removeEventListener('touchmove', get(this, 'didTouchMove').bind(this));

    e.cancelBubble = true;
    e.returnValue = false;

    e.preventDefault();

    //e.stopPropagation works only in Firefox.
    if (e.stopPropagation) {
      e.stopPropagation();
    }

    //If no exit
    if(!get(this, 'draggedOut')){
      this.element.click();
    }

    if(!this.isDestroyed) {
      set(this, 'draggedOut', false);
    }

    return false;

  },

  /*
  * Tear down event listeners
  * */
  willDestroyElement(){

    this._super(...arguments);

    this.element.removeEventListener('touchmove', get(this, 'didTouchMove').bind(this));
    this.element.removeEventListener('touchstart', this._touchStart);
    this.element.removeEventListener('touchend', get(this, 'didTouchEnd').bind(this));

  },


});
