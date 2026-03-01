export let gameState = { 
    level: 0,
    isGameOver: false
};

export function resetGameState() {
    gameState.level = 0;
    gameState.isGameOver = false;
}
