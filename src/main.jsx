import './index.css'
import React from 'react'
import ReactDOM from 'react-dom'
import Renderable from "./lib/Renderable"
import PropInspector from './PropInspector'
import ProjectView from './ProjectView'
import CodeEditor from './CodeEditor'
import Color from './lib/Color'
import Project from './lib/Project'
import ShapeCodes from './lib/ShapeCodes'
import R from './lib/R'

const ctx = document.getElementById("c").getContext("2d")

const project = window.project = new Project()
project.loadFromLocalStorage()

let selectedObj = null
let codeVisible = false

function evaluateShape(shape){
  try{
    const runFunc = new Function("me", "project", "Color", "Renderable", "r", shape.code.code)
    runFunc(shape, project, Color, Renderable, R)
    return true
  } catch (error) {
    console.log("Error evaluateShape", error)
    return false
  }
}

function initShape(shape){
  shape.init()
  // if this is a project then init shapes 
  if(shape.shapes){
    shape.shapes
        .map(s => {
          evaluateShape(s)
          s.init()
        })
  }
}

function applyCode(code){
  selectedObj.code.code = code
  evaluateShape(selectedObj)
  initShape(selectedObj)
  
  renderProject()
  renderUI()
}

function Add(){
  const name = "Shape" + (project.shapes.length + 1).toString()
  const shape1 = new Renderable(ShapeCodes.rectangle(400, 180, 50, 50, name))
  selectedObj = shape1
  evaluateShape(shape1)
  initShape(shape1)

  // add to project instance 
  // or, should we init the project ?
  project.shapes.push(shape1)

  project.updateProjectCode()

  // update UIs  
  renderProject()
  renderUI()
}

function deleteShape(shape){
  project.shapes = project.shapes.filter(s => s != shape)
  project.updateProjectCode()
  renderProject()
  renderUI()
}

function renderProject(){
  project.render(ctx)
}

function selectionChanged(s) {
  selectedObj = s
  renderUI()
}

function propValChanged(key, newVal){  
  // replace code.
  // this will be replaced with a language parser!
  const findRegex = new RegExp("me." + key + " = .*");
  const replace = "me." + key + " = " + newVal
  selectedObj.code.code = selectedObj.code.code.replace(findRegex, replace)
  
  // set the prop value of the instance
  // or, should we init the object again?
  selectedObj[key] = eval(newVal)

  // update project source code
  // is it going to be slow?
  project.updateProjectCode()

  renderProject()
  renderUI()
}

function showCode(code) {
  codeVisible = true
  renderUI()
}

function hideCode(){
  codeVisible = false
  renderUI()
}

function createTemplate(shape){
  // crete a template out of the selected shape
  // copy code, put it in project.templates 
  // update project code to save
  // project.templates.push()
}

document.getElementById("addObj").onclick = Add

// init project 
evaluateShape(project)
initShape(project)
selectedObj = project
renderUI()
renderProject()

function renderUI(){
  ReactDOM.render(
    <>
      <ProjectView 
        project={project}
        onSelectionChange={selectionChanged}
        onDeleteShapeClicked={deleteShape} />
      <PropInspector 
        obj={selectedObj}
        onShowCodeClicked={showCode}
        allShapes={project.shapes}
        onPropValChanged={propValChanged}
        onCreateTemplateClicked={createTemplate} />
      <CodeEditor 
        visible={codeVisible}
        name={selectedObj.name}
        code={selectedObj.code.code}
        onCodeApplyClicked={applyCode}
        onHideCodeClicked={hideCode} />
    </>,
    document.getElementById('root')
  )
}

