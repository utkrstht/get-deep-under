import { k } from "../main.js";
import { gameState } from "../store.js";

function background() {
    k.loadSprite("background", "sprites/background.png", {
        sliceX: 4,
        sliceY: 2,
        anims: {
            idle: {
                from: 0,
                to: 7,
                loop: true,
                speed: 5,
            },
        },
    });

    k.add([k.fixed(), k.sprite("background", { anim: "idle" }), k.z(-100)]);
}

function depth() {
    const depthLabel = k.add([
        k.text("0 ft", { size: 48 }),
        k.pos(k.width() / 2, 40),
        k.anchor("center"),
        k.fixed(),
        k.z(100),
    ]);

    k.onUpdate(() => {
        depthLabel.text = `depth: ${Math.floor(gameState.level)} ft`;
    });
}

export function loadHUD() {
    background();
    depth();
}
