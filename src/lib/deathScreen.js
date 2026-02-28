import { k } from "../main.js";
import { gameState } from "../store.js";

export function showDeathScreen(reason) {
    if (gameState.isGameOver) return;
    gameState.isGameOver = true;

    // Darken screen
    k.add([
        k.rect(k.width(), k.height()),
        k.color(0, 0, 0),
        k.opacity(0.75),
        k.fixed(),
        k.z(999), // High z-index to cover everything
    ]);

    // Main text
    k.add([
        k.text("You have been lost at sea", { 
            size: 48, 
            width: k.width() - 100, 
            align: "center",
            font: "Pixelify Sans" // Using the requested font
        }),
        k.pos(k.center().x, k.center().y - 50),
        k.anchor("center"),
        k.color(255, 255, 255),
        k.fixed(),
        k.z(1000),
    ]);

    // Reason text
    let reasonText = "";
    if (reason === "mine") {
        reasonText = "You collided with a sea mine";
    } else if (reason === "whale") {
        reasonText = "A Whale attacked you with sonar, destroying your submarine";
    }

    k.add([
        k.text(reasonText, { 
            size: 24, 
            width: k.width() - 100, 
            align: "center",
            font: "Pixelify Sans"
        }),
        k.pos(k.center().x, k.center().y + 50),
        k.anchor("center"),
        k.color(200, 200, 200),
        k.fixed(),
        k.z(1000),
    ]);
}
