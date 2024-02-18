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

function updateEnemies() {
    enemies.forEach(enemy => {
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distanceToPlayer = Math.sqrt(dx * dx + dy * dy);

        const distanceToSafeZone = Math.sqrt(
            (player.x - safeZone.x) ** 2 + (player.y - safeZone.y) ** 2
        );

        // small AI
        if (distanceToSafeZone > safeZone.radius) {
            attackPlayer(enemy, dx, dy, distanceToPlayer);
        } else if (distanceToPlayer < safeZone.radius) {
            // Leave player
            fleePlayer(enemy, dx, dy, distanceToPlayer);
        } else {
            fleePlayer(enemy, dx, dy, distanceToPlayer);
        }
        // Verify limits screen
        enemy.x = Math.max(0, Math.min(enemy.x, canvas.width - enemy.width));
        enemy.y = Math.max(0, Math.min(enemy.y, canvas.height - enemy.height));

        // close the border screen!!!
        const distanceToCenter = Math.sqrt((enemy.x - center.x) ** 2 + (enemy.y - center.y) ** 2);
        const minDistanceToCenter = 50;

        if (distanceToCenter < minDistanceToCenter) {
            const angleToCenter = Math.atan2(center.y - enemy.y, center.x - enemy.x);
            enemy.x += Math.cos(angleToCenter) * enemy.speed;
            enemy.y += Math.sin(angleToCenter) * enemy.speed;
        }
    });
}

function attackPlayer(enemy, dx, dy, distance) {
    if (distance > 0) {
        enemy.x += (dx / distance) * enemy.speed;
        enemy.y += (dy / distance) * enemy.speed;
    }
}

function fleePlayer(enemy, dx, dy, distance) {
    if (distance > 0) {
        enemy.x -= (dx / distance) * enemy.speed;
        enemy.y -= (dy / distance) * enemy.speed;
    }
}

function spawnEnemy() {
    const angle = Math.random() * Math.PI * 2;
    const radius = Math.min(canvas.width - 20, canvas.height - 20);
    const enemy = {
        x: safeZone.x + Math.cos(angle) * radius,
        y: safeZone.y + Math.sin(angle) * radius,
        width: 20,
        height: 20,
        speed: 1,
        points: getRandomFibonacciNumber(),
    };
    enemies.push(enemy);
}
