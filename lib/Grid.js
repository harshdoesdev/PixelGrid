export default class Grid {

    constructor(layer, cells) {

        this.layer = layer;

        this.stage = this.layer.stage;

        if(cells) {
            
            this.cells = cells.slice(0);
        
        } else {
        
            this.cells = [];
        
            for(let i = 0; i < this.stage.gridSize; i++) {
                this.cells[i] = null;
            }
        
        }
    
    }

    clone() {
        return new Grid(this.layer, this.cells);
    }

    getMirrorCell(x, y) {
        const row = Math.floor(x / this.stage.cellSize);
        const col = Math.floor(y / this.stage.cellSize);
        return (this.stage.size - 1) + (row + 1 * col) + (col * (this.stage.size - 1)) - (row * 2);
    }

    getCell(x, y) {
        
        const row = Math.floor(x / this.stage.cellSize);
        const col = Math.floor(y / this.stage.cellSize);

        return (row + 1 * col) + (col * (this.stage.size - 1));
    
    }
    
    fill(x, y, color, mirror) {
        if(this.layer.visible) {
            const id = this.getCell(x, y);
            if(id >= 0 || id < this.stage.gridSize) {
                this.cells[id] = color;
                if(mirror) {
                    const mid = this.getMirrorCell(x,y);
                    this.cells[mid] = color;
                }
            }
        }
    }

    fillCell(id, color) {
        if(this.layer.visible) {
            if(id >= 0 || id < this.stage.gridSize) {
                this.cells[id] = color;
            }
        }
    }

    getColor(x, y) {
        if(this.layer.visible) {
            const id = this.getCell(x, y);
            if(id >= 0 || id < this.stage.gridSize) {
                return this.cells[id];
            }
        }
    }

    getCellColor(id) {
        if(this.layer.visible) {
            if(id >= 0 || id < this.stage.gridSize) {
                return this.cells[id];
            }
        }
    }

    reset() {
        for(let i = 0; i < this.cells.length; i++) {
            this.cells[i] = null;
        }
    }

    render() {
        if(this.layer.visible) {
            this.cells.forEach((cell, i) => {
                if(cell) {
                    const [x, y] = this.stage.getPos(i);
                    this.stage.ctx.fillStyle = cell;
                    this.stage.ctx.fillRect(
                        x,
                        y, 
                        this.stage.cellSize,
                        this.stage.cellSize
                    );
                }
            })
        }
    }

} 