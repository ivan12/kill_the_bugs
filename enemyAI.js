/* CORE - IA */
function moveEnemyAI(enemy) {
    // if player inside safeZone random moves
    if (isPlayerInsideSafeZone()) {
        wanderEnemy(enemy);
        return;
    }

    // see the player take same action
    if (canSeePlayer(enemy)) {
        if (player.points >= enemy.points) {
            escapeRun(enemy);
            return;
        }
        attackPlayer(enemy);
        return;
    }
    wanderEnemy(enemy);
}

/* Actions */
function attackPlayer(enemy) {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;

    const distanceToPlayer = Math.sqrt(dx * dx + dy * dy);

    if (canSeePlayer(enemy) && distanceToPlayer > 0.4) {
        enemy.action = 'Atacar Jogador!';
        const moveX = (dx / distanceToPlayer) * enemy.speed;
        const moveY = (dy / distanceToPlayer) * enemy.speed;

        const nextX = enemy.x + moveX;
        const nextY = enemy.y + moveY;

        if (!enemyHasCollisionWithPlayer(enemy)) {
            enemy.x = nextX;
            enemy.y = nextY;
        }
    }
}

function escapeRun(enemy) {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;

    const distanceToPlayer = Math.sqrt(dx * dx + dy * dy);

    if (canSeePlayer(enemy) && distanceToPlayer > 0.4) {
        enemy.action = 'Escapar RUN!';
        const moveX = (dx / distanceToPlayer) * enemy.speed;
        const moveY = (dy / distanceToPlayer) * enemy.speed;

        const nextX = enemy.x - moveX;
        const nextY = enemy.y - moveY;

        if (!enemyHasCollisionWithPlayer(enemy)) {
            enemy.x = nextX;
            enemy.y = nextY;
        }
    }
}

function wanderEnemy(enemy) {
    const changeDirectionProbability = 0.02;

    // Altera a direção aleatoriamente com base na probabilidade
    if (Math.random() < changeDirectionProbability) {
        setRandomDirection(enemy);
        enemy.action = 'Vagar pelo Mapa...';
    }

    // Move o inimigo na direção atual
    enemy.x += enemy.directionX * enemy.speed;
    enemy.y += enemy.directionY * enemy.speed;

    // Mantém o inimigo dentro dos limites da tela
    enemy.x = Math.max(0, Math.min(enemy.x, canvas.width - enemy.width));
    enemy.y = Math.max(0, Math.min(enemy.y, canvas.height - enemy.height));
}

/* Utils */
function canSeePlayer(enemy) {
    const dx = player.x - enemy.x;
    const dy = player.y - enemy.y;
    const distanceToPlayer = Math.sqrt(dx * dx + dy * dy);

    // Defina o raio de visão do inimigo
    const visionRadius = 150;

    return distanceToPlayer <= visionRadius;
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

function moveEnemyAIAwayFromEdge(enemy, margin = 50) {
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

function moveEnemyAIAwaySafeZone(enemy, margin = 10) {
    const safeZoneRadius = safeZone.radius;

    const dx = enemy.x - safeZone.x;
    const dy = enemy.y - safeZone.y;
    const distanceToSafeZone = Math.sqrt(dx * dx + dy * dy);

    if (distanceToSafeZone < safeZoneRadius + margin) {
        // Calcular a direção oposta ao centro da zona segura
        const angleToSafeZone = Math.atan2(dy, dx);
        const oppositeAngle = angleToSafeZone + Math.PI;

        // Mover o inimigo para longe da zona segura
        enemy.x = safeZone.x + (safeZoneRadius + margin) * Math.cos(oppositeAngle);
        enemy.y = safeZone.y + (safeZoneRadius + margin) * Math.sin(oppositeAngle);
    }
}
