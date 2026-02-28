import kaplay from "kaplay";
export const k = kaplay();
k.loadRoot("./");

k.loadSprite("submarine", "sprites/submarine.png");
export const submarine = k.add([k.pos(120, 80), k.sprite("submarine")]);

import { movement } from "./lib/movement.js";
movement();
import { loadEnemies } from "./lib/enemies/loadEnemies.js";
loadEnemies();

import { game } from "./store.js";
k.onUpdate(() => {
    game.level += 0.1;

    console.log(Math.floor(game.level));
});
