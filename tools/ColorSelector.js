import { on, qs } from "../lib/dom.js";

export default class ColorSelector {

    toolName = 'color-selector'

    colors = new Set

    init(app) {
        
        this.app = app;

        const container = qs('.dropdown-container');

        const selector = qs('#color-selector');

        const btn = qs('#color-selector-btn');

        const dropdown = qs('#color-selector-dropdown');

        const pallete = qs('#color-pallete');

        on(document, 'click', e => {
            if(e.target === btn) {
                dropdown.classList.toggle('hide')
            } else if(!container.contains(e.target)) {
                dropdown.classList.add('hide');
            }
        });

        this.app.on('addColor', color => {

            const colorBtn = document.createElement('button');

            colorBtn.style.background = color;

            on(colorBtn, 'click', () => this.app.emit('setColor', color));

            pallete.appendChild(colorBtn);

        });

        this.app.on('setColor', color => {
            
            selector.value = color;

            btn.style.background = color;

            if(!this.colors.has(color)) {
                this.colors.add(color);
                this.app.emit('addColor', color);
            }
            
        });

        on(selector, 'change', e => this.app.emit('setColor', e.target.value));

    }

}