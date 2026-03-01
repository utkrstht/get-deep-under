import { k } from "../main.js";
import { submarine } from "./submarine.js";

export function movement() {
    let velX = 0;

    const maxSpeed = 400;
    const acceleration = 200;
    const deceleration = 30;

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

        if (submarine.pos.x < 50) submarine.pos.x = 50; 
        if (submarine.pos.x > k.width() - 50) submarine.pos.x = k.width() - 50;
    });
}
