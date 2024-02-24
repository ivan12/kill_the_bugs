function drawPlayer() {
    // draw player
    spritePlayer.draw(player.x, player.y, player.direction, player.speed);

    if (debug) {
        ctx.strokeStyle = '#0000FF';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(player.x, player.y, player.radius, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.closePath();
    }

    // Desenha o texto de pontos do jogador
    const pointsPlayerText = `${boss ? '' : player.points}`;
    const textWidth = ctx.measureText(pointsPlayerText).width;

    ctx.fillStyle = '#1C1B1B';
    ctx.beginPath();
    ctx.arc(player.x, player.y - player.radius - 20, textWidth / 2 + 10, 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    ctx.fillStyle = '#EECC10';
    ctx.font = '18px sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(pointsPlayerText, player.x, player.y - player.radius - 20);
}

function recoverLife() {
    if (player.health < 100) {
        player.health = Math.min(100, player.health + 5);
        player.isRecovering = true;
    }
}

function verifyIfHaveAnotherEnemyMorePriority(enemy) {
    return enemies.some(enemyParam => enemyParam !== enemy && enemyParam.priority > enemy.priority);
}

function isPlayerInsideSafeZone() {
    const dx = player.x - safeZone.x;
    const dy = player.y - safeZone.y;
    const distanceToSafeZone = Math.sqrt(dx * dx + dy * dy);
    return distanceToSafeZone <= safeZone.radius;
}

function killEnemiesInsideSafeZone() {
    enemies.forEach(enemy => {
        if (enemy.isAlive && !isEnemyOutsideSafeZone(enemy)) {
            /* if enemy more strong than safeZone */
            if (enemy.points > safeZone.teamPoints) {
                enemy.points -= safeZone.teamPoints;
                safeZone.teamPoints -= enemy.points;
                return;
            }

            // Check if there are enemies with higher priority before killing
            if (!verifyIfHaveAnotherEnemyMorePriority(enemy)) {
                safeZone.teamPoints -= enemy.points;
                enemy.isAlive = false;
                clearInterval(enemy.animationInterval);
            } else {
                priorityDenied = true;
            }
        }
    });
}

function updatePlayer() {
    isPlayerInSafeZone = false;
    let recoveryInterval = 0;

    if (player.health <= 0) {
        current_screen = 'GAME_OVER';
        return;
    }

    // Ensure player stays within canvas boundaries
    player.x = Math.max(0, Math.min(player.x, canvas.width));
    player.y = Math.max(0, Math.min(player.y, canvas.height));

    if (isPlayerInsideSafeZone()) {
        killEnemiesInsideSafeZone();
        isPlayerInSafeZone = true;

        // Inicia o setInterval apenas se não estiver ativo
        if (!damageInterval) {
            damageInterval = setInterval(() => {
                applyDamage(10);
            }, 1000);
        }
    } else {
        // Limpa o setInterval se o jogador não estiver mais na zona segura
        clearInterval(damageInterval);
        damageInterval = null;
    }

    // Check for collision with enemies
    enemies.forEach(enemy => {
        if (enemy.isAlive && enemyHasCollisionWithPlayer(enemy)) {
            handleEnemyCollision(enemy);
        }
    });
}

let damageTimeout;

function handleEnemyCollision(enemy) {
    canvas.style.filter = 'none';

    if (enemy.points <= player.points) {
        player.points -= enemy.points;
        enemy.isAlive = false;
        applyDamageToPlayer(10); // Aplicar dano ao jogador
    } else {
        applyDamageToPlayer(15); // Aplicar dano ao jogador
    }
}

function applyDamageToPlayer(damageAmount) {
    if (canTakeDamage && !isPlayerInsideSafeZone()) {
        player.health -= damageAmount;
        canTakeDamage = false;

        canvas.style.filter = 'blur(5px) brightness(2)';

        if (!damageTimeout) {
            damageTimeout = setInterval(() => {
                canvas.style.filter = 'none';
                canTakeDamage = true;
            }, 1000);
        }
    }
}
