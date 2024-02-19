function runningGame() {
    // Update game
    updatePlayer();
    updateEnemies();
    updateMatrix();
    updateSafeZone();
    updateWaves();

    // Render do game
    drawSafeZone();
    drawPlayer();
    drawEnemies();
    drawMatrix();

    if (boss) {
        updateBoss();
        drawBoss();
    }

    // info screen
    drawInfoHUD();
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

    /* Draw startGame bg */
    if (current_screen === 'START') {
        background = startGameImage;
    }

    /* Draw gameOver bg */
    if (current_screen === 'GAME_OVER') {
        background = backgroundGameOverImage;
    }

    ctx.drawImage(background, 0, 0, backgroundImage.width, backgroundImage.height);
}

/* game update loop - core */
function gameLoop(timestamp) {
    const deltaTime = timestamp - lastTimestamp;

    if (deltaTime >= frameDuration) {
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

        lastTimestamp = timestamp - (deltaTime % frameDuration);
    }

    requestAnimationFrame(gameLoop);
}

document.addEventListener('keydown', e => {
    if (current_screen === 'RUN_GAME') {
        let newX = player.x;
        let newY = player.y;

        switch (e.key) {
            case 'w':
            case 'ArrowUp':
                newY -= player.speed;
                break;
            case 's':
            case 'ArrowDown':
                newY += player.speed;
                break;
            case 'a':
            case 'ArrowLeft':
                newX -= player.speed;
                break;
            case 'd':
            case 'ArrowRight':
                newX += player.speed;
                break;
        }

        // Verifica se o novo posicionamento do jogador colide com algum inimigo
        let collisionDetected = false;
        enemies.forEach(enemy => {
            const dx = newX - enemy.x;
            const dy = newY - enemy.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < player.width / 2 + enemy.width / 2) {
                collisionDetected = true;
            }
        });

        // Se não houver colisão, atualiza a posição do jogador
        if (!collisionDetected) {
            player.x = newX;
            player.y = newY;
        }
    }
});

initializeWaves();

requestAnimationFrame(gameLoop);

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
