// Display info Head Up Display
function drawInfoHUD() {
    //ctx.fillStyle = 'rgba(25, 0, 0, 0.3)';
    //ctx.roundRect(10, 10, 250, 250, [10]);
    //ctx.fill();

    // draw life bar
    const playerHealthBarWidth = 400;
    const playerHealthBarHeight = 25;
    const playerHealthPercentage = player.health / 100;
    const posXBar = 320;
    const posYBar = 15;

    ctx.fillStyle = '#1C1C1C';
    ctx.fillRect(posXBar, posYBar, playerHealthBarWidth, playerHealthBarHeight);
    ctx.fillStyle = '#0F0';
    ctx.fillRect(
        posXBar,
        posYBar,
        playerHealthBarWidth * playerHealthPercentage,
        playerHealthBarHeight
    );
    ctx.strokeStyle = '#000';
    ctx.strokeRect(posXBar, posYBar, playerHealthBarWidth, playerHealthBarHeight);

    // info player
    ctx.fillStyle = '#1C1C1C';
    ctx.font = 'bold 12px Arial';
    ctx.fillText(`Vida: ${player.health}`, posXBar + 5, posYBar + 18);

    if (!boss) {
        // other infos HUD
        ctx.fillStyle = '#FFF';
        ctx.font = 'bold 20px Arial';

        ctx.fillText(`Sprint: ${wave}`, canvas.width - 150, 30);
        ctx.fillText(`Bugs de CX: ${enemies.length}`, 20, 30);

        ctx.fillText(`Dica: Fique com sua equipe`, 360, 780);

        if (nextWaveTimer > 0) {
            ctx.font = 'bold 16px Arial';
            ctx.fillText(`Next Sprint: ${nextWaveTimer.toFixed(1)}s`, canvas.width - 150, 55);
        }
    } else {
        ctx.fillText(`MATE O HotFix!`, 10, 130);
    }
}
