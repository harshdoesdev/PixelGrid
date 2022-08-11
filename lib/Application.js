import { on } from "./dom.js";
import EventEmitter from "./EventEmitter.js";
import Stage from './Stage.js';

export default class Application extends EventEmitter {

    tools = new Map

    systems = new Map

    activeTool = null

    showGridLines = true

    downloading = false

    constructor(size, cellSize) {
    
        super();

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');

        this.ctx.imageSmoothingEnabled = false;

        this.outputCanvas = document.createElement('canvas');
        this.outputCtx = this.outputCanvas.getContext('2d');

        this.outputCanvas.imageSmoothingEnabled = false;

        this.outputCanvas.width = size;
        this.outputCanvas.height = size;

        this.stage = new Stage(this, size, cellSize);

        this.canvas.width = (this.stage.cellSize * this.stage.size);
        this.canvas.height = (this.stage.cellSize * this.stage.size);

        this.canvas.id = 'main';

        this.tick = () => {

            requestAnimationFrame(this.tick.bind(this));

            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

            //this.drawCheckerboard();

            this.stage.render();

            if(this.showGridLines && !this.downloading) this.drawPixelGrid();

            if(this.downloading) {
                
                this.downloading = false;
                
                this.emit('download');
            
            }

            this.emit('render');

        };
    
    }

    drawPixelGrid() {

        for(let i = 0; i <= this.stage.size; i++) {
        
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.stage.cellSize, 0);
            this.ctx.lineTo(i * this.stage.cellSize, this.canvas.height);
            this.ctx.closePath();
            this.ctx.stroke();

            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.stage.cellSize);
            this.ctx.lineTo(this.canvas.width, i * this.stage.cellSize);
            this.ctx.closePath();
            this.ctx.stroke();
        
        }
    
    }

    init() {
        
        on(this.canvas, 'pointerdown', e => this.emit('pointerdown', e));
        on(this.canvas, 'pointermove', e => this.emit('pointermove', e));
        on(this.canvas, 'pointerup', e => this.emit('pointerup', e));
        
        this.systems.forEach(system => system.init(this));
        
        this.tools.forEach(tool => tool.init(this));

        this.on('requestDownload', () => this.downloading = true)
     
        requestAnimationFrame(this.tick.bind(this));
    
    }

    addSystem(system) {
        this.systems.set(system.systemName, system);
        return this;
    }

    removeSystem(system) {
        this.systems(system.systemName, null);
        return this;
    }

    addTool(tool) {
        this.tools.set(tool.toolName, tool);
        return this;
    }

    removeTool(toolName) {
        this.tools.delete(toolName);
        return this;
    }

    setTool(toolName) {
        this.emit('toolChanged', toolName, this.currentTool?.toolName);
        this.activeTool = this.tools.get(toolName);
    }

}