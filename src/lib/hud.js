import { k } from "../main.js";
import { gameState } from "../store.js";

function background() {
    k.loadSprite("bg", "sprites/bg.jpg"); 
    
    k.add([
        k.sprite("bg"),
        k.pos(0, 0),
        k.fixed(),
        k.z(-1000),
        k.scale(Math.max(k.width() / 612, k.height() / 306)),
    ]);
}

function depth() {
    const depthLabel = k.add([
    ]);

    k.onUpdate(() => {
    });
}

export function loadHUD() {
    background();
    depth();
}
