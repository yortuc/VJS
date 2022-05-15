import React from 'react';
import './Palette.css';
import "./Palette.css";
import Bus from "./Bus.js";

export default function Palette() {

    return (
        <div id='palette'>
            <button onClick={() => Bus.publish("editor/drawing/end")}><i className="bi-cursor"></i></button>
            <button onClick={() => Bus.publish("editor/add/rect")}><i className="bi bi-square"></i></button>
            <button onClick={() => Bus.publish("editor/add/circle")}><i className="bi bi-circle"></i></button>
            <button><i className="bi bi-hexagon"></i></button>
            <button><i className="bi bi-image"></i></button>
            <button onClick={() => Bus.publish("editor/drawing/start")}><i className="bi bi-pencil"></i></button>
            <button onClick={() => Bus.publish("editor/add/text")}><i className="bi bi-fonts"></i></button>
        </div>
    )
}
