import { k } from "../main.js";
import { submarine } from "./submarine.js";
import { gameState } from "../store.js";

export function movement() {
    let velX = 0;
    
    // Depth system
    const DEPTH_PER_SEC = 10;

    // Add depth counter UI
    const depthLabel = k.add([
        k.text("Depth: 0 ft", { font: "Pixelify Sans" }),
        k.pos(k.width() / 2, 20),
        k.anchor("center"),
        k.fixed(),
        k.z(100),
    ]);
    
    // Background scrolling effect (simulate descent)
    k.loop(0.5, () => {
        k.add([
            k.circle(k.rand(2, 6)),
            k.pos(k.rand(0, k.width()), k.height()), // Start at bottom
            k.color(100, 100, 255),
            k.opacity(0.3),
            k.move(k.UP, k.rand(50, 150)), // Move up
            k.offscreen({ destroy: true }), // Destroy when off screen
            "bubble",
            k.z(-1), // Behind objects
        ]);
    });

    const maxSpeed = 300;
    const acceleration = 400;
    const deceleration = 200;

    k.onUpdate(() => {
        if (gameState.isGameOver) return;

        // Update depth
        gameState.level += DEPTH_PER_SEC * k.dt();
        depthLabel.text = `Depth: ${Math.floor(gameState.level)} ft`;

        let moving = false;

        if (k.isKeyDown("left")) {
            velX -= acceleration * k.dt();
            moving = true;
        }

        if (k.isKeyDown("right")) {
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

        // Screen boundaries
        if (submarine.pos.x < 30) submarine.pos.x = 30; // Half sprite width
        if (submarine.pos.x > k.width() - 30) submarine.pos.x = k.width() - 30;
    });
}
