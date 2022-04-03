import { fabric } from "fabric";

export default class LineDrawer {
    drawingMode = "line"

    make(x, y, options, x2, y2) {
        return new Promise(resolve => {
            resolve(new fabric.Line([x, y, x2, y2], options));
        })
    }

    resize(object, x, y) {
        //Change the secondary point (x2, y2) of the object 
        //This resizes the object between starting point (x,y)
        //and secondary point (x2,y2), where x2 and y2 have new values.
        object.set({
            x2: x,
            y2: y
        }).setCoords();

        //Wrap the resized object in a Promise
        return new Promise(resolve => {
            resolve(object);
        });
    }
}