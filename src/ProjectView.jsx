import React from 'react';
// import './ProjectView.css';

export default function ProjectView({project, selectedObj, onSelectionChange, onDeleteShapeClicked}){
  return (
    <div id="projectView">
      <a href="#" onClick={()=> onSelectionChange(project)}>Project</a>
      {project.shapes.map(s => (
        <div className="projectShape">
          <a href="#" onClick={()=> onSelectionChange(s)}>{s.name}</a>
          <button onClick={()=>onDeleteShapeClicked(s)}>x</button>  
        </div>
      ))}  
    </div>
  )
}