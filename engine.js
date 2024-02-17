function runningGame() {
    // Update game
    updatePlayer();
    updateEnemies();
    updateMatrix();
    updateSafeZone();
    updateWaves();

    // Render do game
    drawPlayer();
    drawEnemies();
    drawSafeZone();
    drawMatrix();

    if (boss) {
        updateBoss();
        drawBoss();
    }

    // info screen
    ctx.fillStyle = '#1C1C1C';
    ctx.font = 'bold 20px Arial';
    ctx.fillText(`Player Vida: ${player.health}`, 10, 20);
    if (!boss) {
        ctx.fillText(`Sprint: ${wave}`, canvas.width - 200, 50);
        ctx.fillText(`Total de Bugs de CX: ${enemies.length}`, 10, 60);
        ctx.fillText(`FIQUE COM SUA EQUIPE`, 10, 100);
        if (nextWaveTimer > 0)
            ctx.fillText(`Next Sprint in: ${nextWaveTimer.toFixed(1)}s`, canvas.width - 200, 20);
    } else {
        ctx.fillText(`MATE O HotFix!`, 10, 100);
    }
}

function pauseGame() {
    drawMatrix();
    drawSafeZone();
    drawPlayer();
    drawEnemies();
    drawBoss();

    // info screen pause
    ctx.fillStyle = '#000';
    ctx.font = 'bold 26px Arial';
    ctx.fillText(`GAME PAUSED: PRESS ENTER TO RETURN`, 230, 300);
}

function drawBackground() {
    let background = null;

    /* Draw default imgBG or BossBG */
    background = boss ? backgroundBossImage : backgroundImage;

    /* Draw gameOver bg */
    if (current_screen === 'GAME_OVER') {
        background = backgroundGameOverImage;
    }

    ctx.drawImage(background, 0, 0, backgroundImage.width, backgroundImage.height);
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Render background
    drawBackground();

    // Render game
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
    if (current_screen === 'RUN_GAME') {
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
