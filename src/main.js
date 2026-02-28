import kaplay from "kaplay";
export const k = kaplay();
k.loadRoot("./");

k.loadSprite("submarine", "sprites/submarine.png");
export const submarine = k.add([k.pos(120, 80), k.sprite("submarine")]);

import { movement } from "./movement.js";
movement();
// import { enemy } from "./lib/enemy.js";
// enemy();
