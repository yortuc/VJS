export class ColorStop {
  constructor(ratio, color){
    this.ration = ratio
    this.color = color
  }
}

export class Gradient {
  constructor(colorStops){
    this.colorSteps = colorStops || []
  }

  addStop(colorStop){
    this.colorStops.push(colorStop)
  }

  get(){
    const gradient = ctx.createLinearGradient(20, 0, 220, 0);

    this.colorStops.foreach(stop => 
      gradient.addColorStop(stop.ratio, stop.color.color.hex()))

    return gradient
  }

  toCode(){
    const stops = this.colorStops.map(stop => stop.toCode()).join(",")
    return `new Gradient([${stops}])`
  }
}