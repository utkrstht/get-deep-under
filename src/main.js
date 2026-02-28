import kaplay from "kaplay";
const k = kaplay();
k.loadRoot("./");

k.loadSprite("submarine", "sprites/submarine.png");
k.add([k.pos(120, 80), k.sprite("submarine")]);
