function drawEnemies() {
    enemies.forEach(enemy => {
        ctx.fillStyle = '#0F0';
        ctx.fillRect(
            enemy.x - enemy.width / 2,
            enemy.y - enemy.height / 2,
            enemy.width,
            enemy.height
        );
        ctx.fillStyle = '#0F00F0';
        ctx.fillText('CX', enemy.x - enemy.width / 2, enemy.y + enemy.height / 3, 40);
    });
}

function updateEnemies() {
    enemies.forEach(enemy => {
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance > 0) {
            enemy.x += (dx / distance) * enemy.speed;
            enemy.y += (dy / distance) * enemy.speed;
        }
    });
}

function spawnEnemy() {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.min(canvas.width, canvas.height);
    const enemy = {
        x: safeZone.x + Math.cos(angle) * radius,
        y: safeZone.y + Math.sin(angle) * radius,
        width: 20,
        height: 20,
        speed: 1,
    };
    enemies.push(enemy);
}
