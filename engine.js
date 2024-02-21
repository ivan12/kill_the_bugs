function runningGame() {
    // Update game
    updatePlayer();
    updateEnemies();
    updateMatrix();
    updateSafeZone();
    updateWaves();

    // Render do game
    ctx.save();
    drawSafeZone();
    drawPlayer();
    drawEnemies();
    drawMatrix();

    if (!boss) {
        /* show or not lightEffect */
        if (lightShadowOn) {
            drawLightingEffect();
        }
        /* show or not miniMap */
        if (miniMapOn) {
            drawMinimap();
        }
    }
    ctx.restore();

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
    deltaTime = timestamp - lastTimestamp;

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

initializeWaves();

requestAnimationFrame(gameLoop);
