import { k } from "../../main.js";

export function loadEnemySprites() {
    k.loadSprite("mine", "sprites/mine.png");
    
    for (let i = 1; i <= 10; i++) {
        k.loadSprite(`explosion_${i}`, `animations/bomb_explosion_animation/${i}.png`);
    }
}
