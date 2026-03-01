import { k } from "../main.js";
import { submarine } from "./submarine.js";
import { gameState } from "../store.js";

export function movement() {
    let velX = 0;
    
    const DEPTH_PER_SEC = 10;

    const depthLabel = k.add([
        k.text("Depth: 0 ft", { font: "Pixelify Sans" }),
        k.pos(k.width() / 2, 20),
        k.anchor("center"),
        k.fixed(),
        k.z(100),
    ]);
    
    k.loop(0.5, () => {
        k.add([
            k.circle(k.rand(2, 6)),
            k.pos(k.rand(0, k.width()), k.height()),
            k.color(100, 100, 255),
            k.opacity(0.3),
            k.move(k.UP, k.rand(50, 150)),
            k.offscreen({ destroy: true }),
            "bubble",
            k.z(-1),
        ]);
    });

    const maxSpeed = 300;
    const acceleration = 400;
    const deceleration = 200;

    k.onUpdate(() => {
        if (gameState.isGameOver) return;

        gameState.level += DEPTH_PER_SEC * k.dt();
        depthLabel.text = `Depth: ${Math.floor(gameState.level)} ft`;

        let moving = false;

        if (k.isKeyDown("left") || k.isKeyDown("a")) {
            velX -= acceleration * k.dt();
            moving = true;
        }

        if (k.isKeyDown("right") || k.isKeyDown("d")) {
            velX += acceleration * k.dt();
            moving = true;
        }

        if (!moving) {
            if (velX > 0) {
                velX -= deceleration * k.dt();
                if (velX < 0) velX = 0;
            } else if (velX < 0) {
                velX += deceleration * k.dt();
                if (velX > 0) velX = 0;
            }
        }

        if (velX > maxSpeed) velX = maxSpeed;
        if (velX < -maxSpeed) velX = -maxSpeed;

        submarine.move(velX, 0);

        if (submarine.pos.x < 30) submarine.pos.x = 30; 
        if (submarine.pos.x > k.width() - 30) submarine.pos.x = k.width() - 30;
    });
}