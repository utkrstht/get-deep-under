import { k } from "../main.js";

export let submarine;

export function createSubmarine() {
    k.loadSprite("submarine", "sprites/submarine.png");
    submarine = k.add([
        k.pos(k.width() / 2, 300),
        k.anchor("center"),
        k.sprite("submarine"),
        submarine
    ]);
}
