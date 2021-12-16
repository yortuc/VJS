import React from 'react';

export default function TemplatesList({ 
    templates,
    onTemplateAddClicked
  }) {
  
  return (
    <div id="templatesList">
      {templates.map(template => {
        return (
          <button
          className="templateButton"
          onClick={()=> onTemplateAddClicked(template)}>
            {template.name}
        </button>
        )
      })}
    </div>
  )
}