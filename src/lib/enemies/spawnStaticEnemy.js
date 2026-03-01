import { k } from "../../main.js";
import { gameState } from "../../store.js";

export function spawnStaticEnemy() {
    let enemy = k.add([
        k.pos(Math.random() * (k.width() - 200) + 100, k.height() + 10),
        k.anchor("center"),
        k.sprite("mine"),
        k.area(),
        k.offscreen({ destroy: true }),
        "enemy",
    ]);

    enemy.onUpdate(() => {
        if (gameState.isGameOver) return;
        enemy.move(0, -100);
    });

    enemy.onCollide("submarine", () => {
        k.destroy(enemy);

        alert("Lost");
    });
}
