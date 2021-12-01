
export default {
  range: function(start, end, step=1) {
    const ret = []
    for(let i=start; i<end; i += step){
      ret.push(i)
    }
    return ret
  }
}