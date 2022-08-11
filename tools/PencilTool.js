import { on, qs } from "../lib/dom.js";

export default class PencilTool {

    static toolName = 'pencil'

    color = null

    mirror = false

    init(app) {
        
        this.app = app;

        this.app.on('mousedown', ({ x, y, isDown }) => {

            if(this.app.activeTool.constructor.toolName !== this.constructor.toolName) {
                return;
            }

            if(!isDown) return;

            const layer = this.app.stage.currentLayer;

            layer.grid.fill(x, y, this.color, this.mirror);

        });

        this.app.on('setColor', this.setPencilColor.bind(this));

        this.app.on('toggleMirror', isActive => this.mirror = isActive);

        const btn = qs('#pencil-btn');

        on(btn, 'click', () => this.app.setTool(this.constructor.toolName));

        this.app.emit('setColor', '#000000');

        this.app.on('toolChanged', name => {
            if(name === this.constructor.toolName) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

    }

    setPencilColor(color) {
        this.color = color;
    }

}