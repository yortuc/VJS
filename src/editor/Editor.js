import { fabric } from "fabric";
import Bus from "../Bus.js";
import Pipeline from "../operators/Pipeline.js";
import IRect from "../operators/IRect.js";
import ICircle from "../operators/ICircle.js";


export default class Editor {
    constructor(cId, width, height){
        this.canvas = new fabric.Canvas(cId, { width, height });
        this.isObjectMoving  = false

        Bus.subscribe("editor/add/rect", this.addRect.bind(this))
        Bus.subscribe("editor/add/circle", this.addCircle.bind(this))

        this.initializeCanvasEvents();
    }

    addRect(){
        // add canvas a pipeline with a rectangle source in it
        this.addPipeline(new Pipeline([ 
            new IRect({left: 200, top: 200, width: 40, height: 40, fill: '#f6b73c'}) 
        ]))
    }

    addCircle(){
        // add canvas a pipeline with a rectangle source in it
        this.addPipeline(new Pipeline([ 
            new ICircle({left: 200, top: 200, radius: 40, fill: '#f6b73c'}) 
        ]))
    }

    addPipeline(pipeline){
        pipeline.render()
          .then(r => {
            // add a ref to the pipeline from fabric object
            r.pipeline = pipeline
            this.canvas.add(r)
          })
    }

    initializeCanvasEvents(){
        const canvas = this.canvas;

        function changeSelection(obj){
            if(obj.selected){
                Bus.publish("editor/activeobject/selected", obj.selected)
            }
            if(obj.deselected){
                Bus.publish("editor/activeobject/deselected", obj.deselected)
            }
        }

        this.canvas.on({
            'selection:updated': changeSelection,
            'selection:created': changeSelection,
            'selection:cleared': changeSelection
          });

        canvas.on('object:moving', (event) => {
            this.isObjectMoving = true;
        });

        canvas.on('mouse:up', (event) => {
            if (this.isObjectMoving){
                this.isObjectMoving = false;
                Bus.publish("editor/object/moved", this.canvas.getActiveObject())
            } 
        });

        canvas.on('object:scaling', (e) => {
            Bus.publish("editor/object/scaled", this.canvas.getActiveObject())
            console.log("object:scaling", e.target.scaleX, e.target.scaleY)
        });

        canvas.on('object:rotating', (e) => {
            Bus.publish("editor/object/rotated", this.canvas.getActiveObject())
            console.log("object:scaling", e.target.scaleX, e.target.scaleY)
        })
    }
}