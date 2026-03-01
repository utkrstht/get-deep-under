import kaplay from "kaplay";
import { createSubmarine } from "./lib/submarine.js";
import { movement } from "./lib/movement.js";
import { enemySpawningTick } from "./lib/enemies/enemySpawningTick.js";
import { loadHUD } from "./lib/hud.js";
import { weapon } from "./lib/weapon.js";
import { loadLighting } from "./lib/lighting.js";
import { resetGameState } from "./store.js"; 

export const k = kaplay({
    width: 900,
    height: 600,
});
k.loadRoot("./");
k.loadSprite("main_menu_bg", "sprites/main_menu.png");
// Preload crucial sprites
k.loadSprite("parin", "sprites/parin.png"); 
k.loadSound("bg", "sfx/bg.mp3");
k.loadSound("explosion", "sfx/explosion.mp3");
k.loadSound("gameover", "sfx/gameover.mp3");

k.scene("menu", () => {
    const bg = k.add([
        k.sprite("main_menu_bg"),
        k.pos(0, 0),
        k.scale(Math.max(k.width() / 900, k.height() / 600)),
        k.fixed(),
    ]);

    const playBtn = k.add([
        k.rect(200, 50, { radius: 10 }),
        k.color(0, 0, 0),
        k.pos(k.center().x, k.center().y + 50),
        k.anchor("center"),
        k.area(),
        "btn",
        { action: () => k.go("game") }
    ]);

    playBtn.add([
        k.text("Play", { size: 32, font: "Pixelify Sans" }),
        k.anchor("center"),
        k.color(255, 255, 255),
    ]);

    // Exit Button
    const exitBtn = k.add([
        k.rect(200, 50, { radius: 10 }),
        k.color(0, 0, 0),
        k.pos(k.center().x, k.center().y + 120),
        k.anchor("center"),
        k.area(),
        "btn",
        { action: () => {
             if (window.confirm("Exit game?")) {
                window.close();
                // Fallback if blocked
                k.add([
                    k.text("Please close the tab manually.", { size: 24 }),
                    k.pos(k.center().x, k.center().y + 180),
                    k.anchor("center"),
                    k.color(0, 0, 0)
                ]);
            }
        }}
    ]);

    exitBtn.add([
        k.text("Exit", { size: 32, font: "Pixelify Sans" }),
        k.anchor("center"),
        k.color(255, 255, 255),
    ]);

    // Interactions
    k.onClick("btn", (b) => b.action());

    // Hover effect for buttons
    k.onHover("btn", (b) => b.color = k.rgb(50, 50, 50));
    k.onHoverEnd("btn", (b) => b.color = k.rgb(0, 0, 0));
});

// Game Scene
k.scene("game", () => {
    // Play Background Sound (looping)
    k.bgMusic = k.play("bg", {
        loop: true,
        volume: 0.5,
    });

    // Make sure music stops when leaving scene or dying ( handled in deathScreen )
    k.onSceneLeave(() => {
        if (k.bgMusic) k.bgMusic.paused = true; 
    });

    resetGameState();
    createSubmarine();
    movement();
    weapon();
    enemySpawningTick();
    loadHUD();
    loadLighting();
});

// Start with menu
k.go("menu");
