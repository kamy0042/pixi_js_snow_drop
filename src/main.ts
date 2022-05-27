import './style.css'

import * as PIXI from "pixi.js"

const createApp = () => {
    const WIDTH = 640;
    const HEIGHT = 480;

    const app = new PIXI.Application( {width:WIDTH, height:HEIGHT, backgroundColor: 0x1C1E36 } );
    const blurFilter = new PIXI.filters.BlurFilter();
    blurFilter.blur = 2;
    app.stage.filters = [blurFilter];

    document.body.appendChild(app.view);

    const SNOW_LIMIT = 600;
    const snows = [];

    for (let i = 0; i < SNOW_LIMIT; i++) {
        const scale = (Math.floor(Math.random() * 6) + 5) / 10;
        snows.push(new PIXI.Graphics().beginFill(0xFFFFFF,0.7).drawCircle(0,0,7).endFill());
        snows[i].position.x = Math.random() * WIDTH;
        snows[i].position.y = Math.random() * HEIGHT;
        snows[i].scale.x = scale;
        snows[i].scale.y = scale;
        app.stage.addChild(snows[i]);
    }

    app.ticker.add(() => {
        for (let i = 0; i < SNOW_LIMIT; i++) {
            const scale = snows[i].scale.x;
            snows[i].position.x += (Math.random() - 0.5) * 1 * scale;
            snows[i].position.y += (scale * scale) + 0.1;
            if (snows[i].position.y > HEIGHT) {
                snows[i].position.y = -10;
            }
        }
    } );

    return app;
}

const app = createApp();