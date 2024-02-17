for (let i = 0; i < columns; i++) {
    drops[i] = canvas.height;
}

function runningGame() {
    // Atualização do game
    updatePlayer();
    updateEnemies();
    updateMatrix();

    // Render do game
    drawMatrix();
    drawSafeZone();
    drawPlayer();
    drawEnemies();

    if (boss) {
        updateBoss();
        drawBoss();
    }

    // Mostrar informações na tela
    ctx.fillStyle = '#FFF';
    ctx.font = '16px Arial';
    ctx.fillText(`Player Vida: ${player.health}`, 10, 20);
    if (!boss) {
        ctx.fillText(`Wave: ${wave}`, canvas.width - 200, 50);
        ctx.fillText(`Bugs de CX: ${enemies.length}`, 10, 60);
        ctx.fillText(`FIQUE COM SUA EQUIPE`, 10, 100);
        ctx.fillText(`Next Wave in: ${nextWaveTimer.toFixed(1)}s`, canvas.width - 200, 20);
    } else {
        ctx.fillText(`MATE O HOT FIX`, 10, 100);
    }
}

function pauseGame() {
    drawMatrix();
    drawSafeZone();
    drawPlayer();
    drawEnemies();
    drawBoss();

    // Mostrar informações na tela
    ctx.fillStyle = '#FFF';
    ctx.font = '16px Arial';
    ctx.fillText(`GAME PAUSED: PRESS ENTER TO RETURN`, 330, 300);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (current_screen === 'RUN_GAME') {
        runningGame();
    }

    if (current_screen === 'PAUSE') {
        drawMatrix();
        pauseGame();
    }

    if (current_screen === 'START') {
        drawStartScreen();
    }

    if (current_screen === 'GAME_OVER') {
        drawGameOverScreen();
    }

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', e => {
    switch (e.key) {
        case 'w':
            player.y -= player.speed;
            break;
        case 'ArrowUp':
            player.y -= player.speed;
            break;
        case 's':
            player.y += player.speed;
            break;
        case 'ArrowDown':
            player.y += player.speed;
            break;
        case 'a':
            player.x -= player.speed;
            break;
        case 'ArrowLeft':
            player.x -= player.speed;
            break;
        case 'd':
            player.x += player.speed;
            break;
        case 'ArrowRight':
            player.x += player.speed;
            break;
    }
});

initializeWaves();

gameLoop();

document.addEventListener('keydown', e => {
    if (current_screen === 'RUN_GAME' || current_screen === 'PAUSE') {
        switch (e.key) {
            case 'Escape':
                current_screen = 'PAUSE';
                break;
            case 'Enter':
                current_screen = 'RUN_GAME';
                break;
        }
    }
});
