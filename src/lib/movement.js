import { submarine, k } from "../main.js";

export function movement() {
    k.onKeyDown("left", () => {
        submarine.move(-500, 0);
    });

    k.onKeyDown("right", () => {
        submarine.move(500, 0);
    });

    k.onKeyDown("up", () => {
        submarine.move(0, -500);
    });
    
    k.onKeyDown("down", () => {
        submarine.move(0, 500);
    });
}
