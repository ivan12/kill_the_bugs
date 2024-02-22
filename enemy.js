function drawEnemies() {
    enemies.forEach(enemy => {
        /* draw with priority >> choose sprite color */
        listSpritesEnemies[enemy.priority].draw(enemy.x, enemy.y, enemy.direction, enemy.speed);

        if (debug) {
            drawVisionRadius(enemy);
            ctx.strokeStyle = '#0000FF';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(enemy.x, enemy.y, enemy.radius, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.closePath();
        }

        ctx.fillStyle = '#0F00F0';
        ctx.fillText(
            `${boss ? '' : canSeePlayer(enemy) ? enemy.points : ''}`,
            enemy.x - 10,
            enemy.y - enemy.radius - 5,
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
        // Persegue o jogador apenas se estiver dentro do raio de visão
        if (canSeePlayer(enemy)) {
            attackPlayer(enemy, speed);
        } else {
            wanderEnemy(enemy, speed);
        }
    }

    // Mantém os inimigos afastados das bordas
    moveEnemyAwayFromEdge(enemy);
}

function moveEnemyAwayFromEdge(enemy, margin = 50) {
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    if (enemy.x < margin) {
        enemy.x += margin - enemy.x;
        enemy.direction = 'right';
    } else if (enemy.x > canvasWidth - margin) {
        enemy.x -= enemy.x - (canvasWidth - margin);
        enemy.direction = 'left';
    }

    if (enemy.y < margin) {
        enemy.y += margin - enemy.y;
        enemy.direction = 'down';
    } else if (enemy.y > canvasHeight - margin) {
        enemy.y -= enemy.y - (canvasHeight - margin);
        enemy.direction = 'up';
    }
}

function wanderEnemy(enemy, speed) {
    const changeDirectionProbability = 0.02;

    // Altera a direção aleatoriamente com base na probabilidade
    if (Math.random() < changeDirectionProbability) {
        setRandomDirection(enemy);
        enemy.action = 'Vagar pelo Mapa...';
    }

    // Move o inimigo na direção atual
    enemy.x += enemy.directionX * speed;
    enemy.y += enemy.directionY * speed;

    // Mantém o inimigo dentro dos limites da tela
    enemy.x = Math.max(0, Math.min(enemy.x, canvas.width - enemy.width));
    enemy.y = Math.max(0, Math.min(enemy.y, canvas.height - enemy.height));
}

function setRandomDirection(enemy) {
    const angle = Math.random() * 2 * Math.PI;

    enemy.directionX = Math.cos(angle);
    enemy.directionY = Math.sin(angle);

    // Determina a direção com base nas componentes de direção
    if (Math.abs(enemy.directionX) > Math.abs(enemy.directionY)) {
        enemy.direction = enemy.directionX > 0 ? 'right' : 'left';
    } else {
        enemy.direction = enemy.directionY > 0 ? 'down' : 'up';
    }
}

function attackPlayer(enemy, speed) {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;

    const distanceToPlayer = Math.sqrt(dx * dx + dy * dy);

    if (canSeePlayer(enemy) && distanceToPlayer > 0.4) {
        enemy.action = 'Atacar Jogador!';
        const moveX = (dx / distanceToPlayer) * speed;
        const moveY = (dy / distanceToPlayer) * speed;

        const nextX = enemy.x + moveX;
        const nextY = enemy.y + moveY;

        if (!enemyHasCollisionWithPlayer(enemy)) {
            enemy.x = nextX;
            enemy.y = nextY;
        }
    }
}

function canSeePlayer(enemy) {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const distanceToPlayer = Math.sqrt(dx * dx + dy * dy);

    // Defina o raio de visão do inimigo
    const visionRadius = 150;

    return distanceToPlayer <= visionRadius;
}

function drawVisionRadius(enemy) {
    ctx.beginPath();
    ctx.arc(enemy.x, enemy.y, 150, 0, 2 * Math.PI);
    ctx.strokeStyle = 'rgba(255, 0, 0, 0.3)';
    ctx.stroke();
    ctx.closePath();
}

function updateEnemies() {
    enemies.forEach(enemy => {
        moveEnemy(enemy);
    });
}

function spawnEnemy() {
    const angle = Math.random() * 2 * Math.PI;
    const priority = getPriority();
    const enemy = {
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        width: 20,
        height: 20,
        radius: 19,
        direction: 'right',
        action: '',
        speed: priority * 2,
        points: getRandomFibonacciNumber(),
        priority: priority,
        directionX: Math.cos(angle),
        directionY: Math.sin(angle),
    };
    enemies.push(enemy);
}
