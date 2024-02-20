function drawGameOverScreen() {
    ctx.fillStyle = '#000';
    ctx.font = 'bold 36px Arial';
    ctx.fillText(`GAME OVER`, canvas.width - canvas.width / 2 - 130, 350);
    ctx.fillStyle = '#FF4500';
    ctx.font = 'bold 25px Arial';
    ctx.fillText(`PRESS ENTER TO RESTART`, canvas.width - canvas.width / 2 - 180, 400);
    ctx.fillText(`PRESS ASC TO HOME`, canvas.width - canvas.width / 2 - 180, 450);
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
