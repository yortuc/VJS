import { fabric } from "fabric";

export default class IRect {
    constructor(opt){
      this.opt = opt
    }
    
    async render() {
      return new Promise(resolve => 
        resolve(new fabric.Rect(this.opt))
      );
    }
  }