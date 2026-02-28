import { submarine } from "./main.js";

export function movement() {
    k.onKeyDown("left", () => {
        submarine.move(-5, 0);
    });

    k.onKeyDown("right", () => {
        submarine.move(5, 0);
    });
}
