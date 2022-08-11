import { on, qs } from "../lib/dom.js";

export default class MirrorTool {

    toolName = 'mirror'

    active = false

    init(app) {
        
        this.app = app;
        
        const btn = qs('#mirror-btn');

        on(btn, 'click', () => {

            btn.classList.toggle('active');

            this.active = !this.active;

            this.app.emit('toggleMirror', this.active);

        });

    }

}