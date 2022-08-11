import { on, qs } from "../lib/dom.js";
import EventEmitter from "../lib/EventEmitter.js";

export default class ClearTool extends EventEmitter {

    toolName = 'clear'

    selection = null

    init(app) {
        
        this.app = app;

        this.app.on('setSelection', selection => {
            this.selection = selection;
        });

        this.on('clear', () => {

            if(this.selection) {
                for(let i = 0, len = this.selection.length; i < len; i++) {
                    this.app.stage.currentLayer.grid.cells[this.selection[i]] = null;
                }
                this.app.emit('setSelection', null);
            } else {
                const cells = this.app.stage.currentLayer.grid.cells;

                for(let i = 0, len = cells.length; i < len; i++) {
                    cells[i] = null;
                }
            }

        });

        const btn = qs('#clear-btn');

        on(btn, 'click', () => this.emit('clear'));

    }

}