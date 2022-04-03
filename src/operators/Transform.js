
export default class Transform {
    
    constructor(x, y, scaleX, scaleY){
      this.x = x
      this.y = y 
      this.scaleX = scaleX
      this.scaleY = scaleY
    }

    async render(item) {
      return new Promise(resolve => {
                
        item.set({
            left: this.x,
            top: this.y,
            scaleX:  this.scaleX,
            scaleY: this.scaleY
        })

        item.addWithUpdate && item.addWithUpdate()

        resolve(item)
      })
    }
} 
