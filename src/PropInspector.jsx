import React from 'react';
import './PropInspector.css';
import Color from "./lib/Color"
import { func } from 'prop-types';


function PropList(name, values){
   return PropRow(key, 
      (<>
        { values.map(value => 
            PropInspector(
              value, null, null, ()=> {console.log("propval changed")})
          )
        }
      </>))
}


function PropRow(name, value){
  return (
    <div>
      <label>{name}</label>
      <div className="propVal">{value}</div> 
    </div>
  )
}

function String(key, val){
  return PropRow(key, <input type="text" value={val} />)
}

function Number(key, val, onShowCodeClicked, allShapes, onPropValChanged) {
  return PropRow(key, 
    <input type="text" value={val} 
      onChange={(e)=> {
        const newVal = parseFloat(e.target.value)
        onPropValChanged(key, newVal || val)
      }}/>)
}

function Code(key, val, onShowCodeClicked){
  return PropRow(key, 
      (<a href="#" onClick={()=> onShowCodeClicked(val)}>Show</a>))  
}

function Renderable(key, val, onShowCodeClicked, allShapes){
  return PropRow(key, 
      (<select value={val} onChange={()=>console.log("selection changed")}>
          {allShapes.map(shape => (
            <option value={shape}>{shape.name}</option>
          ))}
        </select>))  
}

function ColorInspector(key, val, onShowCodeClicked, allShapes, onPropValChanged){
  return PropRow(key, <input 
    type="color"
    value={val.color.hex()} 
    onChange={(e)=>{
      const newColor = new Color(e.target.value)
      onPropValChanged(key, newColor.toCode())
    }}/>)
}

function Other(key, val, type){
  return PropRow(key, 
    (<a href="#" onClick={()=> showCode(val)}>:{type}</a>))
}

const editors = {
  Number: Number,
  String: String,
  Code: Code,
  Renderable: Renderable,
  Color: ColorInspector,
  Other: Other
}

function PropInspector({ 
  obj, 
  onShowCodeClicked, 
  allShapes, 
  onPropValChanged, 
  onCreateTemplateClicked
  }) {
  return (
    <> { Object.keys(obj).map(k => {
      const typeEditor = obj[k].constructor.name
      if(typeEditor in editors){
        return editors[typeEditor](k, obj[k], onShowCodeClicked, allShapes, onPropValChanged)
      }
      // do not show unsupported types
      // else{
      //   return editors.Other(k, obj[k], typeEditor)
      // }
  })
    } 
    <div><button onClick={()=> onCreateTemplateClicked(obj)}>{"Create template"}</button></div>
    </>)
}

export default PropInspector;