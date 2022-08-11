import { attr, on, qs } from "../lib/dom.js";
import EventEmitter from "../lib/EventEmitter.js";

export default class SaveImage extends EventEmitter {

    busy = false;

    init(app) {

        this.saveName = 'pixel-art';

        this.ext = 'png';

        const saveBtn = qs('#saveBtn');

        const a = document.createElement('a');

        on(saveBtn, 'click', () => {

            if(this.busy) return;

            app.emit('requestDownload');

        });

        app.on('download', () => {

            app.outputCtx.drawImage(app.canvas, 0, 0, app.outputCanvas.width, app.outputCanvas.height);

            attr(a, 'download', `${this.saveName}.${this.ext}`);
        
            attr(a, 'href', app.outputCanvas.toDataURL("image/png").replace("image/png", "image/octet-stream"));
        
            a.click();

            app.outputCtx.clearRect(0, 0, app.outputCanvas.width, app.outputCanvas.height);

            this.busy = false;

        });

        on(saveBtn, 'click', () => this.emit('showModal'));

    }

}