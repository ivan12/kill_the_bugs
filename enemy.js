function drawEnemies() {
    enemies.forEach(enemy => {
        ctx.fillStyle = '#FF0000';
        ctx.fillRect(
            enemy.x - enemy.width / 2,
            enemy.y - enemy.height / 2,
            enemy.width,
            enemy.height
        );
        ctx.fillStyle = '#0F00F0';
        ctx.font = '20px';
        ctx.fillText(
            `CX ${boss ? '' : enemy.points}`,
            enemy.x - enemy.width / 2,
            enemy.y + enemy.height / 3,
            40
        );
    });
}

function moveEnemy(enemy) {
    const speed = 1;

    // Movimentação aleatória quando o jogador está na safezone
    if (isPlayerInsideSafeZone()) {
        wanderEnemy(enemy, speed);
    } else {
        // Persegue o jogador quando fora da safezone
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distanceToPlayer = Math.sqrt(dx * dx + dy * dy);
        attackPlayer(enemy, dx, dy, distanceToPlayer, speed);
    }

    // Mantém os inimigos afastados das bordas
    moveEnemyAwayFromEdge(enemy);
}

function moveEnemyAwayFromEdge(enemy, margin = 50) {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    if (enemy.x < margin) {
        enemy.x += margin - enemy.x;
    } else if (enemy.x > canvasWidth - margin) {
        enemy.x -= enemy.x - (canvasWidth - margin);
    }

    if (enemy.y < margin) {
        enemy.y += margin - enemy.y;
    } else if (enemy.y > canvasHeight - margin) {
        enemy.y -= enemy.y - (canvasHeight - margin);
    }
}

function wanderEnemy(enemy, speed) {
    const changeDirectionProbability = 0.02;

    // Altera a direção aleatoriamente com base na probabilidade
    if (Math.random() < changeDirectionProbability) {
        const angle = Math.random() * 2 * Math.PI;
        enemy.directionX = Math.cos(angle);
        enemy.directionY = Math.sin(angle);
    }

    // Move o inimigo na direção atual
    enemy.x += enemy.directionX * speed;
    enemy.y += enemy.directionY * speed;

    // Mantém o inimigo dentro dos limites da tela
    enemy.x = Math.max(0, Math.min(enemy.x, canvas.width - enemy.width));
    enemy.y = Math.max(0, Math.min(enemy.y, canvas.height - enemy.height));
}

function attackPlayer(enemy, dx, dy, distance, speed) {
    if (distance > 0) {
        enemy.x += (dx / distance) * speed;
        enemy.y += (dy / distance) * speed;
    }
}

function isPlayerInsideSafeZone() {
    const dx = player.x - safeZone.x;
    const dy = player.y - safeZone.y;
    const distanceToSafeZone = Math.sqrt(dx * dx + dy * dy);
    return distanceToSafeZone <= safeZone.radius;
}

function updateEnemies() {
    enemies.forEach(enemy => {
        moveEnemy(enemy);
    });
}

function spawnEnemy() {
    const angle = Math.random() * 2 * Math.PI;
    const enemy = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 20,
        height: 20,
        speed: 1,
        points: getRandomFibonacciNumber(),
        directionX: Math.cos(angle),
        directionY: Math.sin(angle),
    };
    enemies.push(enemy);
}
