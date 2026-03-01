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

    // Stop background music
    if (k.bgMusic) k.bgMusic.paused = true;

    // Play Game Over sound
    k.play("gameover");

    // Show Parin image during game over sequence
    // Use try/catch or safety check if sprite not loaded yet? 
    // Kaplay usually handles missing sprites gracefully (rendering nothing or a placeholder).
    const parin = k.add([
        k.sprite("parin"),
        k.pos(k.center()),
        k.anchor("center"),
        k.z(2000), // On top of everything
        k.fixed(),
        k.scale(0.5), // Adjust scale if needed
    ]);

    // Wait for sound/image (e.g., 3 seconds) then show UI
    k.wait(3, () => {
        k.destroy(parin);

        const overlay = k.add([
            k.rect(k.width(), k.height()),
            k.color(0, 0, 0),
            k.opacity(0),
            k.fixed(),
            k.z(999), 
        ]);

        k.tween(0, 1, 1, (val) => overlay.opacity = val, k.easings.linear);

        k.wait(1.0, () => {
            k.add([
                k.text("You have been lost at sea", { 
                size: 48, 
                width: k.width() - 100, 
                align: "center",
                font: "Pixelify Sans" 
            }),
            k.pos(k.center().x, k.center().y - 80),
            k.anchor("center"),
            k.color(255, 255, 255),
            k.fixed(),
            k.z(1000),
        ]);

        let reasonText = "";
        if (reason === "mine") {
            reasonText = "You collided with a sea mine";
        } else if (reason === "whale") {
            reasonText = "A Whale attacked you with sonar, destroying your submarine";
        } else if (reason === "bomb") {
            reasonText = "You were too close to your own bomb";
        }

        const tipText = reason === "bomb" ? "Try to stay away from your bomb after throwing it!" : tips[Math.floor(Math.random() * tips.length)];

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

        k.add([
            k.text(`Tip: ${tipText}`, { 
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

        const menuBtn = k.add([
            k.rect(260, 60, { radius: 10 }),
            k.pos(k.center().x, k.center().y + 160),
            k.anchor("center"),
            k.color(0, 0, 0),
            k.area(),
            "menuBtn",
            k.fixed(),
            k.z(1001), 
        ]);
        
        menuBtn.add([
             k.text("Return to Menu", { size: 28, font: "Pixelify Sans" }),
             k.anchor("center"),
             k.color(255, 255, 255),
        ]);
        
        menuBtn.onClick(() => k.go("menu"));
        
        k.onHover("menuBtn", (b) => b.color = k.rgb(50, 50, 50));
        k.onHoverEnd("menuBtn", (b) => b.color = k.rgb(0, 0, 0));

        // Depth at bottom
        k.add([
            k.text(`Depth reached: ${Math.floor(gameState.level)} ft`, {
                size: 32,
                font: "Pixelify Sans",
                align: "center",
            }),
            k.pos(k.center().x, k.height() - 50),
            k.anchor("center"),
            k.color(255, 255, 255),
            k.fixed(),
            k.z(1000),
        ]);
    }); // Close inner wait (1.0)
    }); // Close outer wait (3)
}
