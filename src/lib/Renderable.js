import Code from './Code'


export default class Renderable {
  constructor(code){
    this.code = new Code(code)
  }
}