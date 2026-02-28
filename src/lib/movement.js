import { submarine, k } from "../main.js";

export function movement() {
    let velX = 0;

    const maxSpeed = 150;
    const acceleration = 100;
    const deceleration = 40;

    k.onUpdate(() => {
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
    });
}
