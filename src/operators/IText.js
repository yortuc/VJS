import { fabric } from "fabric";

export default class IText {
    constructor(text, opt){
      this.opt = opt
      this.text = text
    }
    
    async render() {
      return new Promise(resolve => 
        resolve(new fabric.Text(this.text, (this.opt)))
      )
    }
  }