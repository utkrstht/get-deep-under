import { k } from "../../main.js";
import { gameState } from "../../store.js";

import { loadEnemySprites } from "./loadEnemySprites.js";
import { spawnStaticEnemy } from "./spawnStaticEnemy.js";
import { spawnMovingEnemy } from "./spawnMovingEnemy.js";

export function enemySpawningTick() {
    loadEnemySprites();
    let cooldown = 0;

    k.onUpdate(() => {
        cooldown -= k.dt();

        if (cooldown > 0) return;
        if (Math.random() * 100 < gameState.level) {
            cooldown = 5;

            if (Math.random() < 0.5) {
                spawnStaticEnemy();
            } else {
                spawnStaticEnemy();
                spawnMovingEnemy();
            }
        }
    });
}
