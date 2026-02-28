import { k } from "../main.js";
import { gameState } from "../store.js";

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
    depth();
}
