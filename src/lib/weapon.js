import { k } from "../main.js";
import { submarine } from "./submarine.js";
import { gameState } from "../store.js"; 
import { showDeathScreen } from "./deathScreen.js";
export function weapon() {
    k.loadSprite("submarine_bomb", "sprites/submarine_bomb.png"); 
    
    let cooldownTimer = 0;
    const COOLDOWN_TIME = 1;

    const uiX = k.width() / 2;
    const uiY = k.height() - 50;
    
    const uiOverlay = k.add([
        k.circle(30),
        k.pos(uiX, uiY),
        k.anchor("center"),
        k.color(0, 0, 0),
        k.opacity(0),
        k.fixed(),
        k.z(102),
        "cooldownOverlay"
    ]);

    const uiTimerText = k.add([
        k.text("", { size: 24, font: "Pixelify Sans" }),
        k.pos(uiX, uiY),
        k.anchor("center"),
        k.color(255, 0, 0),
        k.fixed(),
        k.z(103),
    ]);

    k.onUpdate(() => {
        if (cooldownTimer > 0) {
            cooldownTimer -= k.dt();
            if (cooldownTimer < 0) cooldownTimer = 0;
            
            uiOverlay.opacity = 0.6;
            
            uiTimerText.text = Math.ceil(cooldownTimer).toString();
            uiTimerText.opacity = 1;
        } else {
            uiOverlay.opacity = 0;
            uiTimerText.opacity = 0;
        }
    });

    k.onClick(() => {
        if (gameState.isGameOver) return;
        if (!submarine) return;
        if (cooldownTimer > 0) return;

        cooldownTimer = COOLDOWN_TIME;

        const mousePos = k.mousePos();
        const subPos = submarine.pos.clone();
        
        const angle = subPos.angle(mousePos);
        const direction = mousePos.sub(subPos).unit();
        
        const EJECT_SPEED = 200;
        const DRAG = 50;

        const bomb = k.add([
            k.pos(subPos),
            k.sprite("submarine_bomb"),
            k.anchor("center"),
            k.area(),
            "bomb", 
            {
                velocity: direction.scale(EJECT_SPEED),
            }
        ]);

        k.wait(1.5, () => {
            explode(bomb);
        });

        bomb.onUpdate(() => {
            const currentSpeed = bomb.velocity.len();
            
            if (currentSpeed > 5) {
                const newSpeed = currentSpeed - DRAG * k.dt();
                bomb.velocity = bomb.velocity.unit().scale(newSpeed > 0 ? newSpeed : 0);
                bomb.move(bomb.velocity);
            } else {
                bomb.velocity = k.vec2(0, 0); 
            }
        });
    });
}

function explode(bombObj) {
    if (!bombObj.exists()) return; 

    const explosionPos = bombObj.pos;
    k.destroy(bombObj);
    
    // Explosion animation sprite
    const explosion = k.add([
        k.pos(explosionPos),
        k.anchor("center"),
        k.sprite("explosion_1"),
        k.scale(2),
        k.area({ scale: 2 }), 
        "explosion" 
    ]);
    
    // Animate the main explosion
    let frame = 1;
    const cancelAnim = k.loop(0.1, () => {
        frame++;
        if (frame <= 10) {
            explosion.use(k.sprite(`explosion_${frame}`));
        } else {
            cancelAnim.cancel();
            k.destroy(explosion);
        }
    });

    let hitCount = 0;
    const enemies = k.get("enemy");
    
    for (const enemy of enemies) {
        if (explosion.pos.dist(enemy.pos) < 175) {
            hitCount++;
            k.destroy(enemy);
            
            // Chain explosion visual
            const chainExplosion = k.add([
                k.pos(enemy.pos),
                k.anchor("center"),
                k.sprite("explosion_1"),
                k.scale(2),
            ]);
            
            let f = 1;
            const ca = k.loop(0.1, () => {
                f++;
                if (f <= 10) chainExplosion.use(k.sprite(`explosion_${f}`));
                else { ca.cancel(); k.destroy(chainExplosion); }
            });
        }
    }

    // HIT / MISS Feedback
    if (hitCount > 0) {
        k.add([
            k.text("HIT!", { size: 32, font: "Pixelify Sans" }),
            k.pos(explosionPos.sub(0, 50)),
            k.anchor("center"),
            k.color(0, 255, 0),
            k.move(k.vec2(0, -50), 40),
            k.opacity(1),
            k.lifespan(1, { fade: 0.5 }),
            k.z(200),
        ]);
    } else {
        k.add([
            k.text("MISS!", { size: 32, font: "Pixelify Sans" }),
            k.pos(explosionPos.sub(0, 50)),
            k.anchor("center"),
            k.color(255, 0, 0),
            k.move(k.vec2(0, -50), 40),
            k.opacity(1),
            k.lifespan(1, { fade: 0.5 }),
            k.z(200),
        ]);
    }

    if (submarine && submarine.exists() && explosion.pos.dist(submarine.pos) < 175) {
        k.destroy(submarine);
        showDeathScreen("bomb");
    }
}
