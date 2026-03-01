import { k } from "../main.js";
import { gameState } from "../store.js";

function background() {
    k.loadSprite("background", "sprites/bg.jpg");

    k.add([k.fixed(), k.sprite("background"), k.z(-100)]);
}

function depth() {
    k.loadFont("pixelify", "fonts/pixelify.ttf");

    const depthLabel = k.add([
        k.text("0 ft", { size: 48 }),
        k.pos(k.width() / 2, 40),
        k.anchor("center"),
        k.fixed(),
        k.z(100),
        {
            font: "pixelify",
        },
    ]);

    k.onUpdate(() => {
        depthLabel.text = `depth: ${Math.floor(gameState.level)} ft`;
    });
}

export function loadHUD() {
    background();
    depth();
}
