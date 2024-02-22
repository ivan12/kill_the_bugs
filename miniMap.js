function drawMinimap() {
    // Defina as dimensões do minimapa e sua posição no canvas principal
    const minimapWidth = canvas.width / 4;
    const minimapHeight = canvas.height / 4;
    const minimapX = canvas.width - minimapWidth - 19;
    const minimapY = 80;

    // Mapeia as posições dos inimigos para o minimapa com base na escala
    const scale = minimapWidth / canvas.width;
    ctx.fillStyle = 'red'; // Cor para os inimigos
    ctx.strokeStyle = 'white'; // Cor da borda
    ctx.lineWidth = 1;

    // Desenha o background do canvas no minimapa
    ctx.drawImage(canvas, minimapX, minimapY, minimapWidth, minimapHeight);

    // Mapeia a posição do jogador para o minimapa
    const playerMinimapX = minimapX + player.x * scale;
    const playerMinimapY = minimapY + player.y * scale;

    // Desenha o jogador no minimapa
    ctx.fillStyle = 'blue'; // Cor para o jogador
    ctx.beginPath();
    ctx.arc(playerMinimapX, playerMinimapY, 5 * scale, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.strokeRect(minimapX, minimapY, minimapWidth, minimapHeight);

    // Desenha a safeZone no minimapa
    const safeZoneMinimapX = minimapX + safeZone.x * scale;
    const safeZoneMinimapY = minimapY + safeZone.y * scale;
    const safeZoneMinimapRadius = safeZone.radius * scale;

    ctx.strokeStyle = 'green'; // Cor da borda da safeZone
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(safeZoneMinimapX, safeZoneMinimapY, safeZoneMinimapRadius, 0, Math.PI * 2);
    ctx.stroke();

    // Mapeia as posições dos inimigos para o minimapa
    for (const enemy of enemies) {
        const enemyMinimapX = minimapX + enemy.x * scale;
        const enemyMinimapY = minimapY + enemy.y * scale;
        const enemyMinimapSize = 10 * scale; // Tamanho fixo para representar os inimigos no minimapa
        const colorEnemy = colorsPriority[enemy.priority];

        // Desenha o inimigo no minimapa
        ctx.beginPath();
        ctx.strokeStyle = colorEnemy;
        ctx.fillStyle = colorEnemy;
        ctx.arc(enemyMinimapX, enemyMinimapY, enemyMinimapSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
    }
}
