import kaplay from "kaplay";
export const k = kaplay();
k.loadRoot("./");

k.loadSprite("submarine", "sprites/submarine.png");
export const submarine = k.add([k.pos(120, 80), k.sprite("submarine")]);

import { movement } from "./lib/movement.js";
import { loadEnemies } from "./lib/enemies/loadEnemies.js";
import { loadHUD } from "./lib/hud.js";
movement();
loadEnemies();
loadHUD();

import { gameState } from "./store.js";
k.onUpdate(() => {
    gameState.level += 0.1;
});
