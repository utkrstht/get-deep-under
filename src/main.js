import kaplay from "kaplay";
export const k = kaplay();
k.loadRoot("./");

import { createSubmarine } from "./lib/submarine.js";
import { movement } from "./lib/movement.js";
import { enemySpawningTick } from "./lib/enemies/enemySpawningTick.js";
import { loadHUD } from "./lib/hud.js";
import { weapon } from "./lib/weapon.js";
createSubmarine();
movement();
weapon();
enemySpawningTick();
loadHUD();

import { gameState } from "./store.js";
k.onUpdate(() => {
    // gameState.level += 5 * k.dt();
});
