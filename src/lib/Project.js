import Code from './Code'
import ShapeCodes from './ShapeCodes'

export default class Project {
  constructor(code){
    this.code = code || new Code(`function init(){
    me.name = "Project 1"
    me.bg = new Color([255, 255, 255])
    me.templates = []
    me.shapes = []
  }

  function render(ctx){
    ctx.clearRect(0, 0 , 800, 600)
    ctx.fillStyle = me.bg.color.hex()
    ctx.fillRect(0, 0, 800, 600)
    me.shapes.map(shape => {
      ctx.save()
      ctx.translate(shape.x, shape.y)
      shape.render(ctx)
      ctx.restore()
    })
  }

  me.init = init
  me.render = render
`)
  }

  updateProjectCode(){
    // re-construct shapes property
    const findRegex = /me.shapes = \[((.|\n)*)\]/g;
    const shapeCodes = this.shapes.map(shape => {
      return "new Renderable(`" + shape.code.code + "`)"
    }).join(",\n")
    const replace = "me.shapes = [" + shapeCodes + "]"
    this.code.code = this.code.code.replace(findRegex, replace)

    // save automatically 
    this.saveToLocalStorage()
  }

  updateTemplates(){
    // re-construct shapes property
    const findRegex = /me.templates = \[((.|\n)*)\]/g;
    const templateCode = ShapeCodes.rectangle(400, 180, 50, 50, "Random Shape")
    const replace = "me.templates = [\`" + templateCode + "\`]"
    this.code.code = this.code.code.replace(findRegex, replace)
  }

  saveToLocalStorage(){
    // we can give different keys for different projects
    // or, multiple projects can be saved in one go.
    localStorage.setItem("vjs_project", this.code.code)
  }

  loadFromLocalStorage(){
    this.code.code = localStorage.getItem("vjs_project") || this.code.code
  }
}