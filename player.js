function drawPlayer() {
    // draw player
    spritePlayer.draw(player.x, player.y, player.direction, player.speed);

    // Desenha o texto de pontuação
    ctx.fillStyle = '#000';
    ctx.font = '40px';
    ctx.fillText(
        `${boss ? '' : player.points}`,
        player.x - player.width / 2 + 8,
        player.y + player.height - 50,
        40
    );
}

let recoveryTimeout;

function recoverLife() {
    if (player.health < 100) {
        player.health = Math.min(100, player.health + 5);

        if (!recoveryTimeout) {
            recoveryTimeout = setTimeout(() => {
                recoveryTimeout = null;
            }, 2000);
        }
    }
}

function verifyIfHaveAnotherEnemyMorePriority(enemy) {
    return enemies.some(enemyParam => enemyParam !== enemy && enemyParam.priority > enemy.priority);
}

function killEnemiesInsideSafeZone() {
    enemies = enemies.filter(enemy => {
        const distanceToEnemy = Math.sqrt(
            (enemy.x - safeZone.x) ** 2 + (enemy.y - safeZone.y) ** 2
        );

        /* if inside remove points and remove enemy */
        const isEnemyOutside = distanceToEnemy > safeZone.radius + enemy.width / 2;
        if (!isEnemyOutside) {
            /* if enemy more strong than safeZone */
            if (enemy.points > safeZone.teamPoints) {
                enemy.points -= safeZone.teamPoints;
                safeZone.teamPoints -= enemy.points;
                return true;
            }

            // Check if there are enemies with higher priority before killing
            if (!verifyIfHaveAnotherEnemyMorePriority(enemy, enemies)) {
                safeZone.teamPoints -= enemy.points;
                return false; // Remove the enemy only if no higher priority enemies are present
            } else {
                priorityDenied = true;
            }
        }

        return true;
    });

    return enemies;
}

function updatePlayer() {
    if (player.health <= 0) {
        current_screen = 'GAME_OVER';
        return;
    }

    if (player.x < 0) player.x = 0;
    if (player.x > canvas.width) player.x = canvas.width;
    if (player.y < 0) player.y = 0;
    if (player.y > canvas.height) player.y = canvas.height;

    // Verify if player is in safeZone
    const distanceToSafeZone = Math.sqrt(
        (player.x - safeZone.x) ** 2 + (player.y - safeZone.y) ** 2
    );
    if (distanceToSafeZone < safeZone.radius && !recoveryTimeout) {
        recoverLife();
        killEnemiesInsideSafeZone();
    }

    // Verify if enemies collided with the player
    enemies.forEach(enemy => {
        const dx = player.x - enemy.x;
        const dy = player.y - enemy.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // min distance to consider colision
        const minCollisionDistance = 2;

        if (distance - minCollisionDistance < player.width / 2 + enemy.width / 2 && canTakeDamage) {
            // Damage the player
            player.health -= 10;
            canTakeDamage = false;

            // Blur effect
            canvas.style.filter = 'blur(5px) brightness(2)';

            if (enemy.points <= player.points) {
                player.points = player.points - enemy.points;
                enemies = enemies.filter(enemyParam => enemyParam !== enemy);
            }

            setTimeout(() => {
                // Remove blur after 0.5 seconds
                canvas.style.filter = 'blur(0)';
            }, 50);

            // Allow player to take damage after 2 seconds
            setTimeout(() => {
                if (!canTakeDamage) canTakeDamage = true;
            }, 1000);
        }
    });
}
