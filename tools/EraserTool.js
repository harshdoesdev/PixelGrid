import { on, qs } from "../lib/dom.js";

export default class EraserTool {

    toolName = 'eraser'

    mirror = false

    init(app) {
        
        this.app = app;

        this.app.on('mousedown', ({ x, y, isDown }) => {

            if(this.app.activeTool.toolName !== this.toolName) {
                return;
            }

            if(!isDown) return;

            const layer = this.app.stage.currentLayer;

            layer.grid.fill(x, y, null, this.mirror);

        });

        this.app.on('toggleMirror', isActive => this.mirror = isActive);

        const btn = qs('#eraser-btn');

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