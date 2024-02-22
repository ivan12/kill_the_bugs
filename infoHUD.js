// Display info Head Up Display
function drawInfoHUD() {
    /* life bar */
    ctx.globalAlpha = 0.6;
    const playerHealthPercentage = player.health / 100;
    ctx.fillStyle = '#1C1C1C';
    ctx.fillRect(posXBar, posYBar, playerHealthBarWidth, playerHealthBarHeight);
    ctx.fillStyle = '#0F0';
    ctx.fillRect(
        posXBar,
        posYBar,
        playerHealthBarWidth * playerHealthPercentage,
        playerHealthBarHeight
    );
    ctx.strokeStyle = '#FFF';
    ctx.strokeRect(posXBar, posYBar, playerHealthBarWidth, playerHealthBarHeight);
    ctx.globalAlpha = 1.0;
    // info feed to player
    ctx.fillStyle = '#1C1C1C';
    ctx.font = 'bold 14px Arial';
    ctx.fillText(`Vida: ${player.health}`, posXBar + 5, posYBar + 18);

    if (!boss) {
        // other infos HUD
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 20px Arial';

        ctx.fillText(`Sprint: ${wave}`, canvas.width - 100, 30);
        ctx.fillText(`Bugs CX: ${enemies.length}`, 20, 30);

        ctx.font = '18px Arial';
        ctx.fillText(`FPS: ${parseInt(deltaTime)}`, 20, 60);

        if (debug) {
            let distanceDisplayIAEnemy = 0;
            enemies?.map(enemy => {
                distanceDisplayIAEnemy += 30;
                ctx.fillText(`Enemy IA: ${enemy.action}`, 20, 60 + distanceDisplayIAEnemy);
            });
        }

        ctx.fillText(`Dica: Fique com sua equipe`, 360, 780);

        if (nextWaveTimer >= 1) {
            ctx.font = 'bold 16px Arial';
            ctx.fillText(`Next Sprint: ${parseInt(nextWaveTimer)}s`, canvas.width - 131, 55);
        }
    } else {
        ctx.fillText(`MATE O HotFix!`, 10, 130);
    }
}
