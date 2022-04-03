export default class Modifier{
    
    constructor(prop, start, end){
      this.prop = prop
      this.start = start
      this.end = end
    }

    async render(item) {
      return new Promise(resolve => {

        const objects = item.getObjects()
        const step = (this.end - this.start)/objects.length
        for(let i = 0; i < objects.length; i++){
          const val = this.start + i * step
          objects[i].set(this.prop, val)
        }
        item.addWithUpdate()
        resolve(item)
        
      })
    }
} 
