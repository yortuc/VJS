import { fabric } from "fabric";

export default class IRect {
    constructor(x, y, w, h){
      this.x = x
      this.y = y
      this.w = w
      this.h = h
    }
    
    async render() {
      return new Promise(resolve => 
        resolve(new fabric.Rect({
          left: this.x,
          top: this.y,
          fill: 'orange',
          width: this.w,
          height: this.h
        }))
      );
    }
  }