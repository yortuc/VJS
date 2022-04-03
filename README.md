BUGS:

  + After resizing a group, rerender cannot produce the same height & width. ==> SOlved using scaleX and scaleY props


TODO:
  - More modifiers:
    - Numeric modifier
    - Color modifier

    Modifier is working as a linear way.
    Create more distribution types. 
        Linear, 
        Bell curve,
        custom
        etc...


Can we create previews of each step?

Instead of vertical inspector, maybe horizontal inspector makes more sense. 


Stream Analogy:
===============

    Rectangle is a Source.

    Cloner is a Flow (one input, one output)

     There can be different Flow types like multiple input, single output. Like creating a group. 

    End result fabric object is the Sink.

    Branching should be possible. 

    == read more about reactive streams ==



const createRect = new IRect(100, 100)
const cloneRect = new Cloner(5)
const createRow = new Modifier("left", 0, 300)
const cloneRow = new Cloner(3)
const createSq = new Modifier("top", 0, 200)
const sqOpacity = new Modifier("opacity", 0.3, 1.0)


const p1 = new Pipeline([
    createRect, 
    cloneRect, 
    createRow, 
    cloneRow, 
    createSq,
    sqOpacity,
    new Cloner(12),
    new Modifier("angle", 0, 360)
])


p1.render()
  .then(r => {
    // add a ref to the pipeline from fabric object
    r.pipeline = p1
    editor.canvas.add(r)
  })