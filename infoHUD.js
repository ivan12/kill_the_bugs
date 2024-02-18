// Display info Head Up Display
function drawInfoHUD() {
    const playerHealthBarWidth = 200;
    const playerHealthBarHeight = 20;
    const playerHealthPercentage = player.health / 100;

    ctx.fillStyle = '#1C1C1C';
    ctx.fillRect(10, 10, playerHealthBarWidth, playerHealthBarHeight);
    ctx.fillStyle = '#F00';
    ctx.fillRect(10, 10, playerHealthBarWidth * playerHealthPercentage, playerHealthBarHeight);
    ctx.strokeStyle = '#000';
    ctx.strokeRect(10, 10, playerHealthBarWidth, playerHealthBarHeight);

    if (!boss) {
        // draw life bar
        const playerHealthBarWidth = 200;
        const playerHealthBarHeight = 20;
        const playerHealthPercentage = player.health / 100;

        ctx.fillStyle = '#1C1C1C';
        ctx.fillRect(10, 10, playerHealthBarWidth, playerHealthBarHeight);
        ctx.fillStyle = '#F00';
        ctx.fillRect(10, 10, playerHealthBarWidth * playerHealthPercentage, playerHealthBarHeight);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(10, 10, playerHealthBarWidth, playerHealthBarHeight);

        // info player
        ctx.fillStyle = '#1C1C1C';
        ctx.font = 'bold 12px Arial';
        ctx.fillText(`Vida: ${player.health}`, 15, 24);

        ctx.font = 'bold 20px Arial';

        // other infos HUD
        ctx.fillText(`Sprint: ${wave}`, canvas.width - 200, 70);
        ctx.fillText(`Total de Bugs de CX: ${enemies.length}`, 10, 90);
        ctx.fillText(`FIQUE COM SUA EQUIPE`, 10, 130);

        ctx.font = 'bold 16px Arial';

        if (nextWaveTimer > 0)
            ctx.fillText(`Next Sprint in: ${nextWaveTimer.toFixed(1)}s`, canvas.width - 200, 40);
    } else {
        ctx.fillText(`MATE O HotFix!`, 10, 130);
    }
}
