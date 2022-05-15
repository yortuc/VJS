import React from 'react';
import './PropInspector.css';
import Bus from './Bus';
import Cloner from "./operators/Cloner.js";
import Modifier from "./operators/Modifier.js";


function SourceProps({ item }){
  const sourceOp = item.pipeline.operators[0]
  const opt = sourceOp.opt

  function sourcePropChanged(prop, newVal){
    Bus.publish("editor/source/propChanged", { sourceOp, prop, newVal })
  }

  return (
    <>
      <b className='tool-title'>Source Props</b>
      <div className='pipeline-list'>
        <div className='pipeline-list-item'>
          <span>
          <b>Rect</b>
          fill: <input id={"source-fill-color"} type="color" value={opt.fill} onChange={(e) => { sourcePropChanged("fill", e.target.value) }} />
          rx: <input id={"source-rx"} type="number" value={opt.rx || 0} onChange={(e) => { sourcePropChanged("rx", e.target.value) }}/> 
          ry: <input id={"source-ry"} type="number" value={opt.ry || 0} onChange={(e) => { sourcePropChanged("ry", e.target.value) }}/>
          </span>
        </div>

        <div className='pipeline-list-item'>
          <span>
          <b>Stroke</b> 
          width: <input id={"source-stroke-width"} type="number" value={opt.strokeWidth || 0} onChange={(e) => { sourcePropChanged("strokeWidth", e.target.value) }} />
          color: <input id={"source-stroke-color"} type="color" value={opt.stroke} onChange={(e) => { sourcePropChanged("stroke", e.target.value) }} />
          </span>
        </div>
      </div>
    </>
  )
}

function PipelineInspector({item}){
  return (
    <>
      <b className='tool-title'>Pipeline</b>
      <div className='pipeline-list'>
      {
        item.pipeline.operators.map((p, index) => {
          const opType = p.constructor.name
          return (
            <div key={index} className="pipeline-list-item">
              {opEditors[opType](p, index)}
              <button style={{'float': 'right'}} onClick={() => Bus.publish("pipeline/remove/flow", {flow: p})}>x</button>
            </div>
          )
        })
      }
      </div>

      <div className='pipeline-tools'>
        <button onClick={() => Bus.publish("pipeline/add/flow", { item: item, flow: new Cloner(3) })}>
          <i className="bi bi-stack"></i> Cloner
        </button>

        <button onClick={() => Bus.publish("pipeline/add/flow", { item: item, flow: new Modifier("left", 0, 200) })} style={{'marginLeft': '4px'}}>
          <i className="bi bi-hammer"></i> Modifier
        </button>

        <button onClick={() => Bus.publish("pipeline/rerender", { item })} style={{'float': 'right'}}>
          <i className="bi bi-arrow-clockwise"></i>
        </button>
      </div>
    </>
  )
}

function onFlowPropChange(flow, prop, value){
  Bus.publish("editor/flow/propChanged", {flow, prop, value})
}

function IRectInspector(flow){
  return <span><b>Rect</b> Rectangle source. </span>
}

function ICircleInspector(flow){
  return <span><b>Circle</b> Circle source. </span>
}

function IPathInspector(flow){
  return <span><b>Path</b> Path source. </span>
}

function ITextInspector(flow){
  return <span><b>Text</b> 
  <input type="text" style={{width: 270}} value={flow.text} onChange={(e)=> onFlowPropChange(flow, "text", e.target.value) }/> </span>
}

function ClonerInspector(flow, key){
  return (
    <span>
      <b>Cloner</b> 
      Num clones: 
      <input 
        id={`cloner-${key}-num-clones`} 
        type="number" key={key} value={flow.num} min={2} max={100} 
        onChange={(e) => onFlowPropChange(flow, "num", parseInt(e.target.value))} 
      />
    </span>
  )
}

function ModifierInspector(flow, key){

  const propControl = (
    <select onChange={(e) => onFlowPropChange(flow, "prop", e.target.value)} value={flow.prop}>
      <option value="top">Top</option>
      <option value="left">Left</option>
      <option value="angle">Angle</option>
      <option value="opacity">Opacity</option>
    </select>
  )

  const minMaxMap = {
    top: [0, 800],
    left: [0, 1200],
    angle: [0, 360],
    opacity: [0, 1]
  }

  return (
    <span>
      <b>Modifier</b> 
      Prop: {propControl}
      Start: <input id={`modifier-${key}-start`} type="number" key={key + "_min"} min={minMaxMap[flow.prop][0]} value={flow.start} onChange={(e) => onFlowPropChange(flow, "start", parseInt(e.target.value))} />
      End: <input id={`modifier-${key}-end`} type="number" key={key + "_max"} max={minMaxMap[flow.prop][1]} value={flow.end} onChange={(e) => onFlowPropChange(flow, "end", parseInt(e.target.value))} />
    </span>
  )
}

function TransformInspector(flow){
  return (
    <span>
      <b>Transform</b> xy: {flow.x.toFixed(0)}, {flow.y.toFixed(0)} scl: {flow.scaleX.toFixed(2)}, {flow.scaleY.toFixed(2)}
      angle: {flow.angle.toFixed(1)}
    </span>
  )
}

const opEditors = {
  IRect: IRectInspector,
  ICircle: ICircleInspector,
  IText: ITextInspector,
  IPath: IPathInspector,
  Cloner: ClonerInspector,
  Modifier: ModifierInspector,
  Transform: TransformInspector
}

class PropInspector extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedObject: null
    }

    Bus.subscribe("editor/activeobject/selected", (selectedObject) => {
      this.setState({ selectedObject })
    })
    Bus.subscribe("editor/activeobject/deselected", (deselectedObject) => {
      this.setState({ selectedObject: null })
    })
  }

  render() {
    const obj = this.state.selectedObject

    if(!obj || (obj && obj.length === 0)){
      console.log("no selection")
      return (
        <div className={"prop-inspector"}>No selection</div>
      )
    }
  
     if (obj.length && obj.length > 1) {
      return (
        <div className={"prop-inspector"}>
          {obj.length} items selected.
        </div>
      )
    }
    
    return (
      <div className={"prop-inspector"}>
        <SourceProps item={obj[0]} />
        <PipelineInspector item={obj[0]} />
      </div>
    )
  }
}



export default PropInspector;