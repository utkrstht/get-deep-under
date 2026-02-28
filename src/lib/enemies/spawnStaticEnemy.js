import { k } from "../../main.js";

export function spawnStaticEnemy() {
    let enemy = k.add([
        k.pos(Math.random() * (k.width() - 200) + 100, k.height() + 10),
        k.anchor("center"),
        k.sprite("sigma"),
        k.offscreen({ destroy: true }),
    ]);

    enemy.onUpdate(() => {
        enemy.move(0, -100 * k.dt());
    });

    enemy.onCollide("submarine", () => {
        k.destroy(enemy);
        alert("lost");
    });
}
