function drawGameOverScreen() {
    ctx.fillStyle = '#FFF';
    ctx.font = '16px Arial';
    ctx.fillText(`GAME OVER`, canvas.width - canvas.width / 2 - 120, 350);
    ctx.fillText(`PRESS ENTER TO RESTART`, canvas.width - canvas.width / 2 - 120, 400);
    ctx.fillText(`PRESS ASC TO HOME SCREEN`, canvas.width - canvas.width / 2 - 120, 450);
}

function clearGameVars() {
    player.x = canvas.width / 2;
    player.y = canvas.height / 2;
    player.health = 100;
    boss = null;
    enemies = [];
    nextWaveTimer = 3;
    wave = 1;
}

document.addEventListener('keydown', e => {
    if (current_screen === 'GAME_OVER') {
        switch (e.key) {
            case 'Enter':
                clearGameVars();
                current_screen = 'RUN_GAME';
                break;
            case 'Escape':
                clearGameVars();
                current_screen = 'START';
                break;
        }
    }
});
