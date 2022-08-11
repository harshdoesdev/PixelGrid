import { on, qs } from "../lib/dom.js";
import { debounce } from "../lib/utils.js";

export default class FillTool {

    static toolName = 'fill-tool'

    init(app) {
        
        this.app = app;

        this.debouncedFill = debounce(this.fill.bind(this), 200);

        const btn = qs('#fill-tool');

        this.app.on('mousedown', ({ x, y, isDown }) => {

            if(!isDown || this.app.activeTool !== this) return;

            this.debouncedFill(x, y, this.color);

        });

        this.app.on('setColor', color => this.color = color);

        on(btn, 'click', () => this.app.setTool(this.constructor.toolName));

        this.app.on('toolChanged', name => {

            if(name === this.constructor.toolName) {
            
                btn.classList.add('active');
            
            } else {
            
                btn.classList.remove('active');
            
            }
        
        });

    }


    fill(x, y, color) {

        const targetCell = this.app.stage.currentLayer.grid.getCell(x, y);

        const found = [targetCell];

        for(let i = 0; i < found.length; i++) {

            const foundCell = found[i];

            const adjacentCells = [
                foundCell - 1, 
                foundCell + 1, 
                foundCell - this.app.stage.size,
                foundCell + this.app.stage.size
            ];

            for(let j = 0; j < adjacentCells.length; j++) {

                const adjacentCell = adjacentCells[j];

                const adjacentCellColor = this.app.stage.currentLayer.grid.getColor(...this.app.stage.getPos(adjacentCell));

                if(
                    adjacentCell >= 0 && 
                    adjacentCell < this.app.stage.currentLayer.grid.cells.length &&
                    adjacentCellColor === this.app.stage.currentLayer.grid.getColor(...this.app.stage.getPos(foundCell)) &&
                    !found.some(n => n == adjacentCell)
                ) {

                    found.push(adjacentCell);

                }

            }

        }

        found.forEach(cell => {

            const [cx, cy] = this.app.stage.getPos(cell);

            this.app.stage.currentLayer.grid.fill(cx, cy, color);

        });

    }

}