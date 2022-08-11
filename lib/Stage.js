import { attr, on, qs } from "./dom.js";
import EventEmitter from "./EventEmitter.js";
import Layer from "./Layer.js";

let id = 0;

export default class Stage extends EventEmitter {

    layers = []

    currentLayer = null

    constructor(app, size, cellSize) {

        super();
        
        this.app = app;

        this.width = this.app.canvas.width;
        this.height = this.app.canvas.height;

        this.size = size;

        this.cellSize = cellSize;

        this.ctx = this.app.ctx;

        this.gridSize = this.size * this.size;

        this.container = qs('.layers');

        const cloneLayerBtn = qs('#cloneLayerBtn');

        const moveUpBtn = qs('#moveLayerUp');
        const moveDownBtn = qs('#moveLayerDown');

        const toggleVisiblilityBtn = qs('#toggleVisibilityBtn');

        const layerVisibility = qs('#layer-visibility');

        const toggleVisiblilityIcon = () => attr(layerVisibility, 'xlink:href', 
            this.currentLayer.visible ? '#layer-visible' : '#layer-hidden'
        );

        this.on('layerChanged', () => toggleVisiblilityIcon());

        on(toggleVisiblilityBtn, 'click', () => {
            if(this.currentLayer) {
                this.currentLayer.visible = !this.currentLayer.visible;
                toggleVisiblilityIcon();
            }
        });

        on(moveUpBtn, 'click', () => this.currentLayer?.moveUp());

        on(moveDownBtn, 'click', () => this.currentLayer?.moveDown());
    
        const bgLayer = this.addLayer('background');

        this.setCurrentLayer(bgLayer);

        const addLayerBtn = qs('#addLayer');

        on(addLayerBtn, 'click', () => {
            this.addLayer();
        });

        const removeLayerBtn = qs('#removeLayer');
        
        on(removeLayerBtn, 'click', () => this.currentLayer?.remove());

        on(cloneLayerBtn, 'click', () => {
            if(this.currentLayer) {
                this.addLayer(`${this.currentLayer.name} #`, true);
            }
        });

        this.moveLayer = new Layer('MoveLayer', this);

    }

    addLayer(name, clone = false) {

        if(!name) {
            name = `Layer ${id++}`;
        }

        const layer = new Layer(name, this, clone);

        this.container.appendChild(layer.el);

        this.layers.push(layer);

        return layer;

    }

    setCurrentLayer(layer) {

        if(this.currentLayer) {
        
            this.currentLayer.el.classList.remove('active');
        
        }
        
        this.currentLayer = layer;
        this.currentLayer.el.classList.add('active');
        this.emit('layerChanged', layer);
    
    }

    getPos(i) {
    
        const x = i % this.size * this.cellSize;
    
        const y = Math.floor(i / this.size) * this.cellSize;
    
        return [x, y];
    
    }

    render() {

        this.layers.forEach(layer => {

            if(layer.visible) {
                layer.grid.render();
            }

            this.moveLayer.grid.render();

        });
    
    }

}