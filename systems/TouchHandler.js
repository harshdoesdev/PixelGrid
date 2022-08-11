import { screenToCanvas } from "../lib/utils.js";

export default class TouchHanlder {

    systemName = 'touchHandler'

    mouse = {
        x: 0,
        y: 0,
        isDown: false
    }

    init(app) {
        this.app = app;
        this.app.on('pointerdown', this.handleTouch.bind(this));
        this.app.on('pointerup', this.handleTouch.bind(this));
        this.app.on('pointermove', this.handleTouch.bind(this));
    }

    handleTouch(e) {

        const type = e.type;
        
        if(type === 'pointerup') {
            this.mouse.isDown = false; 
            return;       
        }

        const pos = screenToCanvas(
            this.app.canvas, 
            e.clientX, 
            e.clientY
        );

        this.app.emit('touchpositionchange', pos);

        if(pos.x > 0 && pos.y > 0 && pos.y < this.app.canvas.height && pos.x < this.app.canvas.width) {

            this.mouse.x = pos.x;
            this.mouse.y = pos.y;

            if(type === 'pointerdown') {
                this.mouse.isDown = true;
                this.app.emit('touchstartposition', pos);
            }

            this.app.emit('mousedown', this.mouse);

        }

    }

}