
export default class Transform {
    
    constructor(x, y, scaleX, scaleY, angle){
      this.x = x
      this.y = y 
      this.scaleX = scaleX
      this.scaleY = scaleY
      this.angle = angle
    }

    async render(item) {
      return new Promise(resolve => {
                
        item.set({
            left: this.x,
            top: this.y,
            scaleX: this.scaleX,
            scaleY: this.scaleY,
            angle: this.angle
        })

        // item.addWithUpdate && item.addWithUpdate()

        resolve(item)
      })
    }
} 
