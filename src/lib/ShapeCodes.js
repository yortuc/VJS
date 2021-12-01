// just templates to init a new shape

export default {
  rectangle: (x, y, w, h, name) => `function init(){
    me.name = "${name}"
    me.w = ${w}
    me.h = ${h}
    me.x = ${x}
    me.y = ${y}
    me.color = new Color([255, 0, 120])
}

function render(ctx){
    ctx.save()
    ctx.fillStyle = me.color.color.hex()
    ctx.fillRect(0, 0, me.w, me.h)
    ctx.restore()
}

me.init = init
me.render = render
`
}