import Bus from "../Bus.js";

export default class PipelineManager {
    constructor(editor){
        this.pipelines = []
        this.editor = editor

        Bus.subscribe("pipeline/add/flow", ({ item, flow }) => {
            // add flow to the pipeline
            item.pipeline.addFlow(flow)
            flow.pipeline = item.pipeline

            // refresh pipeline
            this.reRenderPipeline(item.pipeline)
        })

        Bus.subscribe("pipeline/remove/flow", ({flow}) => {
            // filter out deleted flow
            const newFlows = flow.pipeline.operators.filter(op => op !== flow)
            flow.pipeline.operators = newFlows

            this.reRenderPipeline(flow.pipeline)
        })

        function updatePipelineTransform(obj){
            obj.pipeline.updateTransform(obj.left, obj.top, obj.scaleX, obj.scaleY, obj.angle)
            Bus.publish("editor/selection/change")
        }
        Bus.subscribe("editor/object/moved", updatePipelineTransform)
        Bus.subscribe("editor/object/scaled", updatePipelineTransform)
        Bus.subscribe("editor/object/rotated", updatePipelineTransform)


        Bus.subscribe("editor/flow/propChanged", ({flow, prop, value}) => {
            // update flow prop value
            flow[prop] = value

            // refresh pipeline
            this.reRenderPipeline(flow.pipeline)
        })

        Bus.subscribe("pipeline/rerender", ({item}) => 
            this.reRenderPipeline(item.pipeline)
        )

        Bus.subscribe("editor/source/propChanged", ({sourceOp, prop, newVal}) => {
            sourceOp.opt[prop] = newVal
            this.reRenderPipeline(sourceOp.pipeline)
        })
    }

    reRenderPipeline(pipeline){
        // remove item from canvas and add again ??
        this.editor.canvas.remove(pipeline.item)

        pipeline.render().then(r => {
            this.editor.canvas.add(r)
            this.editor.canvas.setActiveObject(r)
        })
    }
}