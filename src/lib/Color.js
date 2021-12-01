import Colorjs from "color"

export default class Color {
  constructor(p){
    this.color = Colorjs(p)
  }

  toCode(){
    const r = this.color.red()
    const g = this.color.green()
    const b = this.color.blue()

    return `new Color([${r}, ${g}, ${b}])`
  }
}