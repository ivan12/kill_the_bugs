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

        if (!recoveryTimeout) {
            recoveryTimeout = setTimeout(() => {
                recoveryTimeout = null;
            }, 1000);
        }
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

    if (player.health <= 0) {
        current_screen = 'GAME_OVER';
        return;
    }

    // Ensure player stays within canvas boundaries
    player.x = Math.max(0, Math.min(player.x, canvas.width));
    player.y = Math.max(0, Math.min(player.y, canvas.height));

    if (isPlayerInsideSafeZone()) {
        if (!recoveryTimeout) recoverLife();
        killEnemiesInsideSafeZone();
        isPlayerInSafeZone = true;
    }

    // Check for collision with enemies
    enemies.forEach(enemy => {
        if (enemy.isAlive && enemyHasCollisionWithPlayer(enemy)) {
            handleEnemyCollision(enemy);
        }
    });
}

function handleEnemyCollision(enemy) {
    clearInterval(damageInterval);
    clearInterval(takeDamageTimeout);

    canvas.style.filter = 'none';

    if (canTakeDamage) {
        player.health -= 10;
        // Apply blur effect temporarily
        canvas.style.filter = 'blur(3px) brightness(1.3)';
        setTimeout(() => {
            canvas.style.filter = 'none';
        }, 200);
    }

    if (enemy.points <= player.points) {
        player.points -= enemy.points;
        clearInterval(enemy.animationInterval);
        enemy.alive = false;
    }

    // Set a flag to prevent immediate further damage
    canTakeDamage = false;

    // Allow player to take damage after 1 second
    takeDamageTimeout = setTimeout(() => {
        canTakeDamage = true;
    }, 1000);

    // Schedule damage every second
    damageInterval = setInterval(() => {
        if (enemy.alive && enemyHasCollisionWithPlayer(enemy)) {
            player.health -= 10;

            // Apply blur effect temporarily
            canvas.style.filter = 'blur(5px) brightness(2)';
            setTimeout(() => {
                canvas.style.filter = 'none'; // Remova o filtro de desfoque
            }, 200);

            // Allow player to take damage after 1 second
            setTimeout(() => {
                canTakeDamage = true;
            }, 1000);
        }
    }, 1000);
}
