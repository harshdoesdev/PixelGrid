import { on, qs, ready } from "./lib/dom.js";
import Application from "./lib/Application.js";
import PencilTool from "./tools/PencilTool.js";
import EraserTool from "./tools/EraserTool.js";
import TouchHanlder from "./systems/TouchHandler.js";
import ColorSelector from "./tools/ColorSelector.js";
import MirrorTool from "./tools/MirrorTool.js";
import EyeDropperTool from "./tools/EyeDropperTool.js";
import SaveImage from './tools/SaveImage.js';
import ClearTool from "./tools/ClearTool.js";
import FillTool from "./tools/FillTool.js";

const initApp = () => {

    const app = new Application(16, 16);

    const main = qs('.app-main');

    const toggleGridBtn = qs('#toggle-grid-btn');

    main.appendChild(app.canvas);

    app.addSystem(new TouchHanlder)

    app
        .addTool(new ColorSelector)
        .addTool(new MirrorTool)
        .addTool(new FillTool)
        .addTool(new PencilTool)
        .addTool(new EraserTool)
        .addTool(new EyeDropperTool)
        .addTool(new ClearTool)
        .addTool(new SaveImage);

    app.init();

    app.setTool('pencil');

    const menuBtn = qs('#menu-btn');

    const closeMenuBtn = qs('#close-menu');

    const menu = qs('.menu-container');

    on(menuBtn, 'click', () => {

        menu.classList.add('show');

    });

    on(closeMenuBtn, 'click', () => {

        menu.classList.remove('show');

    });

    on(toggleGridBtn, 'click', () => {
        app.showGridLines = !app.showGridLines;
        toggleGridBtn.classList.toggle('active');
    });

};

ready(initApp);