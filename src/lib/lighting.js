import { k } from "../main.js";
import { submarine } from "./submarine.js";

export function loadLighting() {}

export function loadLightinge() {
    k.loadShader(
        "flashlight",
        null,
        `
        uniform vec2 u_pos;
        uniform vec2 u_mouse;
        uniform float u_radius;
        uniform float u_angle;
        uniform float u_width;
        
        vec4 frag(vec2 pos, vec2 uv, vec4 color, sampler2D tex) {
            // Pos is usually in local space for the rect, so it matches screen coords if rect is screen size at 0,0
            
            // Distance from player center
            float dist = distance(pos, u_pos);
            
            // Calculate angle
            vec2 dir = pos - u_pos;
            float angle = atan(dir.y, dir.x);
            
            // Angle difference logic
            float angleDiff = abs(angle - u_angle);
            if (angleDiff > 3.14159) {
                angleDiff = 6.28318 - angleDiff;
            }
            
            float intensity = 0.0;
            
            // Check if inside cone
            if (angleDiff < u_width) {
                 float edge = smoothstep(u_width, u_width - 0.1, angleDiff);
                 // Falloff based on distance
                 float distFactor = 1.0 - smoothstep(0.0, u_radius, dist);
                 intensity = edge * distFactor;
            }

            // Player circle light
            float selfLight = 1.0 - smoothstep(40.0, 100.0, dist);
            intensity = max(intensity, selfLight);
            
            // Make the darkness very dark (0.98 alpha), light fully transparent (0.0 alpha)
            return vec4(0.0, 0.0, 0.0, 0.98 - (intensity * 0.98));
        }
    `,
    );

    const overlay = k.add([
        k.rect(k.width(), k.height()),
        k.color(0, 0, 0),
        k.pos(0, 0),
        k.fixed(),
        k.z(900),
        k.shader("flashlight"),
        "flashlight_overlay",
    ]);

    overlay.onUpdate(() => {
        if (!submarine || !submarine.exists()) return;

        if (!overlay.uniform) overlay.uniform = {};

        const mousePos = k.mousePos();
        const subPos = submarine.screenPos();

        const dir = mousePos.sub(subPos);
        const rad = Math.atan2(dir.y, dir.x);

        const ONE_RADIAN = 57.2958;
        const widthInRadians = 45 / ONE_RADIAN;

        overlay.uniform["u_pos"] = subPos;
        overlay.uniform["u_mouse"] = mousePos;
        overlay.uniform["u_radius"] = 400.0;
        overlay.uniform["u_angle"] = rad;
        overlay.uniform["u_width"] = widthInRadians;
    });
}
