import { fabric } from "fabric";

export default class ICircle {
    constructor(opt){
      this.opt = opt
    }
    
    async render() {
      return new Promise(resolve => 
        resolve(new fabric.Circle(this.opt))
      );
    }
  }