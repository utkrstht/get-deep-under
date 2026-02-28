import { k } from "../main.js";
import { gameState } from "../store.js";

const tips = [
    "Try to avoid the mines next time, or just blow them up with your bomb!", 
    "okay uhh people make mistakes just like avoid the mines", 
    "how fucking unclear is that the whole fucking premise of the game is to AVOID the FUCKING MINES."
];

export function showDeathScreen(reason) {
    if (gameState.isGameOver) return;
    gameState.isGameOver = true;

    // Darken screen (fade in)
    const overlay = k.add([
        k.rect(k.width(), k.height()),
        k.color(0, 0, 0),
        k.opacity(0),
        k.fixed(),
        k.z(999), // High z-index to cover everything
    ]);

    k.tween(0, 1, 1, (val) => overlay.opacity = val, k.easings.linear);

    k.wait(1.5, () => {
        // Main text
        k.add([
            k.text("You have been lost at sea", { 
                size: 48, 
                width: k.width() - 100, 
                align: "center",
                font: "Pixelify Sans" // Using the requested font
            }),
            k.pos(k.center().x, k.center().y - 80),
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
            k.pos(k.center().x, k.center().y),
            k.anchor("center"),
            k.color(200, 200, 200),
            k.fixed(),
            k.z(1000),
        ]);

        // Tip text
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        k.add([
            k.text(`Tip: ${randomTip}`, { 
                size: 18, 
                width: k.width() - 150, 
                align: "center",
                font: "Pixelify Sans"
            }),
            k.pos(k.center().x, k.center().y + 80),
            k.anchor("center"),
            k.color(150, 150, 150),
            k.fixed(),
            k.z(1000),
        ]);
    });
}
