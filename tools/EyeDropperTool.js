import { on, qs } from "../lib/dom.js";

export default class EyeDropperTool {

    toolName = 'eye-dropper'

    init(app) {
        
        this.app = app;

        this.app.on('mousedown', ({ x, y, isDown }) => {

            if(this.app.activeTool.toolName !== this.toolName) {
                return;
            }

            if(!isDown) return;

            const layer = this.app.stage.currentLayer;

            const color = layer.grid.getColor(x, y);

            if(color) {
                this.app.emit('setColor', color);
                this.app.setTool('pencil');
            }

        });

        const btn = qs('#eye-dropper');

        on(btn, 'click', () => this.app.setTool(this.toolName));

        this.app.on('toolChanged', name => {
            if(name === this.toolName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

    }

}