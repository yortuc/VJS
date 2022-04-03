import React from 'react'
import ReactDOM from 'react-dom'

import PropInspector from "./PropInspector.js";
import Palette from './Palette.js';

import "./index.css";
import Editor from './editor/Editor.js';
import Bus from './Bus.js';
import PipelineManager from './editor/PipelineManager.js';

const editor = new Editor("c", 1200, 800)

const man = new PipelineManager(editor);

Bus.subscribe("editor/selection/change", function(){
  renderUI({ selectedObject: editor.canvas.getActiveObjects() })
})

function renderUI(opt){
  ReactDOM.render(
    <>
    <PropInspector obj={opt.selectedObject} />
    <Palette />
    </>,
    document.getElementById('root')
  )
}

renderUI({selectedObject: null})