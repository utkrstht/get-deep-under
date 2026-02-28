import { submarine, k } from "../main.js";

export function movement() {
    // Current velocity
    let velX = 0;
    
    // Depth system
    let currentDepth = 0;
    const DEPTH_PER_SEC = 5; // 18-20 feet/second
    
    // Add depth counter UI
    const depthLabel = k.add([
        k.text("0 ft"),
        k.pos(k.width() / 2, 20),
        k.anchor("center"),
        k.fixed(), // Stays in place on screen
        k.z(100), // Ensure on top
    ]);

    // Movement constants
    const MAX_SPEED = 150;
    const ACCELERATION = 60; // Slower acceleration for inertia feel
    const DECELERATION = 50; // Slower deceleration for inertia feel

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

    k.onUpdate(() => {
        let moved = false;
        // Handle input for horizontal movement
        if (k.isKeyDown("left")) {
            velX -= ACCELERATION * k.dt();
            moved = true;
        }
        
        if (k.isKeyDown("right")) {
            velX += ACCELERATION * k.dt();
            moved = true;
        }

        // Apply deceleration (friction) only when no key is pressed
        if (!moved) {
            // Approach 0 from positive or negative
            if (velX > 0) {
                velX -= DECELERATION * k.dt();
                if (velX < 0) velX = 0;
            } else if (velX < 0) {
                velX += DECELERATION * k.dt();
                if (velX > 0) velX = 0;
            }
        }

        // Clamp velocity to max speed
        if (velX > MAX_SPEED) velX = MAX_SPEED;
        if (velX < -MAX_SPEED) velX = -MAX_SPEED;

        // Apply horizontal velocity only (submarine stays at fixed vertical position)
        submarine.move(velX, 0);

        // Update depth
        currentDepth += DEPTH_PER_SEC * k.dt();
        depthLabel.text = `Depth: ${Math.floor(currentDepth)} ft`;
    });
}
