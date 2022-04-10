import React from 'react';
import './PropInspector.css';
import Bus from './Bus';
import Cloner from "./operators/Cloner.js";
import Modifier from "./operators/Modifier.js";


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
              {opEditors[opType](p)}
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
          <i className="bi bi-arrow-clockwise"></i> Rerender
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

function ClonerInspector(flow){
  return (
    <span>
      <b>Cloner</b> 
      Num clones: <input type="number" value={flow.num} min={2} max={100} onChange={(e) => onFlowPropChange(flow, "num", parseInt(e.target.value))} />
    </span>
  )

}

function ModifierInspector(flow){

  const propControl = (
    <select onChange={(e) => onFlowPropChange(flow, "prop", e.target.value)} value={flow.prop}>
      <option value="top">Top</option>
      <option value="left">Left</option>
      <option value="opacity">Opacity</option>
    </select>
  )

  return (
    <span>
      <b>Modifier</b> 
      Prop: {propControl}
      Start: <input type="number" min={0} value={flow.start} onChange={(e) => onFlowPropChange(flow, "start", parseInt(e.target.value))} />
      End: <input type="number" max={1200} value={flow.end} onChange={(e) => onFlowPropChange(flow, "end", parseInt(e.target.value))} />
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
  Cloner: ClonerInspector,
  Modifier: ModifierInspector,
  Transform: TransformInspector
}


function PropInspector({obj}) {
  if(!obj || (obj && obj.length === 0)){
    console.log("no selection")
    return (
      <div className={"prop-inspector"}>No selection</div>
    )
  }

   if (obj.length > 1) {
    return (
      <div className={"prop-inspector"}>
        {obj.length} items selected.
      </div>
    )
  }
  
  return (
    <div className={"prop-inspector"}>
      <PipelineInspector item={obj[0]} />
    </div>
  )

}

export default PropInspector;