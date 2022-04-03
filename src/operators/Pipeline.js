import Transform from "./Transform.js";

export default class Pipeline {
    constructor(ops){
      this.operators = []
      ops.forEach(this.addFlow.bind(this))
    }

    addFlow(flow){
      flow.pipeline = this
      this.operators.push(flow)
    }

    updateTransform(x, y, scaleX, scaleY){
      // does pipeline have a transform operator at the end?
      const lastOp = this.operators[this.operators.length - 1]
      if(lastOp.constructor.name === "Transform"){
        lastOp.x = x
        lastOp.y = y
        lastOp.scaleX = scaleX
        lastOp.scaleY = scaleY
      }
      else{
        const newTransform = new Transform(x, y, scaleX, scaleY)
        newTransform.pipeline = this
        this.operators.push(newTransform)
      }
    }

    async render(){
      // rendering pipeline op1 => op2(op1) ...
      
      let cur = null;

      for(let i = 0; i<this.operators.length; i++){
        cur = await this.operators[i].render(cur)
      }

      // pipeline -> item reference
      this.item = cur

      // item -> pipeline reference
      cur.pipeline = this

      return cur;
    }
  }