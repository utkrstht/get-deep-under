import { k } from "../../main.js";
import { showDeathScreen } from "../deathScreen.js"; // Import death screen
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

    enemy.onCollide("submarine", (sub) => {
        const explosionPos = enemy.pos.clone();
        
        k.destroy(enemy);
        k.destroy(sub);
        
        const explosion = k.add([
            k.pos(explosionPos),
            k.anchor("center"), 
            k.sprite("explosion_1"),
            k.scale(2),
        ]);

        let frame = 1;
        const cancelAnim = k.loop(0.1, () => {
            frame++;
            if (frame <= 10) {
                explosion.use(k.sprite(`explosion_${frame}`));
            } else {
                cancelAnim.cancel(); 
                k.destroy(explosion);
                
                showDeathScreen("mine");
            }
        });
    });
}
