import { fabric } from "fabric";

export default class Cloner {

    constructor(num){
      this.num = num
    }

    async render(item) {
      const num = this.num

      return new Promise(resolve => {

        function cloneItem(clones){
          if (clones.length === num) {
            const group = new fabric.Group(clones, {});
            resolve(group)
          }
          
          item.clone(function(cloned){
            cloned.set({
              selectable: false,
              evented: false
            })
            cloneItem(clones.concat([cloned]))
          })
        }

        cloneItem([])
      })
    }
  }
  