import { on, swap } from "./dom.js";
import Grid from "./Grid.js";

const createLayerEL = layer => {
    
    const el = document.createElement('div');

    on(el, 'click', () => layer.stage.setCurrentLayer(layer));

    el.className = 'layer';

    const layerName = document.createElement('div');

    layerName.className = 'layer-name';

    layerName.textContent = layer.name;

    el.appendChild(layerName);

    return el;

};

export default class Layer {

    constructor(name, stage, clone = false) {
        
        this.stage = stage;

        this.name = name;

        this.visible = true;

        this.grid = !clone ? new Grid(this) : this.stage.currentLayer.grid.clone();

        this.el = createLayerEL(this);

    }
    
    remove() {
        this.el.remove();
        const id = this.stage.layers.indexOf(this);
        this.stage.layers.splice(id, 1);
        if(this.stage.currentLayer === this) {
            this.stage.currentLayer = null;
        }
    }

    moveUp() {
        const id = this.stage.layers.indexOf(this);
        if(id > 0) {
            const prevId = id - 1;
            const prevLayer = this.stage.layers[prevId];
            this.stage.layers[id] = prevLayer;
            this.stage.layers[prevId] = this;
            swap(prevLayer.el, this.el);
        }
    }

    moveDown() {
        const id = this.stage.layers.indexOf(this);
        if(id < (this.stage.layers.length - 1)) {
            const nextId = id + 1;
            const nextLayer = this.stage.layers[nextId];
            this.stage.layers[id] = nextLayer;
            this.stage.layers[nextId] = this;
            swap(this.el, nextLayer.el);
        }
    }

}